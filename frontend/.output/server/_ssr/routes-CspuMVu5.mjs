import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as BackgroundAtmosphere } from "./BackgroundAtmosphere-COrHhnP6.mjs";
import { t as Button } from "./button-DE-Zgwtl.mjs";
import { n as useReveal, t as useMagnetic } from "./hooks-DPKKSuF-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CspuMVu5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HeroScene({ variant = "hero" }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let disposed = false;
		let cleanup = () => {};
		(async () => {
			const THREE = await import("../_libs/three.mjs").then((n) => n.t);
			const el = ref.current;
			if (!el || disposed) return;
			const mobile = window.innerWidth < 768;
			const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			const tokens = getComputedStyle(el);
			const color = (token) => {
				const probe = document.createElement("span");
				probe.style.color = tokens.getPropertyValue(token);
				el.appendChild(probe);
				const resolved = getComputedStyle(probe).color;
				probe.remove();
				const ctx = document.createElement("canvas").getContext("2d");
				if (!ctx) return new THREE.Color();
				ctx.fillStyle = resolved;
				ctx.fillRect(0, 0, 1, 1);
				const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;
				return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
			};
			const ivory = color("--scene-cyan");
			const amber = color("--scene-blue");
			const violet = color("--scene-violet");
			const indigo = color("--scene-indigo");
			const renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			});
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(el.clientWidth, el.clientHeight);
			el.appendChild(renderer.domElement);
			const scene = new THREE.Scene();
			scene.fog = new THREE.Fog(color("--background"), 8, 22);
			const camera = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, .1, 100);
			camera.position.set(0, 0, 12);
			const root = new THREE.Group();
			scene.add(root);
			scene.add(new THREE.AmbientLight(ivory, .4));
			const key = new THREE.PointLight(violet, 30, 30);
			key.position.set(4, 3, 6);
			scene.add(key);
			const nodes = [new THREE.Vector3(0, 0, 0)];
			const count = variant === "cta" ? 18 : mobile ? 22 : 38;
			for (let i = 0; i < count; i++) {
				const layer = i < count / 3 ? 2.2 : 4.2;
				const phi = Math.acos(1 - 2 * (i + .5) / count);
				const th = Math.PI * (1 + Math.sqrt(5)) * i;
				nodes.push(new THREE.Vector3(layer * Math.sin(phi) * Math.cos(th), layer * Math.sin(phi) * Math.sin(th) * .8, layer * Math.cos(phi)));
			}
			const geos = [];
			const mats = [];
			const core = new THREE.Mesh(geos[geos.length] = new THREE.IcosahedronGeometry(.45, 0), mats[mats.length] = new THREE.MeshStandardMaterial({
				color: amber,
				flatShading: true,
				emissive: amber,
				emissiveIntensity: 1.1
			}));
			root.add(core);
			const nodeGeo = new THREE.OctahedronGeometry(.09, 0);
			const nodeMat = new THREE.MeshStandardMaterial({
				color: violet,
				flatShading: true,
				emissive: indigo,
				emissiveIntensity: .3
			});
			geos.push(nodeGeo);
			mats.push(nodeMat);
			nodes.slice(1).forEach((p, i) => {
				const m = new THREE.Mesh(nodeGeo, i % 7 === 0 ? core.material : nodeMat);
				m.position.copy(p);
				m.scale.setScalar(i % 5 === 0 ? 1.8 : 1);
				root.add(m);
			});
			const pts = [];
			nodes.forEach((a, i) => {
				if (i === 0) return;
				if (a.length() < 3) pts.push(0, 0, 0, a.x, a.y, a.z);
				nodes.forEach((b, j) => {
					if (j > i && a.distanceTo(b) < 2.6) pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
				});
			});
			const lineGeo = new THREE.BufferGeometry();
			lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
			const lineMat = new THREE.LineBasicMaterial({
				color: ivory,
				transparent: true,
				opacity: .18
			});
			geos.push(lineGeo);
			mats.push(lineMat);
			root.add(new THREE.LineSegments(lineGeo, lineMat));
			for (let i = 0; i < 3; i++) {
				const g = new THREE.RingGeometry(2.2 + i * 1.1, 2.21 + i * 1.1, 96);
				const m = new THREE.MeshBasicMaterial({
					color: i === 1 ? violet : ivory,
					transparent: true,
					opacity: .12,
					side: THREE.DoubleSide
				});
				geos.push(g);
				mats.push(m);
				const r = new THREE.Mesh(g, m);
				r.rotation.x = Math.PI / 2 + i * .3;
				r.rotation.y = i * .5;
				r.userData["spin"] = 8e-4 * (i + 1) * (i % 2 ? -1 : 1);
				root.add(r);
			}
			const fragGeo = new THREE.PlaneGeometry(.35, .22);
			const fragMat = new THREE.MeshBasicMaterial({
				color: ivory,
				transparent: true,
				opacity: .08,
				side: THREE.DoubleSide
			});
			geos.push(fragGeo);
			mats.push(fragMat);
			for (let i = 0; i < (mobile ? 6 : 14); i++) {
				const f = new THREE.Mesh(fragGeo, fragMat);
				f.position.set((Math.random() - .5) * 10, (Math.random() - .5) * 6, (Math.random() - .5) * 6);
				f.rotation.set(Math.random() * 3, Math.random() * 3, 0);
				root.add(f);
			}
			const pc = mobile ? 250 : 700;
			const pp = new Float32Array(pc * 3);
			for (let i = 0; i < pc * 3; i++) pp[i] = (Math.random() - .5) * 18;
			const pGeo = new THREE.BufferGeometry();
			pGeo.setAttribute("position", new THREE.BufferAttribute(pp, 3));
			const pMat = new THREE.PointsMaterial({
				color: ivory,
				size: .02,
				transparent: true,
				opacity: .5
			});
			geos.push(pGeo);
			mats.push(pMat);
			const particles = new THREE.Points(pGeo, pMat);
			scene.add(particles);
			root.position.x = variant === "hero" && !mobile ? 2.6 : 0;
			const mouse = {
				x: 0,
				y: 0
			};
			const onMove = (e) => {
				mouse.x = e.clientX / window.innerWidth - .5;
				mouse.y = e.clientY / window.innerHeight - .5;
			};
			const onResize = () => {
				camera.aspect = el.clientWidth / el.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(el.clientWidth, el.clientHeight);
			};
			window.addEventListener("pointermove", onMove);
			window.addEventListener("resize", onResize);
			let visible = true;
			const io = new IntersectionObserver(([e]) => visible = !!e?.isIntersecting);
			io.observe(el);
			let raf = 0;
			const clock = new THREE.Clock();
			const tick = () => {
				raf = requestAnimationFrame(tick);
				if (!visible) return;
				const t = clock.getElapsedTime();
				const s = reduced ? 0 : 1;
				root.rotation.y = t * .06 * s + mouse.x * .4;
				root.rotation.x = Math.sin(t * .1) * .1 * s + mouse.y * .25;
				core.rotation.y = t * .4 * s;
				core.scale.setScalar(1 + Math.sin(t * 1.5) * .06 * s);
				root.children.forEach((c) => {
					if (c.userData["spin"]) c.rotation.z += c.userData["spin"] * s;
				});
				particles.rotation.y = t * .01 * s;
				camera.position.x += (mouse.x * 1.2 - camera.position.x) * .03;
				camera.position.y += (-mouse.y * .8 - camera.position.y) * .03;
				camera.lookAt(root.position.x * .5, 0, 0);
				renderer.render(scene, camera);
			};
			tick();
			cleanup = () => {
				cancelAnimationFrame(raf);
				io.disconnect();
				window.removeEventListener("pointermove", onMove);
				window.removeEventListener("resize", onResize);
				geos.forEach((g) => g.dispose());
				mats.forEach((m) => m.dispose());
				renderer.dispose();
				renderer.domElement.remove();
			};
		})();
		return () => {
			disposed = true;
			cleanup();
		};
	}, [variant]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: "absolute inset-0",
		"aria-hidden": true
	});
}
function Lines({ lines, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		"data-reveal": true,
		children: lines.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "line-mask",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: { transitionDelay: `${i * .12}s` },
				children: l
			})
		}, i))
	});
}
function Index() {
	useReveal();
	const cta = useMagnetic();
	const cta2 = useMagnetic();
	const para = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const f = () => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (para.current) para.current.style.transform = `translateY(${window.scrollY * .25}px)`;
		};
		window.addEventListener("scroll", f, { passive: true });
		return () => window.removeEventListener("scroll", f);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "top",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "product",
				className: "relative flex min-h-[92svh] items-end overflow-hidden px-6 pb-16 pt-32 md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundAtmosphere, { variant: "hero" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: para,
						className: "absolute inset-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroScene, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto w-full max-w-[1600px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow reveal mb-8",
								children: "Information verification · Est. 2026"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "display hero-heading uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, { lines: ["The truth", "deserves"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, {
									lines: ["evidence."],
									className: "block italic text-primary"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-sm text-lg text-muted-foreground",
									children: "VERITAS transforms information into evidence-backed understanding."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "editorial",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											ref: cta,
											to: "/verify",
											children: "Verify a claim →"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "technical",
										className: "btn btn-ghost h-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/how-it-works",
											children: "Explore how it works"
										})
									})]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden border-t px-6 py-32 md:px-10 md:py-48",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundAtmosphere, { variant: "archive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow reveal md:col-span-2",
							children: "The problem"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "display section-heading uppercase md:col-span-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, { lines: ["Information", "moves fast."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, {
								lines: ["Truth needs time."],
								className: "block italic text-muted-foreground"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "reveal md:col-span-4 md:col-start-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-3xl leading-snug",
								children: "Information is everywhere. Evidence is harder to find."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-muted-foreground",
								children: "A claim can circle the world in an afternoon. Checking it properly — reading the study, finding the dataset, weighing the counter-evidence — takes hours most people don't have. VERITAS does the slow work, and shows you all of it."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "reveal grid grid-cols-3 gap-6 border-t pt-8 md:col-span-6 md:col-start-2 md:row-start-3",
							children: [
								["6×", "faster spread of false claims"],
								["40+", "sources weighed per claim"],
								["100%", "of reasoning visible"]
							].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "display text-5xl md:text-6xl",
								children: n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: l
							})] }, l))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden border-t px-6 py-24 md:px-10 md:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundAtmosphere, { variant: "archive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-[1600px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow reveal text-primary",
						children: "The VERITAS experience"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-10 md:grid-cols-3",
						children: [
							{
								number: "01",
								title: "Investigate a claim.",
								copy: "Text, URLs, and images. Start with a question, then follow the reasoning.",
								to: "/verify",
								label: "Verify a claim"
							},
							{
								number: "02",
								title: "Understand the process.",
								copy: "Five deliberate steps from a statement to a transparent explanation.",
								to: "/how-it-works",
								label: "How it works"
							},
							{
								number: "03",
								title: "Explore the record.",
								copy: "Trace agreement, contradiction, and context through the sample source network.",
								to: "/evidence",
								label: "Evidence & sources"
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "interactive-card reveal border-t p-5 pt-6",
							style: { transitionDelay: `${Number(item.number) * 80}ms` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "eyebrow text-primary flex items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "interactive-icon inline-flex",
											children: item.number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "EXPLORE"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 font-serif text-4xl",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-sm leading-relaxed text-muted-foreground",
									children: item.copy
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "link",
									className: "mt-7 h-auto whitespace-normal p-0 text-left",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: item.to,
										children: [item.label, " →"]
									})
								})
							]
						}, item.number))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "about",
				className: "relative overflow-hidden border-t px-6 py-40 text-center md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundAtmosphere, { variant: "archive" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 opacity-60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroScene, { variant: "cta" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "display section-heading uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, { lines: ["Be curious."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, {
								lines: ["Then verify."],
								className: "block italic text-primary"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "editorial",
							className: "reveal mt-14",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								ref: cta2,
								to: "/verify",
								children: "Start verifying →"
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Index as component };
