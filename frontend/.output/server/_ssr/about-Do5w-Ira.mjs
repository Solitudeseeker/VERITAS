import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as BackgroundAtmosphere } from "./BackgroundAtmosphere-COrHhnP6.mjs";
import { t as Button } from "./button-DE-Zgwtl.mjs";
import { t as PageIntro } from "./PageIntro-CoRSvlZS.mjs";
import { n as useReveal } from "./hooks-DPKKSuF-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as UserRound } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-Do5w-Ira.js
var import_jsx_runtime = require_jsx_runtime();
var TEAM_MEMBERS = [
	"Jyoti",
	"Biswajit",
	"Anurag",
	"Firoz",
	"Zeenat"
];
function AboutPage() {
	useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			number: "04 / About VERITAS",
			title: "Evidence before",
			accent: "assumption.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "VERITAS explores a simple idea: understanding a claim should start with its evidence, not its popularity." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-6 py-20 md:px-10 md:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "eyebrow reveal text-primary md:col-span-3",
					children: "ABOUT VERITAS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal max-w-3xl md:col-span-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-3xl leading-snug md:text-4xl",
							children: "A clearer way to question what we read, see, and share."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-lg leading-relaxed text-muted-foreground",
							children: "Built as a hackathon prototype, VERITAS brings the claim, verdict, explanation, and sources into one readable experience. Its evidence network makes agreement and contradiction visible without hiding the record behind a score."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-lg leading-relaxed text-muted-foreground",
							children: "Today, verification is a local demonstration with illustrative evidence. Connecting live research is the next step; unsupported claims remain unverified."
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden border-y px-6 py-24 md:px-10 md:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundAtmosphere, { variant: "archive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-[1600px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "eyebrow reveal text-primary",
					children: "OUR MISSION"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "reveal mt-8 max-w-4xl font-serif text-5xl leading-tight md:text-7xl",
					children: ["Make evidence easier to find, understand, and ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "text-primary",
						children: "trust."
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-6 py-20 md:px-10 md:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1600px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "eyebrow reveal text-primary",
					children: "THE TEAM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5",
					children: TEAM_MEMBERS.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "reveal border-t pt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
								className: "size-10 text-primary",
								strokeWidth: 1,
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "eyebrow",
								children: ["0", i + 1]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-3xl",
							children: name
						})]
					}, i))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t px-6 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-4xl",
					children: "Be curious. Then verify."
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
export { AboutPage as component };
