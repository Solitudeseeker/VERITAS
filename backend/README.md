# VERITAS backend (FastAPI + Gemini + RAG)

## Run
```bash
# from the folder that CONTAINS backend1/
python -m venv venv && source venv/bin/activate      # Windows: venv\Scripts\activate  (Python 3.11-3.13)
pip install -r backend1/requirements.txt
cp backend1/.env.example backend1/.env               # add GEMINI_API_KEY
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
1. Gemini extracts checkable claims from text / page / OCR output.
2. **Retrieve**: Gemini + Google Search grounding finds candidate sources (real URLs only).
3. **Ingest**: source pages are fetched (SSRF-safe), chunked, embedded with `EMBED_MODEL`, stored in SQLite table `kb_chunks`.
4. **Retrieve chunks**: cosine top-k over the local knowledge base (this run + earlier runs), threshold `RAG_MIN_SCORE`.
5. **Generate**: Gemini judges the claim using only the numbered chunks and must cite them; uncited verdicts become UNVERIFIED. No evidence ⇒ UNVERIFIED.

Source `origin`: `web_page` (fetched page text), `web_grounding` (Google grounding excerpt), `knowledge_base` (stored from an earlier check).
`relevance` is the real cosine similarity. No confidence number is invented.

Database upgrades are additive (new nullable columns + new table); existing `veritas.db` data is kept.

## Quota and model errors (Gemini 429)
- **Pro models have no free-tier quota** (`limit: 0` in the 429). Use `GEMINI_MODEL=gemini-2.5-flash` or enable billing.
- If the main model returns "no quota", "rate limit" or "not found", the backend retries on `GEMINI_FALLBACK_MODEL`
  (default `gemini-2.5-flash-lite`; empty disables it). Rate limits and 5xx errors are retried once after a short wait.
- The API answers 502 with a readable message instead of a crash. The UI shows it.
- Each claim costs about 4 Gemini calls (search, embed docs, embed query, judge). `MAX_CLAIMS` (default 4) and
  `CLAIM_WORKERS` (default 2) keep a free-tier key under its per-minute limit.
- Grounding links are Google redirect URLs; when the page opens, its real final URL is stored instead.
