"""Minimal local RAG: chunk evidence -> embed -> store in SQLite -> cosine top-k retrieval.

The vector store is the `kb_chunks` table (embeddings stored as JSON). Brute-force cosine
search with numpy is plenty for a hackathon-scale knowledge base and needs no extra service.
"""
import hashlib
import json
import threading
from typing import Callable

import numpy as np
from sqlalchemy import select

from ..config import settings
from ..database.db import SessionLocal
from ..database.models import KBChunk

EmbedFn = Callable[[list[str], str], list[list[float]]]  # (texts, task_type) -> vectors
_write_lock = threading.Lock()
MAX_SCAN = 5000


def _model_name(embed) -> str:
    fn = getattr(embed, "model_name", None)
    return fn() if callable(fn) else settings.EMBED_MODEL


def chunk_text(text: str, size: int | None = None, overlap: int = 150) -> list[str]:
    size = size or settings.RAG_CHUNK_CHARS
    text = " ".join((text or "").split())
    if not text:
        return []
    if len(text) <= size:
        return [text]
    chunks, start = [], 0
    while start < len(text):
        end = min(len(text), start + size)
        if end < len(text):  # prefer to break on a sentence boundary
            cut = text.rfind(". ", start + size // 2, end)
            if cut != -1:
                end = cut + 1
        chunks.append(text[start:end].strip())
        if end >= len(text):
            break
        start = max(end - overlap, start + 1)
    return [c for c in chunks if len(c) >= 40]


def _hash(url: str, text: str) -> str:
    return hashlib.sha256(f"{url}\n{text}".encode()).hexdigest()


def add_documents(docs: list[dict], embed: EmbedFn) -> int:
    """docs: [{url, title, text, kind}] -> number of new chunks stored."""
    pending: list[dict] = []
    for d in docs:
        for c in chunk_text(d["text"]):
            pending.append({**d, "text": c, "text_hash": _hash(d["url"], c)})
    if not pending:
        return 0
    with SessionLocal() as db:
        known = set(db.scalars(select(KBChunk.text_hash).where(
            KBChunk.text_hash.in_([p["text_hash"] for p in pending]))).all())
    pending = [p for p in pending if p["text_hash"] not in known]
    pending = list({p["text_hash"]: p for p in pending}.values())
    if not pending:
        return 0
    vectors = embed([p["text"] for p in pending], "RETRIEVAL_DOCUMENT")
    model_name = _model_name(embed)  # read AFTER embedding: the embedder may have fallen back to local
    with _write_lock, SessionLocal() as db:
        for p, v in zip(pending, vectors):
            db.add(KBChunk(url=p["url"][:2048], title=(p.get("title") or "Source")[:512], text=p["text"],
                           text_hash=p["text_hash"], kind=p["kind"], embed_model=model_name,
                           embedding=json.dumps([round(float(x), 6) for x in v])))
        try:
            db.commit()
        except Exception:  # a parallel thread stored the same chunk first
            db.rollback()
            return 0
    return len(pending)


def retrieve(query: str, embed: EmbedFn, k: int | None = None, fresh_urls: set[str] | None = None) -> list[dict]:
    k = k or settings.RAG_TOP_K
    fresh_urls = fresh_urls or set()
    q = np.asarray(embed([query], "RETRIEVAL_QUERY")[0], dtype=np.float32)  # embed first, then pick matching rows
    with SessionLocal() as db:
        rows = db.scalars(select(KBChunk).where(KBChunk.embed_model == _model_name(embed))
                          .order_by(KBChunk.id.desc()).limit(MAX_SCAN)).all()
    if not rows:
        return []
    m = np.asarray([json.loads(r.embedding) for r in rows], dtype=np.float32)
    denom = np.linalg.norm(m, axis=1) * (np.linalg.norm(q) or 1.0)
    scores = (m @ q) / np.where(denom == 0, 1.0, denom)
    order = np.argsort(-scores)
    out = []
    for i in order:
        s = float(scores[i])
        if s < settings.RAG_MIN_SCORE or len(out) >= k:
            break
        r = rows[i]
        out.append({"url": r.url, "title": r.title, "text": r.text, "score": round(s, 4),
                    "origin": r.kind if r.url in fresh_urls else "knowledge_base"})
    return out
