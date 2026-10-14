import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as BackgroundAtmosphere } from "./BackgroundAtmosphere-COrHhnP6.mjs";
import { t as Button } from "./button-DE-Zgwtl.mjs";
import { _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BIwEfHj1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B9FGAJmQ.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
var NAV_LINKS = [
	{
		label: "Product",
		to: "/"
	},
	{
		label: "How it works",
		to: "/how-it-works"
	},
	{
		label: "Evidence",
		to: "/evidence"
	},
	{
		label: "About",
		to: "/about"
	}
];
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		const f = () => setScrolled(window.scrollY > 30);
		f();
		window.addEventListener("scroll", f, { passive: true });
		return () => window.removeEventListener("scroll", f);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `nav fixed inset-x-0 top-0 z-50 ${scrolled || open ? "scrolled" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					"aria-label": "VERITAS home",
					className: "flex items-center gap-2.5 font-serif text-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/veritas-logo.png",
						alt: "VERITAS Logo",
						className: "h-6 w-6 object-contain"
					}), "VERITAS"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Main navigation",
					className: "hidden gap-10 md:flex",
					children: NAV_LINKS.map(({ label, to }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to,
						activeOptions: { exact: true },
						activeProps: { className: "nav-active" },
						className: "eyebrow link-u text-foreground",
						children: label
					}, to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "technical",
					className: "hidden h-auto py-2.5 font-mono text-xs uppercase md:inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/verify",
						activeProps: { className: "border-primary" },
						children: ["Verify a claim ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "→"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "eyebrow text-foreground md:hidden",
					onClick: () => setOpen(!open),
					"aria-expanded": open,
					"aria-controls": "mobile-navigation",
					children: open ? "Close" : "Menu"
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			id: "mobile-navigation",
			"aria-label": "Mobile navigation",
			className: "flex flex-col gap-6 px-6 pb-10 pt-4 md:hidden",
			children: [...NAV_LINKS, {
				label: "Verify a claim",
				to: "/verify"
			}].map(({ label, to }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to,
				activeOptions: { exact: true },
				activeProps: { className: "text-primary" },
				onClick: () => setOpen(false),
				className: "font-serif text-4xl",
				children: label
			}, to))
		})]
	});
}
function SiteShell({ children }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "veritas-page overflow-x-clip",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundAtmosphere, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grain",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "page-transition",
				children
			}, pathname),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t px-6 py-14 md:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-end md:justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-serif text-4xl",
							children: "VERITAS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-lg italic text-muted-foreground",
							children: "Evidence before assumption."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							"aria-label": "Footer navigation",
							className: "flex flex-wrap gap-8",
							children: NAV_LINKS.map(({ label, to }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to,
								className: "eyebrow link-u text-foreground",
								activeOptions: { exact: true },
								activeProps: { className: "text-primary" },
								children: label
							}, to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "© 2026 Veritas · Prototype"
						})
					]
				})
			})
		]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "VERITAS" },
			{
				name: "description",
				content: "Evidence-backed information verification."
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Geist:wght@300..600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/veritas-logo.png",
				type: "image/svg+xml"
			},
			{
				rel: "icon",
				href: "/veritas-logo.png",
				type: "image/x-icon",
				sizes: "any"
			},
			{
				rel: "apple-touch-icon",
				href: "/veritas-logo.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$5.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$4 = () => import("./routes-CspuMVu5.mjs");
var Route$4 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "VERITAS — The truth deserves evidence" },
		{
			name: "description",
			content: "Discover VERITAS, a cinematic hackathon prototype exploring transparent claim verification, source comparison, and evidence-backed understanding."
		},
		{
			property: "og:title",
			content: "VERITAS — The truth deserves evidence"
		},
		{
			property: "og:description",
			content: "Evidence before assumption. Explore the VERITAS claim-verification prototype."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./about-Do5w-Ira.mjs");
var Route$3 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About VERITAS — Mission & Team" },
		{
			name: "description",
			content: "VERITAS is a hackathon project built to make evidence easier to find, understand, and trust. Meet the project roles and explore our mission."
		},
		{
			property: "og:title",
			content: "About VERITAS — Mission & Team"
		},
		{
			property: "og:description",
			content: "Evidence before assumption. The purpose, mission, and team behind the VERITAS prototype."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./evidence-B0-xiCae.mjs");
var Route$2 = createFileRoute("/evidence")({
	head: () => ({ meta: [
		{ title: "Evidence & Sources — VERITAS" },
		{
			name: "description",
			content: "Explore illustrative VERITAS source records and their relationships to a sample claim through a linked evidence list and interactive network."
		},
		{
			property: "og:title",
			content: "Evidence & Sources — VERITAS"
		},
		{
			property: "og:description",
			content: "Trace the record from claim to source comparison and verdict in the VERITAS evidence explorer."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./how-it-works-DZn2ptm_.mjs");
var Route$1 = createFileRoute("/how-it-works")({
	head: () => ({ meta: [
		{ title: "How Verification Works — VERITAS" },
		{
			name: "description",
			content: "Follow the five-step VERITAS pipeline: isolate a claim, retrieve sources, compare evidence, verify, and explain the reasoning."
		},
		{
			property: "og:title",
			content: "How Verification Works — VERITAS"
		},
		{
			property: "og:description",
			content: "From a single statement to a transparent verdict: the five stages of VERITAS."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./verify-SPz5OGvR.mjs");
var Route = createFileRoute("/verify")({
	head: () => ({ meta: [
		{ title: "Verify a Claim — VERITAS" },
		{
			name: "description",
			content: "Verify text claims with the VERITAS backend, and explore URL and image inputs. See the verdict, explanation, and evidence."
		},
		{
			property: "og:title",
			content: "Verify a Claim — VERITAS"
		},
		{
			property: "og:description",
			content: "A clear claim-to-evidence verification experience for text, URLs, and images."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	AboutRoute: Route$3.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$5
	}),
	EvidenceRoute: Route$2.update({
		id: "/evidence",
		path: "/evidence",
		getParentRoute: () => Route$5
	}),
	HowItWorksRoute: Route$1.update({
		id: "/how-it-works",
		path: "/how-it-works",
		getParentRoute: () => Route$5
	}),
	VerifyRoute: Route.update({
		id: "/verify",
		path: "/verify",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
