// Drop into your React app as src/lib/veritas-api.ts
// Set VITE_API_URL=http://localhost:8000 in the frontend .env (no secrets here).
const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

export type ClaimStatus = "SUPPORTED" | "CONTRADICTED" | "MISLEADING" | "UNVERIFIED";
export type OverallVerdict = ClaimStatus | "PARTIAL";

export interface Source {
  title: string;
  url: string;
  snippet?: string | null;
  source_date?: string | null;
  relevance?: number | null; // cosine similarity of the retrieved evidence chunk
  origin?: "web_page" | "web_grounding" | "knowledge_base" | "mock" | null;
}
export interface Claim {
  id: number;
  claim_text: string;
  status: ClaimStatus;
  explanation: string;
  sources: Source[];
  retrieval_metadata?: Record<string, unknown> | null;
}
export interface Verification {
  id: number;
  input_type: "text" | "url" | "image";
  source_ref?: string | null;
  original_text: string;
  overall_verdict: OverallVerdict;
  summary: string;
  created_at: string;
  claims: Claim[];
  limitations: string[];
}
export interface HistoryItem {
  id: number;
  input_type: string;
  overall_verdict: OverallVerdict;
  summary: string;
  created_at: string;
  preview: string;
  claim_count: number;
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, init);
  } catch {
    throw new ApiError("Cannot reach the VERITAS server. Is the backend running?", 0);
  }
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body.detail === "string") msg = body.detail;
      else if (Array.isArray(body.detail)) msg = body.detail.map((d: { msg: string }) => d.msg).join("; ");
    } catch { /* non-JSON error */ }
    throw new ApiError(msg, res.status);
  }
  return res.json() as Promise<T>;
}

const json = (body: unknown): RequestInit => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const veritasApi = {
  health: () => request<{ ok: boolean; model: string; fallback_model: string | null; mock: boolean; has_key: boolean }>("/api/health"),
  verifyText: (text: string) => request<Verification>("/api/verify/text", json({ text })),
  verifyUrl: (url: string) => request<Verification>("/api/verify/url", json({ url })),
  verifyImage: (file: File, context = "") => {
    const fd = new FormData();
    fd.append("file", file); // field name must be "file"; don't set Content-Type manually
    if (context.trim()) fd.append("context", context.trim());
    return request<Verification>("/api/verify/image", { method: "POST", body: fd });
  },
  getVerification: (id: number | string) => request<Verification>(`/api/verification/${id}`),
  history: (limit = 30) => request<HistoryItem[]>(`/api/history?limit=${limit}`),
};
