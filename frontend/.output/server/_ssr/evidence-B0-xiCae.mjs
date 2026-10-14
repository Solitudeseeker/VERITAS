import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DE-Zgwtl.mjs";
import { t as PageIntro } from "./PageIntro-CoRSvlZS.mjs";
import { n as useReveal } from "./hooks-DPKKSuF-.mjs";
import { c as ArrowDown, s as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as SOURCES, t as EXAMPLE_CLAIM } from "./data-DPG1hT0f.mjs";
import { t as EvidenceNetwork } from "./EvidenceNetwork-BaBWnTeQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evidence-B0-xiCae.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EvidencePage() {
	useReveal();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const pinned = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			number: "03 / Evidence & sources",
			title: "Follow",
			accent: "the evidence.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A source is a starting point, not a verdict. Relevant findings are compared for what they support, what they contradict, and what context they leave out." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b px-6 py-12 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1600px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "eyebrow text-primary",
					children: "FROM CLAIM TO VERDICT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
					children: [
						"Claim",
						"Retrieved sources",
						"Relevant evidence",
						"Source comparison",
						"Verdict"
					].map((stage, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-5 lg:flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "eyebrow text-primary",
							children: ["0", i + 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-base",
							children: stage
						})] }), i < 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "ml-auto hidden size-4 shrink-0 text-primary lg:block",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
							className: "ml-auto size-4 text-primary lg:hidden",
							"aria-hidden": true
						})] })]
					}, stage))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-6 py-16 md:px-10 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1600px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-primary",
						children: "SAMPLE INVESTIGATION / LOCAL DEMONSTRATION"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 max-w-4xl font-serif text-3xl leading-snug md:text-5xl",
						children: EXAMPLE_CLAIM
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-center gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-lg text-violet",
							children: "MISLEADING"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-muted-foreground",
							children: "87% · illustrative confidence"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground",
						children: "The sample record points to lower lifetime emissions for electric vehicles in most settings. Battery production and coal-dependent electricity can reduce that advantage, but do not establish the claim as a general rule."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm text-muted-foreground",
						children: "Mock source records · descriptive titles, not verified citations. No live retrieval or assessment has run."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 flex items-center justify-between gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "eyebrow text-primary",
							children: "RELEVANT EVIDENCE / 04"
						}), selected !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "link",
							className: "h-auto p-0 text-sm",
							onClick: () => {
								pinned.current = null;
								setSelected(null);
							},
							children: "Clear selection"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: SOURCES.map((source, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							id: `evidence-${i}`,
							className: `evidence-item interactive-card ${selected === i ? "selected" : ""}`,
							onMouseEnter: () => setSelected(i),
							onMouseLeave: () => setSelected(pinned.current),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col justify-between gap-5 md:flex-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "eyebrow",
										children: ["SOURCE / 0", i + 1]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "link",
										className: "mt-2 h-auto whitespace-normal p-0 text-left text-xl text-foreground",
										"aria-pressed": selected === i,
										onFocus: () => setSelected(i),
										onBlur: () => setSelected(pinned.current),
										onClick: () => {
											pinned.current = i;
											setSelected(i);
										},
										children: source.name
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `font-mono text-sm ${source.supports ? "text-support" : "text-destructive"}`,
										children: source.supports ? "PARTIALLY SUPPORTS CLAIM" : "CONTRADICTS CLAIM"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-6 md:grid-cols-[1fr_auto_auto]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow",
											children: "TITLE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "mt-2 font-serif text-3xl leading-snug",
											children: source.title
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow",
											children: "DATE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2",
											children: source.date
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow",
											children: "RELEVANCE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-mono text-sm text-primary",
											children: source.relevance.toUpperCase()
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow mt-6",
									children: "SHORT SUMMARY"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-3xl text-lg leading-relaxed text-muted-foreground",
									children: source.note
								})
							]
						}, source.name))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceNetwork, {
			claim: EXAMPLE_CLAIM,
			selected,
			onSelect: setSelected
		})
	] });
}
//#endregion
export { EvidencePage as component };
