import { r as __toESM } from "../_runtime.mjs";
import { s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hooks-DPKKSuF-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Adds `.in` to every `.reveal` / `.line-mask` / `[data-reveal]` element when it enters the viewport. */
function useReveal() {
	(0, import_react.useEffect)(() => {
		const io = new IntersectionObserver((entries) => entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("in");
				io.unobserve(e.target);
			}
		}), { threshold: .15 });
		const observe = () => document.querySelectorAll(".reveal:not(.in), [data-reveal]:not(.in)").forEach((el) => io.observe(el));
		observe();
		const mutations = new MutationObserver(observe);
		mutations.observe(document.getElementById("main-content") ?? document.body, {
			childList: true,
			subtree: true
		});
		return () => {
			io.disconnect();
			mutations.disconnect();
		};
	}, []);
}
function useMagnetic(strength = .3) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const move = (e) => {
			const r = el.getBoundingClientRect();
			el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
		};
		const leave = () => el.style.transform = "";
		el.addEventListener("pointermove", move);
		el.addEventListener("pointerleave", leave);
		return () => {
			el.removeEventListener("pointermove", move);
			el.removeEventListener("pointerleave", leave);
		};
	}, [strength]);
	return ref;
}
//#endregion
export { useReveal as n, useMagnetic as t };
