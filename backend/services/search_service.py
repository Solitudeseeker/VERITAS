"""Web search that does not depend on Gemini's Google Search grounding quota.

Providers (SEARCH_PROVIDER): auto | tavily | ddgs | gemini
  auto   -> tavily if TAVILY_API_KEY is set, else ddgs if the package is installed, else gemini grounding
  tavily -> https://tavily.com (free plan, needs a key)
  ddgs   -> keyless DuckDuckGo search (pip install ddgs)
"""
import json
from urllib.request import Request, urlopen

from ..config import settings


class SearchError(Exception):
    pass


def _ddgs_available() -> bool:
    try:
        import ddgs  # noqa: F401
        return True
    except ImportError:
        try:
            import duckduckgo_search  # noqa: F401
            return True
        except ImportError:
            return False


def active_provider() -> str:
    p = settings.SEARCH_PROVIDER
    if p == "auto":
        if settings.TAVILY_API_KEY:
            return "tavily"
        return "ddgs" if _ddgs_available() else "gemini"
    return p


def _tavily(query: str, n: int) -> list[dict]:
    body = json.dumps({"query": query, "max_results": n, "search_depth": "basic"}).encode()
    req = Request("https://api.tavily.com/search", data=body, method="POST", headers={
        "Content-Type": "application/json", "Authorization": f"Bearer {settings.TAVILY_API_KEY}"})
    try:
        with urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8", errors="replace"))
    except Exception as exc:
        raise SearchError(f"Tavily search failed: {exc}")
    return [{"title": r.get("title") or r.get("url", ""), "url": r["url"], "snippet": (r.get("content") or "")[:1500]}
            for r in data.get("results", []) if r.get("url")]


def _ddgs(query: str, n: int) -> list[dict]:
    try:
        try:
            from ddgs import DDGS
        except ImportError:
            from duckduckgo_search import DDGS
        rows = list(DDGS().text(query, max_results=n))
    except Exception as exc:
        raise SearchError(f"DuckDuckGo search failed: {exc}")
    return [{"title": r.get("title") or r.get("href", ""), "url": r["href"], "snippet": (r.get("body") or "")[:1500]}
            for r in rows if r.get("href")]


def search(query: str, n: int = 5) -> list[dict]:
    """-> [{title, url, snippet}]"""
    query = " ".join(query.split())[:300]
    provider = active_provider()
    if provider == "tavily":
        return _tavily(query, n)
    if provider == "ddgs":
        return _ddgs(query, n)
    raise SearchError("No external search provider configured.")
