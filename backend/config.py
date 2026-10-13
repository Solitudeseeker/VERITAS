import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
load_dotenv(Path(__file__).resolve().parent / ".env")


def _list(name: str, default: str) -> list[str]:
    return [v.strip() for v in os.getenv(name, default).split(",") if v.strip()]


class Settings:
    # --- Grok (xAI) powers claim extraction and judging. OpenAI-compatible API.
    GROK_API_KEY: str = (os.getenv("GROK_API_KEY") or os.getenv("XAI_API_KEY") or "").strip()
    GROK_BASE_URL: str = os.getenv("GROK_BASE_URL", "https://api.x.ai/v1").strip()
    GROK_MODEL: str = os.getenv("GROK_MODEL", "grok-4.7").strip()
    # Used automatically when GROK_MODEL has no quota/credits, is overloaded, or does not exist (404).
    GROK_FALLBACK_MODEL: str = os.getenv("GROK_FALLBACK_MODEL", "grok-4.20").strip()
    # Optional: a different model just for Grok web search (SEARCH_PROVIDER=grok). Empty = GROK_MODEL.
    GROK_SEARCH_MODEL: str = os.getenv("GROK_SEARCH_MODEL", "").strip()
    # Gemini is now used ONLY for embeddings (xAI has no embeddings API). Optional: without a key a local embedder is used.
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "").strip()
    ALLOW_UNGROUNDED: bool = os.getenv("ALLOW_UNGROUNDED", "1") == "1"
    # Web search: auto | tavily | ddgs | grok (Grok web_search tool, billed per call)
    SEARCH_PROVIDER: str = {"gemini": "grok"}.get(os.getenv("SEARCH_PROVIDER", "auto").strip().lower(), os.getenv("SEARCH_PROVIDER", "auto").strip().lower())
    TAVILY_API_KEY: str = os.getenv("TAVILY_API_KEY", "").strip()
    # Each claim costs ~2 Grok calls (+ embeddings), so keep this low on free-tier keys.
    MAX_CLAIMS: int = int(os.getenv("MAX_CLAIMS", "4"))
    CLAIM_WORKERS: int = int(os.getenv("CLAIM_WORKERS", "2"))
    OCR_LANG: str = os.getenv("OCR_LANG", "eng")
    # Full path to tesseract.exe if it is not on PATH (auto-detected in the default Windows install folders).
    TESSERACT_CMD: str = os.getenv("TESSERACT_CMD", "").strip().strip('"')
    MOCK_AI: bool = os.getenv("MOCK_AI", "0") == "1"
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'veritas.db'}")
    MAX_UPLOAD_MB: int = 8
    MAX_TEXT_CHARS: int = 8000
    FRONTEND_DIR: Path = BASE_DIR / "frontend"

    # CORS: comma-separated list of allowed frontend origins.
    CORS_ORIGINS: list[str] = _list(
        "CORS_ORIGINS", "http://localhost:5173,http://localhost:8080,http://127.0.0.1:5173,http://127.0.0.1:8080"
    )
    CORS_ORIGIN_REGEX: str = os.getenv("CORS_ORIGIN_REGEX", "").strip()

    # RAG
    # gemini = Gemini embeddings (needs GEMINI_API_KEY); local = built-in hashed embedder (no key, lower quality).
    EMBED_PROVIDER: str = os.getenv("EMBED_PROVIDER", "").strip().lower() or ("gemini" if os.getenv("GEMINI_API_KEY", "").strip() else "local")
    EMBED_MODEL: str = (os.getenv("EMBED_MODEL", "gemini-embedding-001").strip()
                        if EMBED_PROVIDER == "gemini" else "local-hash-v1")
    # Minimum seconds between Gemini embedding calls (avoids per-minute rate limits when claims run in parallel).
    EMBED_MIN_INTERVAL: float = float(os.getenv("EMBED_MIN_INTERVAL", "1.0"))
    RAG_TOP_K: int = int(os.getenv("RAG_TOP_K", "6"))
    RAG_FETCH_PAGES: int = int(os.getenv("RAG_FETCH_PAGES", "3"))
    RAG_CHUNK_CHARS: int = int(os.getenv("RAG_CHUNK_CHARS", "900"))
    RAG_MIN_SCORE: float = float(os.getenv("RAG_MIN_SCORE", "0.45"))


settings = Settings()
