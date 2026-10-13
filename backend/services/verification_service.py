"""The fixed workflow: input -> claims -> evidence -> comparison -> report."""
import json
from concurrent.futures import ThreadPoolExecutor

from sqlalchemy.orm import Session

from ..config import settings
from ..database.models import Claim, Source, Verification
from . import gemini_service as ai


class NoClaimsError(Exception):
    pass


def overall_verdict(statuses: list[str]) -> str:
    n = len(statuses)
    c = lambda s: statuses.count(s)  # noqa: E731
    if c("CONTRADICTED") == n:
        return "CONTRADICTED"
    if c("CONTRADICTED") or c("MISLEADING"):
        return "MISLEADING"
    if c("SUPPORTED") == n:
        return "SUPPORTED"
    if c("UNVERIFIED") == n:
        return "UNVERIFIED"
    return "PARTIAL"


def build_summary(statuses: list[str]) -> str:
    n = len(statuses)
    parts = []
    for key, label in [("SUPPORTED", "supported"), ("CONTRADICTED", "contradicted"),
                       ("MISLEADING", "need context"), ("UNVERIFIED", "could not be verified")]:
        k = statuses.count(key)
        if k:
            parts.append(f"{k} {label}")
    noun = "claim" if n == 1 else "claims"
    return f"Checked {n} {noun}: " + ", ".join(parts) + "."


def run_verification(db: Session, input_type: str, text: str, source_ref: str | None = None) -> Verification:
    claims = ai.extract_claims(text)
    if not claims:
        raise NoClaimsError("No checkable factual claims were found. Try pasting the specific statement (a date, amount, name or announcement) instead of a general message or page.")

    with ThreadPoolExecutor(max_workers=max(1, settings.CLAIM_WORKERS)) as pool:
        results = list(pool.map(lambda c: ai.verify_claim(c, text), claims))

    statuses = [r["status"] for r in results]
    v = Verification(
        input_type=input_type,
        source_ref=source_ref,
        original_text=text,
        overall_verdict=overall_verdict(statuses),
        summary=build_summary(statuses),
    )
    for claim_text, r in zip(claims, results):
        v.claims.append(
            Claim(
                claim_text=claim_text,
                status=r["status"],
                explanation=r["explanation"],
                retrieval_json=json.dumps(r.get("retrieval")) if r.get("retrieval") else None,
                sources=[Source(**s) for s in r["sources"]],
            )
        )
    db.add(v)
    db.commit()
    db.refresh(v)
    return v
