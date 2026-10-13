"""The fixed workflow: input -> claims -> evidence -> comparison -> report."""
import json
from concurrent.futures import ThreadPoolExecutor

from sqlalchemy.orm import Session

from ..config import settings
from ..database.models import Claim, Source, Verification
from . import grok_service as ai


class NoClaimsError(Exception):
    pass


def overall_verdict(statuses: list[str]) -> str:
    """Majority-threshold verdict (denominator = all claims; integer maths, so no rounding issues):
    >= 50% SUPPORTED -> SUPPORTED; else >= 75% not-supported -> MISLEADING; else UNVERIFIED. Never PARTIAL."""
    n = len(statuses)
    if n == 0:
        return "UNVERIFIED"
    supported = statuses.count("SUPPORTED")
    flagged = sum(statuses.count(s) for s in ("UNVERIFIED", "MISLEADING", "CONTRADICTED"))
    if supported * 2 >= n:
        return "SUPPORTED"
    if flagged * 4 >= n * 3:
        return "MISLEADING"
    return "UNVERIFIED"


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
