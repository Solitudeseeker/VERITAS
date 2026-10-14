globalThis.__nitro_main__ = import.meta.url;
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx+unenv.mjs";
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-13T17:26:01.054Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/about-DgE8cDUc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d1c-/heQ1lsxEv+DsjB49vnVjq0Bntc\"",
		"mtime": "2026-10-14T01:21:46.675Z",
		"size": 3356,
		"path": "../public/assets/about-DgE8cDUc.js"
	},
	"/assets/createLucideIcon-wEIiOvY5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a5-9tQYLRGPk+rFGZqPWvgr+eUinUE\"",
		"mtime": "2026-10-14T01:21:46.678Z",
		"size": 1189,
		"path": "../public/assets/createLucideIcon-wEIiOvY5.js"
	},
	"/assets/data-CLLYgm6w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"791-eBrwztF2SNH2UDeDRu2LpzICGKI\"",
		"mtime": "2026-10-14T01:21:46.679Z",
		"size": 1937,
		"path": "../public/assets/data-CLLYgm6w.js"
	},
	"/assets/evidence-SK2Nhi3x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12ea-TbNAPCY8R8loWJB7G6f7KfCvqkM\"",
		"mtime": "2026-10-14T01:21:46.679Z",
		"size": 4842,
		"path": "../public/assets/evidence-SK2Nhi3x.js"
	},
	"/assets/EvidenceNetwork-eTRxmIqA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e73-65ZXIscL0m3mR8LygWPhe6HWHjA\"",
		"mtime": "2026-10-14T01:21:46.671Z",
		"size": 3699,
		"path": "../public/assets/EvidenceNetwork-eTRxmIqA.js"
	},
	"/veritas-logo.png": {
		"type": "image/png",
		"etag": "\"4a63f-nM90XyWustz9BPp4fkZUHBw9HFQ\"",
		"mtime": "2026-10-13T12:52:21.592Z",
		"size": 304703,
		"path": "../public/veritas-logo.png"
	},
	"/assets/how-it-works-Nnn7UAQZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d6-X/LIr++pMzLjvxbifUaJU25tdxU\"",
		"mtime": "2026-10-14T01:21:46.681Z",
		"size": 4822,
		"path": "../public/assets/how-it-works-Nnn7UAQZ.js"
	},
	"/assets/hooks-D4GTLNde.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"40f-JFkmAxc5vmaE1ugvHm5V9QKrnto\"",
		"mtime": "2026-10-14T01:21:46.680Z",
		"size": 1039,
		"path": "../public/assets/hooks-D4GTLNde.js"
	},
	"/assets/evidence-archive-BbOaU_N4.jpg": {
		"type": "image/jpeg",
		"etag": "\"33e0d-F+/ToJLf4bnpks4w9PDeIIdGhzU\"",
		"mtime": "2026-10-14T01:21:46.688Z",
		"size": 212493,
		"path": "../public/assets/evidence-archive-BbOaU_N4.jpg"
	},
	"/assets/intelligence-field-D9wHDbyM.jpg": {
		"type": "image/jpeg",
		"etag": "\"30256-C60OzQwKcBbpclanntzaRJxrds0\"",
		"mtime": "2026-10-14T01:21:46.688Z",
		"size": 197206,
		"path": "../public/assets/intelligence-field-D9wHDbyM.jpg"
	},
	"/assets/routes-D6DZlzr6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27a0-B3lXiMagDeQDiAHC0YrgpuWn7CY\"",
		"mtime": "2026-10-14T01:21:46.681Z",
		"size": 10144,
		"path": "../public/assets/routes-D6DZlzr6.js"
	},
	"/assets/PageIntro-biS9yDNg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c6-YfM16YCX/q8RW39UbB6agkh2j8w\"",
		"mtime": "2026-10-14T01:21:46.675Z",
		"size": 710,
		"path": "../public/assets/PageIntro-biS9yDNg.js"
	},
	"/assets/index-CjIEHjg1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6469d-EFSlDHgXOwTstBqxYWigYDfFgQY\"",
		"mtime": "2026-10-14T01:21:46.671Z",
		"size": 411293,
		"path": "../public/assets/index-CjIEHjg1.js"
	},
	"/assets/verify-C1wyr2UD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6e5-TFu5s/kV3UJtsg5ZblElrtQrq3o\"",
		"mtime": "2026-10-14T01:21:46.686Z",
		"size": 42725,
		"path": "../public/assets/verify-C1wyr2UD.js"
	},
	"/assets/styles-B9FGAJmQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16dca-LN9MGT+Dw3E6tZ8oJOnZNbnyWGo\"",
		"mtime": "2026-10-14T01:21:46.689Z",
		"size": 93642,
		"path": "../public/assets/styles-B9FGAJmQ.css"
	},
	"/assets/three.module-sSUkXgIW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3d2d-b4Q37bpDmNhxwwd114MokHOYm0U\"",
		"mtime": "2026-10-14T01:21:46.683Z",
		"size": 736557,
		"path": "../public/assets/three.module-sSUkXgIW.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_vTYmov = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_vTYmov
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
