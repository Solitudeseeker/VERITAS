import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DE-Zgwtl.mjs";
import { t as PageIntro } from "./PageIntro-CoRSvlZS.mjs";
import { n as useReveal } from "./hooks-DPKKSuF-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as STAGES } from "./data-DPG1hT0f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-DZn2ptm_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LABELS = [
	"ISOLATE THE STATEMENT",
	"GATHER THE RECORD",
	"WEIGH AGREEMENT",
	"CALIBRATE THE VERDICT",
	"SHOW THE REASONING"
];
function PipelineVisual({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pipeline-visual mt-8 max-w-md",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 400 110",
			className: "h-28 w-full",
			children: [
				[
					55,
					125,
					200,
					275,
					345
				].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: i <= step ? "pipeline-lit" : "pipeline-dim",
					children: [
						i < 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: `M ${x + 13} 55 H ${x + 57}`,
							className: "pipeline-edge"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: x,
							cy: "55",
							r: i === step ? 16 : 8,
							className: "pipeline-point"
						}),
						i === step && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: x,
							cy: "55",
							r: "27",
							className: "pipeline-ring pulse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x,
							y: "98",
							textAnchor: "middle",
							className: "pipeline-label",
							children: ["0", i + 1]
						})
					]
				}, x)),
				step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M125 39 V12 H175",
					className: "pipeline-edge"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M125 71 V82 H85",
					className: "pipeline-edge"
				})] }),
				step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M185 40 L165 15 H235 L215 40",
					className: "pipeline-edge"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M185 70 L165 85 H235 L215 70",
					className: "pipeline-edge"
				})] }),
				step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "m267 55 6 6 11-13",
					className: "pipeline-check"
				}),
				step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M330 32 H360 M330 23 H350 M330 78 H360",
					className: "pipeline-edge"
				}) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow text-primary",
			children: LABELS[step]
		})]
	});
}
function Process() {
	const wrap = (0, import_react.useRef)(null);
	const [p, setP] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const f = () => {
			const el = wrap.current;
			if (!el) return;
			const r = el.getBoundingClientRect();
			const total = el.offsetHeight - window.innerHeight;
			setP(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0);
		};
		f();
		window.addEventListener("scroll", f, { passive: true });
		return () => window.removeEventListener("scroll", f);
	}, []);
	const active = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "how",
		className: "border-t",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: wrap,
			className: "relative hidden md:block",
			style: { height: `${STAGES.length * 90}vh` },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 flex h-screen flex-col justify-center overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mb-12 flex w-full max-w-[1600px] items-end justify-between px-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: [
							"How it works — ",
							STAGES[active]?.n,
							" / 05"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: STAGES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-px w-12 transition-colors duration-700 ${i <= active ? "bg-primary" : "bg-border"}` }, s.n))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-[8vw] pl-10 transition-transform duration-[900ms] ease-out",
					style: { transform: `translateX(calc(${-p * (STAGES.length - 1)} * (55vw + 8vw)))` },
					children: STAGES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "w-[55vw] shrink-0 transition-opacity duration-700",
						style: { opacity: i === active ? 1 : .18 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm text-primary",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "display section-heading mt-4 uppercase",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-8 max-w-md text-lg text-muted-foreground",
								children: s.d
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineVisual, { step: i })
						]
					}, s.n))
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-20 px-6 py-24 md:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "How it works"
			}), STAGES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "reveal border-t pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-sm text-primary",
						children: s.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display mt-2 text-6xl uppercase",
						children: s.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: s.d
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineVisual, { step: i })
				]
			}, s.n))]
		})]
	});
}
function HowItWorksPage() {
	useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			number: "02 / The process",
			title: "From claim",
			accent: "to clarity.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "One statement. Five deliberate steps. A verdict grounded in evidence, with the reasoning left open." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1600px] px-6 py-8 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: "The intended research pipeline · the current prototype simulates these stages using sample evidence; live retrieval and assessment are not connected."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t px-6 py-20 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-4xl md:text-5xl",
					children: "Evidence, not a black box."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "editorial",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/verify",
						children: ["Verify a claim ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "→"
						})]
					})
				})]
			})
		})
	] });
}
//#endregion
export { HowItWorksPage as component };
