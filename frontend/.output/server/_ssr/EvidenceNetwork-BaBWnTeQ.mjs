import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DE-Zgwtl.mjs";
import { a as isSampleClaim, n as SOURCES } from "./data-DPG1hT0f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EvidenceNetwork-BaBWnTeQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var POS = [
	{
		x: 16,
		y: 18
	},
	{
		x: 84,
		y: 18
	},
	{
		x: 16,
		y: 82
	},
	{
		x: 84,
		y: 82
	}
];
var TONE = {
	support: "text-support",
	destructive: "text-destructive",
	muted: "text-muted-foreground"
};
var SAMPLE = SOURCES.map((s) => ({
	name: s.name,
	date: s.date,
	note: s.note,
	label: s.supports ? "PARTIAL SUPPORT" : "CONTRADICTS",
	tone: s.supports ? "support" : "destructive"
}));
function EvidenceNetwork({ claim, selected, onSelect, sources: given }) {
	const pinned = (0, import_react.useRef)(null);
	const sources = given ?? (isSampleClaim(claim) ? SAMPLE : []);
	const select = (i) => {
		pinned.current = i;
		onSelect(i);
		document.getElementById(`evidence-${i}`)?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "evidence",
		className: "border-t px-6 py-24 md:px-10 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 md:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow reveal md:col-span-3",
						children: "EVIDENCE NETWORK"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "display reveal text-5xl md:col-span-8 md:text-7xl",
						children: ["Every verdict shows ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: "text-primary",
							children: "its working."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mt-10 text-primary",
					children: "CLAIM → EVIDENCE → SOURCES"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "network-field relative mt-10 hidden min-h-[580px] md:block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "absolute inset-0 h-full w-full",
							viewBox: "0 0 100 100",
							preserveAspectRatio: "none",
							"aria-hidden": true,
							children: sources.map((_, i) => {
								const p = POS[i];
								if (!p) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: `M50 50 C ${(50 + p.x) / 2} 50, ${(50 + p.x) / 2} ${p.y}, ${p.x} ${p.y}`,
									vectorEffect: "non-scaling-stroke",
									className: `edge ${selected === i ? "hot" : ""}`
								}, i);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "network-core absolute left-1/2 top-1/2 w-[38%] max-w-sm -translate-x-1/2 -translate-y-1/2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow text-primary",
								children: "CLAIM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-h-32 overflow-auto whitespace-pre-wrap font-serif text-2xl",
								children: claim
							})]
						}),
						sources.slice(0, POS.length).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "technical",
							onMouseEnter: () => onSelect(i),
							onMouseLeave: () => onSelect(pinned.current),
							onFocus: () => onSelect(i),
							onBlur: () => onSelect(pinned.current),
							onClick: () => select(i),
							"aria-label": `Highlight evidence from ${s.name}`,
							"aria-pressed": selected === i,
							className: `network-node absolute w-[24%] max-w-64 -translate-x-1/2 -translate-y-1/2 ${selected === i ? "border-primary" : ""} ${selected !== null && selected !== i ? "opacity-50" : ""}`,
							style: {
								left: `${POS[i]?.x}%`,
								top: `${POS[i]?.y}%`
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "eyebrow",
									children: [
										"SOURCE 0",
										i + 1,
										" · ",
										s.date
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 text-left text-lg",
									children: s.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `mt-3 font-mono text-xs ${TONE[s.tone]}`,
									children: s.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-3 text-left text-sm text-muted-foreground",
									children: s.note
								})
							]
						}, `${s.name}-${i}`))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "network-core",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-primary",
							children: "CLAIM"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 whitespace-pre-wrap font-serif text-2xl leading-snug",
							children: claim
						})]
					}), sources.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-8 w-px bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "technical",
						"aria-pressed": selected === i,
						onClick: () => select(i),
						className: `network-node w-full ${selected === i ? "border-primary" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "eyebrow",
								children: [
									"EVIDENCE 0",
									i + 1,
									" / SOURCE"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 text-lg",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `mt-2 font-mono text-xs ${TONE[s.tone]}`,
								children: s.label
							})
						]
					})] }, `${s.name}-${i}`))]
				}),
				!sources.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-lg text-muted-foreground",
					children: "No evidence or source connections available for this claim."
				})
			]
		})
	});
}
//#endregion
export { EvidenceNetwork as t };
