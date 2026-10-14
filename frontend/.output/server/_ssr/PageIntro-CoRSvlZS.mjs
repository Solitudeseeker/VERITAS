import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as BackgroundAtmosphere } from "./BackgroundAtmosphere-COrHhnP6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageIntro-CoRSvlZS.js
var import_jsx_runtime = require_jsx_runtime();
function PageIntro({ number, title, accent, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative overflow-hidden border-b px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundAtmosphere, { variant: "archive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-[1600px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow reveal text-primary",
					children: ["VERITAS / ", number]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "display section-heading reveal mt-8 uppercase",
					children: [title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "mt-2 block text-primary",
						children: accent
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "reveal mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground",
					children
				})
			]
		})]
	});
}
//#endregion
export { PageIntro as t };
