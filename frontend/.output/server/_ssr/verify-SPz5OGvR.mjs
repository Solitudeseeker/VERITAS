import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-DE-Zgwtl.mjs";
import { n as useReveal } from "./hooks-DPKKSuF-.mjs";
import { a as ImagePlus, i as Link2, o as FileText, r as Upload, t as X } from "../_libs/lucide-react.mjs";
import { a as isSampleClaim, i as STEPS, n as SOURCES, t as EXAMPLE_CLAIM } from "./data-DPG1hT0f.mjs";
import { t as EvidenceNetwork } from "./EvidenceNetwork-BaBWnTeQ.mjs";
import { i as TabsTrigger$1, n as TabsContent$1, r as TabsList$1, t as Tabs$1 } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-SPz5OGvR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Tabs$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList$1, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = TabsList$1.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger$1, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = TabsTrigger$1.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent$1, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = TabsContent$1.displayName;
var API_BASE = ({
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
}["VITE_API_URL"] || "http://localhost:8000").replace(/\/+$/, "");
async function request(path, init) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 12e4);
	let res;
	try {
		res = await fetch(`${API_BASE}${path}`, {
			...init,
			signal: controller.signal
		});
	} catch (e) {
		if (e instanceof DOMException && e.name === "AbortError") throw new Error("The request timed out after 120 seconds.");
		throw new Error(`Could not reach the VERITAS backend at ${API_BASE}.`);
	} finally {
		clearTimeout(timer);
	}
	if (!res.ok) {
		let detail = `The backend returned an error (HTTP ${res.status}).`;
		try {
			const body = await res.json();
			if (typeof body.detail === "string" && body.detail) detail = body.detail;
		} catch {}
		throw new Error(detail);
	}
	return await res.json();
}
function verifyText(text) {
	return request("/api/verify/text", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ text })
	});
}
function verifyUrl(url) {
	return request("/api/verify/url", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ url })
	});
}
function verifyImage(file) {
	const form = new FormData();
	form.append("file", file);
	return request("/api/verify/image", {
		method: "POST",
		body: form
	});
}
var VERDICT_TONE = {
	SUPPORTED: "text-support",
	CONTRADICTED: "text-destructive",
	MISLEADING: "text-violet",
	UNVERIFIED: "text-unverified"
};
var NET_TONE = {
	SUPPORTED: "support",
	CONTRADICTED: "destructive",
	MISLEADING: "muted",
	UNVERIFIED: "muted"
};
function safeUrl(url) {
	if (!url) return null;
	try {
		const u = new URL(url);
		return u.protocol === "http:" || u.protocol === "https:" ? u : null;
	} catch {
		return null;
	}
}
function apiItems(r) {
	return r.claims.map((c) => {
		const s = c.sources[0];
		return {
			name: s ? safeUrl(s.url)?.hostname ?? s.title : "VERITAS research",
			title: c.claim_text,
			date: s?.source_date || "n/a",
			relevance: "—",
			label: c.status,
			tone: VERDICT_TONE[c.status] ?? "text-unverified",
			summary: c.explanation + (s?.snippet ? ` ${s.snippet}` : ""),
			url: safeUrl(s?.url)?.href ?? null
		};
	});
}
function apiNetwork(r) {
	return r.claims.map((c) => {
		const s = c.sources[0];
		return {
			name: s ? safeUrl(s.url)?.hostname ?? s.title : "VERITAS research",
			date: s?.source_date || "n/a",
			note: c.explanation,
			label: c.status,
			tone: NET_TONE[c.status] ?? "muted"
		};
	});
}
function VerifyDemo({ onResult, selected, onSelect }) {
	const [claim, setClaim] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("text");
	const [url, setUrl] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)(null);
	const [imageContext, setImageContext] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)(null);
	const [outcome, setOutcome] = (0, import_react.useState)(null);
	const fileInput = (0, import_react.useRef)(null);
	const [step, setStep] = (0, import_react.useState)(-1);
	const [done, setDone] = (0, import_react.useState)(null);
	const timers = (0, import_react.useRef)([]);
	const runId = (0, import_react.useRef)(0);
	const resultRef = (0, import_react.useRef)(null);
	const running = step >= 0 && done === null;
	(0, import_react.useEffect)(() => () => timers.current.forEach(clearTimeout), []);
	(0, import_react.useEffect)(() => () => {
		if (image) URL.revokeObjectURL(image.preview);
	}, [image]);
	const pickImage = async (file) => {
		if (!file) return;
		setError("");
		if (![
			"image/jpeg",
			"image/png",
			"image/webp"
		].includes(file.type)) {
			setError("Choose a JPG, PNG, or WebP image.");
			return;
		}
		if (file.size > 8388608) {
			setError("Choose an image smaller than 8 MB.");
			return;
		}
		const preview = URL.createObjectURL(file);
		try {
			(await createImageBitmap(file)).close();
			setImage({
				name: file.name,
				preview,
				file
			});
		} catch {
			URL.revokeObjectURL(preview);
			setError("This image could not be opened. Please choose another file.");
		}
	};
	const run = () => {
		if (running) return;
		setError("");
		if (mode === "text" && !claim.trim()) return;
		if (mode === "image" && !image) return;
		if (mode === "url") try {
			const parsed = new URL(url.trim());
			if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
		} catch {
			setError("Enter a complete website URL beginning with https:// or http://.");
			return;
		}
		const original = mode === "text" ? claim : mode === "url" ? url : image?.name ?? "";
		const submission = {
			mode,
			value: original,
			preview: mode === "image" ? image?.preview ?? null : null,
			context: imageContext
		};
		const id = ++runId.current;
		const toOutcome = (p) => p.then((response) => ({
			response,
			error: null
		}), (e) => ({
			response: null,
			error: e instanceof Error ? e.message : "Unknown error."
		}));
		const request = mode === "text" && isSampleClaim(original.trim()) ? null : mode === "text" ? toOutcome(verifyText(original.trim())) : mode === "url" ? toOutcome(verifyUrl(original.trim())) : toOutcome(verifyImage(image.file));
		setSubmitted(submission);
		setOutcome(null);
		timers.current.forEach(clearTimeout);
		setDone(null);
		setStep(0);
		onSelect(null);
		const fast = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		timers.current = STEPS.map((_, i) => setTimeout(() => setStep(i), i * (fast ? 150 : 1100)));
		timers.current.push(setTimeout(async () => {
			const result = request ? await request : null;
			if (id !== runId.current) return;
			setOutcome(result);
			setDone(original);
			if (result?.response) onResult(original, apiNetwork(result.response));
			else if (result?.error && !isSampleClaim(original)) onResult(original, []);
			else onResult(original);
			requestAnimationFrame(() => resultRef.current?.scrollIntoView({
				behavior: fast ? "instant" : "smooth",
				block: "start"
			}));
		}, STEPS.length * (fast ? 150 : 1100)));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "verify",
		className: "border-t px-6 py-24 md:px-10 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "eyebrow reveal mb-4 flex items-center gap-3 text-primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "status-dot",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "VERITAS / Investigation" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto text-muted-foreground",
							children: "TEXT · URL · IMAGE"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display verify-heading reveal mt-6",
					children: "VERIFY A CLAIM"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "reveal mt-8 max-w-xl text-lg text-muted-foreground",
					children: "Paste a statement, headline, or claim and let VERITAS investigate it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid gap-12 md:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "md:col-span-7",
						onSubmit: (e) => {
							e.preventDefault();
							run();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "verification-input p-6 md:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
									value: mode,
									onValueChange: (value) => {
										if (value === "text" || value === "url" || value === "image") {
											setMode(value);
											setError("");
											setDone(null);
											setStep(-1);
										}
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
											"aria-label": "Verification input type",
											className: "mb-7 grid h-12 w-full grid-cols-3 rounded-none bg-secondary",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "text",
													disabled: running,
													className: "h-full gap-2 rounded-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "Text"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "url",
													disabled: running,
													className: "h-full gap-2 rounded-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-4" }), "URL"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "image",
													disabled: running,
													className: "h-full gap-2 rounded-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), "Image"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
											value: "text",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "claim",
												className: "eyebrow",
												children: "Claim under investigation"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												id: "claim",
												rows: 4,
												value: claim,
												disabled: running,
												onChange: (e) => setClaim(e.target.value),
												placeholder: "Enter the claim you want to verify...",
												className: "mt-5 min-h-40 w-full resize-y bg-transparent font-serif text-3xl leading-snug outline-none placeholder:text-muted-foreground md:text-4xl"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
											value: "url",
											className: "min-h-56",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													htmlFor: "claim-url",
													className: "eyebrow",
													children: "Website / Article URL"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: "claim-url",
													type: "url",
													value: url,
													onChange: (e) => setUrl(e.target.value),
													disabled: running,
													placeholder: "https://example.com/article",
													className: "mt-6 w-full border-b border-input bg-transparent py-4 text-lg outline-none placeholder:text-muted-foreground focus:border-primary"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-6 text-sm leading-relaxed text-muted-foreground",
													children: "The backend reads the page, extracts its claims, and checks each one against live sources."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
											value: "image",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "eyebrow",
													htmlFor: "claim-image",
													children: "Image / Screenshot"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													ref: fileInput,
													id: "claim-image",
													type: "file",
													accept: "image/jpeg,image/png,image/webp",
													disabled: running,
													className: "sr-only",
													onChange: (e) => {
														pickImage(e.target.files?.[0]);
														e.target.value = "";
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "relative mt-5 border border-dashed border-input p-5",
													onDragOver: (e) => e.preventDefault(),
													onDrop: (e) => {
														e.preventDefault();
														if (!running) pickImage(e.dataTransfer.files[0]);
													},
													children: image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: image.preview,
														alt: "Selected image for verification",
														className: "max-h-72 w-full object-contain"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-4 flex items-center justify-between gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "break-all text-sm text-muted-foreground",
															children: image.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															type: "button",
															variant: "ghost",
															size: "icon",
															title: "Remove image",
															"aria-label": "Remove image",
															disabled: running,
															onClick: () => {
																setImage(null);
																setDone(null);
															},
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
														})]
													})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														type: "button",
														variant: "ghost",
														disabled: running,
														onClick: () => fileInput.current?.click(),
														className: "flex h-44 w-full flex-col gap-4 whitespace-normal",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-6" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-base",
																children: "Upload an image or drop it here"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-sm text-muted-foreground",
																children: "JPG, PNG, WebP · up to 8 MB"
															})
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													htmlFor: "image-context",
													className: "eyebrow mt-6 block",
													children: "Claim or context (optional)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
													id: "image-context",
													rows: 2,
													value: imageContext,
													disabled: running,
													onChange: (e) => setImageContext(e.target.value),
													placeholder: "What is this image claiming to show?",
													className: "mt-3 w-full resize-y border-b bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground focus:border-primary"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-primary",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CLAIMS IN IMAGE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AUTHENTICITY & CONTEXT" })]
												})
											]
										})
									]
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "mt-4 text-sm text-destructive",
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap items-center justify-between gap-5 border-t pt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow",
										children: mode === "text" ? "Statement / Headline / Claim" : mode === "url" ? "URL / Article / Source" : "Claims / Authenticity / Context"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										variant: "editorial",
										disabled: running || (mode === "text" ? !claim.trim() : mode === "url" ? !url.trim() : !image),
										children: [
											running ? "INVESTIGATING" : mode === "text" ? "VERIFY CLAIM" : mode === "url" ? "VERIFY URL" : "VERIFY IMAGE",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												children: "→"
											})
										]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap items-center gap-x-4 gap-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Claims are checked by the VERITAS backend against live sources."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "link",
								disabled: running,
								onClick: () => {
									setMode("text");
									setClaim(EXAMPLE_CLAIM);
									setDone(null);
									setStep(-1);
								},
								className: "h-auto p-0 text-sm",
								children: "Try the sample claim →"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "investigation-timeline space-y-7 md:col-span-4 md:col-start-9",
						"aria-label": "Verification progress",
						"aria-live": "polite",
						"aria-busy": running,
						children: STEPS.map((stage, index) => {
							const isDone = done !== null || step > index;
							const isActive = !isDone && step === index;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: `investigation-stage ${isDone ? "done" : isActive ? "active" : "pending"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "investigation-marker",
									"aria-hidden": "true",
									children: isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stage-check",
										children: "✓"
									}) : isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "stage-spinner" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stage-number",
										children: String(index + 1).padStart(2, "0")
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-mono text-xs uppercase tracking-wider",
													children: stage
												}),
												isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "stage-live-label",
													children: "ACTIVE"
												}),
												isDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "stage-done-label",
													children: "COMPLETE"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "stage-progress-track mt-4",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "stage-progress-fill" })
										}),
										index === STEPS.length - 1 && running && isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											role: "status",
											className: "mt-4 flex items-center gap-3 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "stage-spinner stage-spinner-small" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Investigating sources and preparing your verdict..." })]
										})
									]
								})]
							}, stage);
						})
					})]
				}),
				done !== null && submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: resultRef,
					className: "mt-24 scroll-mt-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, {
						claim: done,
						submission: submitted,
						outcome,
						selected,
						onSelect
					})
				})
			]
		})
	});
}
function Result({ claim, submission, outcome, selected, onSelect }) {
	const response = outcome?.response ?? null;
	const failed = !!outcome?.error;
	const sample = submission.mode === "text" && !response && !failed && isSampleClaim(claim);
	const items = response ? apiItems(response) : sample ? SOURCES.map((s) => ({
		name: s.name,
		title: s.title,
		date: s.date,
		relevance: s.relevance,
		label: s.supports ? "PARTIALLY SUPPORTS CLAIM" : "CONTRADICTS CLAIM",
		tone: s.supports ? "text-support" : "text-destructive",
		summary: s.note,
		url: null
	})) : [];
	const verdict = response ? response.overall_verdict : sample ? "MISLEADING" : "UNVERIFIED";
	const confidence = response ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [response.claims.length, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-4xl",
		children: [
			" claim",
			response.claims.length === 1 ? "" : "s",
			" checked"
		]
	})] }) : sample ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["87", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-4xl",
		children: "%"
	})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-4xl",
		children: "Not assessed"
	});
	const note = response ? response.summary : sample ? "Illustrative verdict · 87% is a sample value, not a live assessment. Evidence below comes from the supplied prototype." : failed ? "No verdict was produced." : "No verdict can be reached without relevant evidence. This claim has not been investigated.";
	const why = response ? response.claims.map((c) => c.explanation).filter(Boolean).join(" ") || response.summary : sample ? "The sample evidence points to lower lifetime emissions for electric vehicles, even though making their batteries produces more emissions at first. Electricity from coal can narrow that benefit. The claim takes a limited case and presents it as true for all electric vehicles." : failed ? "The VERITAS backend could not be reached or returned an error, so no verdict was produced." : "VERITAS has no connected research service for this input. There is no evidence available, so it would be misleading to label it true or false.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cinematic-result border-t pt-12",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow text-primary",
				children: "VERIFICATION RESULT"
			}),
			failed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "alert",
				className: "mt-5 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Verification request failed: ", outcome?.error] }), !sample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1",
					children: "No verdict was produced."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "verdict-in mt-7 grid items-end gap-8 lg:grid-cols-[1fr_auto]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: `display verdict-label cinematic-verdict ${VERDICT_TONE[verdict] ?? "text-unverified"}`,
					children: verdict
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: response ? "CLAIMS CHECKED" : "CONFIDENCE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "display mt-3 text-7xl",
					children: confidence
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "result-section verdict-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "eyebrow",
						children: submission.mode === "text" ? "YOUR CLAIM" : submission.mode === "url" ? "YOUR URL" : "YOUR IMAGE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
						className: "mt-5 whitespace-pre-wrap wrap-break-word font-serif text-3xl leading-snug md:text-4xl",
						children: claim
					}),
					submission.mode === "image" && submission.preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: submission.preview,
						alt: "Your submitted image",
						className: "mt-6 max-h-96 w-full max-w-2xl object-contain object-left"
					}), submission.context && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 whitespace-pre-wrap wrap-break-words text-lg",
						children: submission.context
					})] })
				]
			}),
			submission.mode === "image" && !response && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "result-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "eyebrow text-primary",
					children: "IMAGE ASSESSMENT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-8 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
							className: "text-lg",
							children: "Claims in image"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-sm text-unverified",
							children: "NOT ASSESSED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "No text extraction or evidence research has run for this image."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
							className: "text-lg",
							children: "Authenticity & context"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-sm text-unverified",
							children: "NOT ASSESSED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "Manipulation, AI generation, and original context have not been checked. Appearance alone cannot prove authenticity."
						})
					] })]
				})]
			}),
			submission.mode === "url" && !response && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-lg text-muted-foreground",
				children: "The URL was accepted, but its page has not been retrieved or assessed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "result-section verdict-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "eyebrow text-primary",
					children: "WHY?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "result-copy mt-5",
					children: why
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "result-section cinematic-evidence",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "eyebrow text-primary",
						children: ["EVIDENCE ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-3 text-muted-foreground",
							children: ["/ ", items.length.toString().padStart(2, "0")]
						})]
					}),
					sample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "Sample source records · titles are descriptive labels, not verified publication citations."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7",
						children: items.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							id: `evidence-${i}`,
							className: `evidence-item ${selected === i ? "selected" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col justify-between gap-4 md:flex-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "eyebrow",
										children: ["SOURCE / 0", i + 1]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xl font-medium",
										children: s.name
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `font-mono text-sm ${s.tone}`,
										children: s.label
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-6 md:grid-cols-[1fr_auto_auto]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow",
											children: "TITLE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
											className: "mt-2 font-serif text-3xl leading-snug",
											children: s.title
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow",
											children: "DATE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-base",
											children: s.date
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow",
											children: "RELEVANCE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-mono text-sm text-primary",
											children: s.relevance.toUpperCase()
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow mt-6",
									children: "SHORT SUMMARY"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-3xl text-lg leading-relaxed text-muted-foreground",
									children: s.summary
								})
							]
						}, `${s.name}-${i}`))
					}),
					!items.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-lg text-muted-foreground",
						children: "No evidence retrieved for this claim."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "result-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "eyebrow text-primary",
						children: "SOURCES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex flex-col items-start gap-3",
						children: items.map((s, i) => s.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: s.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-base text-primary underline-offset-4 hover:underline",
							onFocus: () => onSelect(i),
							onMouseEnter: () => onSelect(i),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mr-3 font-mono text-xs text-muted-foreground",
									children: ["0", i + 1]
								}),
								s.name,
								" ↗"
							]
						}, `${s.name}-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "link",
							className: "h-auto whitespace-normal p-0 text-left text-base",
							onFocus: () => onSelect(i),
							onClick: () => {
								onSelect(i);
								document.getElementById(`evidence-${i}`)?.scrollIntoView({
									behavior: "smooth",
									block: "start"
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mr-3 font-mono text-xs text-muted-foreground",
								children: ["0", i + 1]
							}), s.name]
						}, `${s.name}-${i}`))
					}),
					!items.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-lg text-muted-foreground",
						children: "No sources used."
					})
				]
			})
		]
	});
}
function VerifyPage() {
	useReveal();
	const [claim, setClaim] = (0, import_react.useState)(null);
	const [sources, setSources] = (0, import_react.useState)(void 0);
	const [selected, setSelected] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-16 md:pt-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyDemo, {
			onResult: (c, s) => {
				setClaim(c);
				setSources(s);
			},
			selected,
			onSelect: setSelected
		}), claim !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceNetwork, {
			claim,
			sources,
			selected,
			onSelect: setSelected
		})]
	});
}
//#endregion
export { VerifyPage as component };
