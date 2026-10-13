from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from ..config import settings
from ..database.db import get_db
from ..database.models import Claim, Verification
from ..schemas import HistoryItem, TextRequest, UrlRequest, VerificationOut
from ..services import ocr_service, source_service
from ..services.grok_service import AIServiceError
from ..services.verification_service import NoClaimsError, run_verification

router = APIRouter(prefix="/api")


def _run(db: Session, input_type: str, text: str, ref: str | None = None) -> Verification:
    try:
        return run_verification(db, input_type, text, ref)
    except NoClaimsError as e:
        raise HTTPException(422, str(e))
    except AIServiceError as e:
        raise HTTPException(502, str(e))


def _load(db: Session, vid: int) -> Verification:
    v = db.scalars(
        select(Verification)
        .where(Verification.id == vid)
        .options(selectinload(Verification.claims).selectinload(Claim.sources))
    ).first()
    if not v:
        raise HTTPException(404, "That report does not exist.")
    return v


@router.get("/health")
def health():
    return {"ok": True, "model": settings.GROK_MODEL, "fallback_model": settings.GROK_FALLBACK_MODEL or None,
            "mock": settings.MOCK_AI, "has_key": bool(settings.GROK_API_KEY)}


@router.post("/verify/text", response_model=VerificationOut)
def verify_text(body: TextRequest, db: Session = Depends(get_db)):
    text = body.text.strip()
    if len(text) < 10:
        raise HTTPException(422, "Enter at least a sentence to check.")
    return _run(db, "text", text)


@router.post("/verify/image", response_model=VerificationOut)
async def verify_image(file: UploadFile = File(...), context: str = Form(""), db: Session = Depends(get_db)):
    if file.content_type not in ocr_service.ALLOWED_TYPES:
        raise HTTPException(415, "Upload a PNG, JPG or WebP screenshot.")
    data = await file.read(settings.MAX_UPLOAD_MB * 1024 * 1024 + 1)
    try:
        text = ocr_service.extract_text(data)
    except ocr_service.OCRError as e:
        raise HTTPException(422, str(e))
    context = " ".join(context.split())[:500]
    if context:  # the person's own note about what the image claims to show
        text = f"Context from the person who shared this image: {context}\n\n{text}"[: settings.MAX_TEXT_CHARS]
    # blocking AI work runs off the event loop
    from starlette.concurrency import run_in_threadpool

    return await run_in_threadpool(_run, db, "image", text, file.filename)


@router.post("/verify/url", response_model=VerificationOut)
def verify_url(body: UrlRequest, db: Session = Depends(get_db)):
    url = body.url.strip()
    try:
        text = source_service.fetch_page_text(url)
    except source_service.FetchError as e:
        raise HTTPException(422, str(e))
    return _run(db, "url", text, url)


@router.get("/verification/{vid}", response_model=VerificationOut)
def get_verification(vid: int, db: Session = Depends(get_db)):
    return _load(db, vid)


@router.get("/history", response_model=list[HistoryItem])
def history(limit: int = 30, db: Session = Depends(get_db)):
    limit = max(1, min(limit, 100))
    counts = dict(db.execute(select(Claim.verification_id, func.count(Claim.id)).group_by(Claim.verification_id)).all())
    rows = db.scalars(select(Verification).order_by(Verification.created_at.desc(), Verification.id.desc()).limit(limit)).all()
    return [
        HistoryItem(
            id=v.id, input_type=v.input_type, overall_verdict=v.overall_verdict, summary=v.summary,
            created_at=v.created_at, preview=(v.source_ref if v.input_type == "url" and v.source_ref else v.original_text)[:140],
            claim_count=counts.get(v.id, 0),
        )
        for v in rows
    ]
