from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class TextRequest(BaseModel):
    text: str = Field(min_length=10, max_length=8000)


class UrlRequest(BaseModel):
    url: str = Field(min_length=8, max_length=2048)


class SourceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str
    url: str
    snippet: str | None = None
    source_date: str | None = None
    relevance: float | None = None  # cosine similarity of the retrieved chunk (None if not retrieved)
    origin: str | None = None  # web_page | web_grounding | knowledge_base | mock


class ClaimOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    claim_text: str
    status: str
    explanation: str
    sources: list[SourceOut] = []
    retrieval_metadata: dict | None = None


class VerificationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    input_type: str
    source_ref: str | None = None
    original_text: str
    overall_verdict: str
    summary: str
    created_at: datetime
    claims: list[ClaimOut] = []
    limitations: list[str] = []


class HistoryItem(BaseModel):
    id: int
    input_type: str
    overall_verdict: str
    summary: str
    created_at: datetime
    preview: str
    claim_count: int
