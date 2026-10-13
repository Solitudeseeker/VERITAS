import json
from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Verification(Base):
    __tablename__ = "verifications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    input_type: Mapped[str] = mapped_column(String(16))  # text | image | url
    source_ref: Mapped[str | None] = mapped_column(String(2048), nullable=True)  # url or filename
    original_text: Mapped[str] = mapped_column(Text)
    overall_verdict: Mapped[str] = mapped_column(String(24))
    summary: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    claims: Mapped[list["Claim"]] = relationship(
        back_populates="verification", cascade="all, delete-orphan", order_by="Claim.id"
    )

    @property
    def limitations(self) -> list[str]:
        out: list[str] = []
        for c in self.claims:
            for lim in c.retrieval_metadata.get("limitations", []) if c.retrieval_metadata else []:
                if lim not in out:
                    out.append(lim)
        return out


class Claim(Base):
    __tablename__ = "claims"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    verification_id: Mapped[int] = mapped_column(ForeignKey("verifications.id"))
    claim_text: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(24))
    explanation: Mapped[str] = mapped_column(Text)
    retrieval_json: Mapped[str | None] = mapped_column(Text, nullable=True)

    verification: Mapped[Verification] = relationship(back_populates="claims")
    sources: Mapped[list["Source"]] = relationship(
        back_populates="claim", cascade="all, delete-orphan", order_by="Source.id"
    )

    @property
    def retrieval_metadata(self) -> dict | None:
        try:
            return json.loads(self.retrieval_json) if self.retrieval_json else None
        except ValueError:
            return None


class Source(Base):
    __tablename__ = "sources"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    claim_id: Mapped[int] = mapped_column(ForeignKey("claims.id"))
    title: Mapped[str] = mapped_column(String(512))
    url: Mapped[str] = mapped_column(String(2048))
    snippet: Mapped[str | None] = mapped_column(Text, nullable=True)
    source_date: Mapped[str | None] = mapped_column(String(64), nullable=True)
    relevance: Mapped[float | None] = mapped_column(Float, nullable=True)  # cosine similarity from retrieval
    origin: Mapped[str | None] = mapped_column(String(32), nullable=True)  # web_page | web_grounding | knowledge_base

    claim: Mapped[Claim] = relationship(back_populates="sources")


class KBChunk(Base):
    """Local RAG knowledge base: evidence chunks + their embeddings."""
    __tablename__ = "kb_chunks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    url: Mapped[str] = mapped_column(String(2048), index=True)
    title: Mapped[str] = mapped_column(String(512))
    text: Mapped[str] = mapped_column(Text)
    text_hash: Mapped[str] = mapped_column(String(64), unique=True)
    kind: Mapped[str] = mapped_column(String(32))  # web_page | web_grounding
    embed_model: Mapped[str] = mapped_column(String(64))
    embedding: Mapped[str] = mapped_column(Text)  # JSON list[float]
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
