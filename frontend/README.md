# VERITAS — Frontend

A cinematic claim-verification interface: dark editorial cyber-intelligence styling, a 3D
evidence network, and five connected pages (Home, Verify, How it works, Evidence, About).

## Run it

You need Node.js 20+ (npm) or Bun.

```sh
npm install        # or: bun install
npm run dev        # or: bun run dev
```

Open http://localhost:8080

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm run preview` | Serve the production build |
| `npm run test` | Run the test suite |
| `npm run lint` | Lint the source |

## Connect the backend

The Verify page calls your FastAPI service. By default it looks for it on port 8000:

```
VITE_API_URL=http://localhost:8000
```

Copy `.env.example` to `.env` and change the value if your backend runs elsewhere.
To use the backend in `backend1.zip`, start it from the folder that contains `backend1/`:

```sh
uvicorn backend1.main:app --reload --port 8000
```

Two settings matter on the backend side:

1. **CORS** must allow the site's address — `http://localhost:8080` while developing, plus the
   published site's address once it is online.
2. **A Gemini key** (`GEMINI_API_KEY` in the backend's `.env`) is needed for real verdicts.
   Without one, set `MOCK_AI=1` to test the flow with placeholder results.

For the online preview or a published site, the backend has to be reachable at a public
address and `VITE_API_URL` has to point at it — a browser cannot reach `localhost` on your
machine from someone else's connection.

## Layout

```
src/
  assets/                 background imagery
  components/veritas/     the site's own sections (hero scene, verify flow, evidence map,
                          navigation, page shell, shared data)
  components/ui/          base UI primitives
  lib/api.ts              the single place the site talks to the backend
  routes/                 one file per page: /, /verify, /how-it-works, /evidence, /about
  styles.css              colour tokens, typography, and section styling
```

## Verification behaviour

- Text claims are sent to the backend and the answer is shown as a verdict, confidence,
  explanation, and evidence list.
- URL and image submissions are accepted and displayed, but their assessment stays explicitly
  marked "not assessed" until the corresponding research is wired up — the site never invents
  a finding.
