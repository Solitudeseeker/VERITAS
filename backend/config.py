import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
load_dotenv(Path(__file__).resolve().parent / ".env")


def _list(name: str, default: str) -> list[str]:
    return [v.strip() for v in os.getenv(name, default).split(",") if v.strip()]


class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "").strip()
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-3.5-flash").strip()
    # Used automatically when GEMINI_MODEL has no quota (429 "limit: 0") or does not exist (404).
    GEMINI_FALLBACK_MODEL: str = os.getenv("GEMINI_FALLBACK_MODEL", "gemini-3.5-flash-lite").strip()
    # Optional: a different model just for Google Search grounding (it has its own quota). Empty = GEMINI_MODEL.
    GEMINI_SEARCH_MODEL: str = os.getenv("GEMINI_SEARCH_MODEL", "").strip()
    # When live search is unavailable and no stored evidence exists, let the model answer from its own
    # knowledge (clearly labelled, no sources). Set ALLOW_UNGROUNDED=0 to return UNVERIFIED instead.
    ALLOW_UNGROUNDED: bool = os.getenv("ALLOW_UNGROUNDED", "1") == "1"
    # Web search: auto | tavily | ddgs | gemini (Google Search grounding, needs paid/quota)
    SEARCH_PROVIDER: str = os.getenv("SEARCH_PROVIDER", "auto").strip().lower()
    TAVILY_API_KEY: str = os.getenv("TAVILY_API_KEY", "").strip()
    # Each claim costs ~4 Gemini calls, so keep this low on free-tier keys.
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
    EMBED_MODEL: str = os.getenv("EMBED_MODEL", "gemini-embedding-001").strip()
    RAG_TOP_K: int = int(os.getenv("RAG_TOP_K", "6"))
    RAG_FETCH_PAGES: int = int(os.getenv("RAG_FETCH_PAGES", "3"))
    RAG_CHUNK_CHARS: int = int(os.getenv("RAG_CHUNK_CHARS", "900"))
    RAG_MIN_SCORE: float = float(os.getenv("RAG_MIN_SCORE", "0.45"))


settings = Settings()
