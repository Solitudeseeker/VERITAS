# VERITAS backend (FastAPI + Grok + RAG)

## Run
```bash
# from the folder that CONTAINS backend1/
python -m venv venv && source venv/bin/activate      # Windows: venv\Scripts\activate  (Python 3.11-3.13)
pip install -r backend1/requirements.txt
cp backend1/.env.example backend1/.env               # add GROK_API_KEY (console.x.ai)
uvicorn backend1.main:app --reload --port 8000
```
Image checks also need the Tesseract program installed (`brew install tesseract` / `apt install tesseract-ocr` / the UB-Mannheim installer on Windows).
Set `MOCK_AI=1` to test the UI without a key — results are labelled MOCK MODE.

Frontend: copy `frontend-integration/veritas-api.ts` into the React app, add `VITE_API_URL=http://localhost:8000`
to the frontend `.env`, and start it with `npm run dev`. Its origin must be in `CORS_ORIGINS`.

## Endpoints
| Method | Path | Body |
|---|---|---|
| GET | /api/health | - |
| POST | /api/verify/text | JSON `{text}` (10-8000 chars) |
| POST | /api/verify/url | JSON `{url}` |
| POST | /api/verify/image | multipart field `file` (PNG/JPG/WebP, max 8 MB) + optional text field `context` |
| GET | /api/verification/{id} | - |
| GET | /api/history?limit=30 | - |

## Verification pipeline (per claim)
1. Grok extracts checkable claims from text / page / OCR output.
2. **Retrieve**: web search (Tavily / DuckDuckGo / optional Grok web_search) finds candidate sources (real URLs only).
3. **Ingest**: source pages are fetched (SSRF-safe), chunked, embedded with `EMBED_MODEL`, stored in SQLite table `kb_chunks`.
4. **Retrieve chunks**: cosine top-k over the local knowledge base (this run + earlier runs), threshold `RAG_MIN_SCORE`.
5. **Generate**: Grok judges the claim using only the numbered chunks and must cite them; uncited verdicts become UNVERIFIED. No evidence ⇒ UNVERIFIED.

Source `origin`: `web_page` (fetched page text), `web_grounding` (Google grounding excerpt), `knowledge_base` (stored from an earlier check).
`relevance` is the real cosine similarity. No confidence number is invented.

Database upgrades are additive (new nullable columns + new table); existing `veritas.db` data is kept.

## Quota and model errors (Grok 429)
- If the main model returns "no credits", "rate limit" or "not found", the backend retries on `GROK_FALLBACK_MODEL`
  (empty disables it). Rate limits and 5xx errors are retried automatically after a short wait.
- Each claim costs about 2 Grok calls (judge + extraction) plus embeddings. `MAX_CLAIMS` and `CLAIM_WORKERS` limit the load.
- xAI has no embeddings API: embeddings use Gemini (`GEMINI_API_KEY`, optional) or a built-in local embedder when it is empty.
- Switching embedding provider starts a fresh knowledge base automatically (vectors are stored per `EMBED_MODEL`).
