import { useEffect, useRef } from "react";
import type * as T from "three";

export function HeroScene({ variant = "hero" }: { variant?: "hero" | "cta" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      const THREE = await import("three");
      const el = ref.current;
      if (!el || disposed) return;
      const mobile = window.innerWidth < 768;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tokens = getComputedStyle(el);
      const color = (token: string) => {
        const probe = document.createElement("span");
        probe.style.color = tokens.getPropertyValue(token);
        el.appendChild(probe);
        const resolved = getComputedStyle(probe).color;
        probe.remove();
        // Canvas converts modern CSS colors to an sRGB string Three.js understands.
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

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(el.clientWidth, el.clientHeight);
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(color("--background"), 8, 22);
      const camera = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 12);

      const root = new THREE.Group();
      scene.add(root);
      scene.add(new THREE.AmbientLight(ivory, 0.4));
      const key = new THREE.PointLight(violet, 30, 30);
      key.position.set(4, 3, 6);
      scene.add(key);

      // Nodes: claim core, evidence ring, outer sources
      const nodes: T.Vector3[] = [new THREE.Vector3(0, 0, 0)];
      const count = variant === "cta" ? 18 : mobile ? 22 : 38;
      for (let i = 0; i < count; i++) {
        const layer = i < count / 3 ? 2.2 : 4.2;
        const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
        const th = Math.PI * (1 + Math.sqrt(5)) * i;
        nodes.push(new THREE.Vector3(
          layer * Math.sin(phi) * Math.cos(th),
          layer * Math.sin(phi) * Math.sin(th) * 0.8,
          layer * Math.cos(phi),
        ));
      }
      const geos: T.BufferGeometry[] = [];
      const mats: T.Material[] = [];
      const core = new THREE.Mesh(
        (geos[geos.length] = new THREE.IcosahedronGeometry(0.45, 0)),
        (mats[mats.length] = new THREE.MeshStandardMaterial({ color: amber, flatShading: true, emissive: amber, emissiveIntensity: 1.1 })),
      );
      root.add(core);
      const nodeGeo = new THREE.OctahedronGeometry(0.09, 0);
      const nodeMat = new THREE.MeshStandardMaterial({ color: violet, flatShading: true, emissive: indigo, emissiveIntensity: 0.3 });
      geos.push(nodeGeo); mats.push(nodeMat);
      nodes.slice(1).forEach((p, i) => {
        const m = new THREE.Mesh(nodeGeo, i % 7 === 0 ? (core.material as T.Material) : nodeMat);
        m.position.copy(p);
        m.scale.setScalar(i % 5 === 0 ? 1.8 : 1);
        root.add(m);
      });
      // Edges
      const pts: number[] = [];
      nodes.forEach((a, i) => {
        if (i === 0) return;
        if (a.length() < 3) pts.push(0, 0, 0, a.x, a.y, a.z);
        nodes.forEach((b, j) => { if (j > i && a.distanceTo(b) < 2.6) pts.push(a.x, a.y, a.z, b.x, b.y, b.z); });
      });
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      const lineMat = new THREE.LineBasicMaterial({ color: ivory, transparent: true, opacity: 0.18 });
      geos.push(lineGeo); mats.push(lineMat);
      root.add(new THREE.LineSegments(lineGeo, lineMat));
      // Transparent layers (evidence planes)
      for (let i = 0; i < 3; i++) {
        const g = new THREE.RingGeometry(2.2 + i * 1.1, 2.21 + i * 1.1, 96);
        const m = new THREE.MeshBasicMaterial({ color: i === 1 ? violet : ivory, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
        geos.push(g); mats.push(m);
        const r = new THREE.Mesh(g, m);
        r.rotation.x = Math.PI / 2 + i * 0.3; r.rotation.y = i * 0.5;
        r.userData['spin'] = 0.0008 * (i + 1) * (i % 2 ? -1 : 1);
        root.add(r);
      }
      // Fragments
      const fragGeo = new THREE.PlaneGeometry(0.35, 0.22);
      const fragMat = new THREE.MeshBasicMaterial({ color: ivory, transparent: true, opacity: 0.08, side: THREE.DoubleSide });
      geos.push(fragGeo); mats.push(fragMat);
      for (let i = 0; i < (mobile ? 6 : 14); i++) {
        const f = new THREE.Mesh(fragGeo, fragMat);
        f.position.set((Math.random() - .5) * 10, (Math.random() - .5) * 6, (Math.random() - .5) * 6);
        f.rotation.set(Math.random() * 3, Math.random() * 3, 0);
        root.add(f);
      }
      // Particles
      const pc = mobile ? 250 : 700;
      const pp = new Float32Array(pc * 3);
      for (let i = 0; i < pc * 3; i++) pp[i] = (Math.random() - 0.5) * 18;
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pp, 3));
      const pMat = new THREE.PointsMaterial({ color: ivory, size: 0.02, transparent: true, opacity: 0.5 });
      geos.push(pGeo); mats.push(pMat);
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      root.position.x = variant === "hero" && !mobile ? 2.6 : 0;

      const mouse = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.x = e.clientX / window.innerWidth - 0.5;
        mouse.y = e.clientY / window.innerHeight - 0.5;
      };
      const onResize = () => {
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(el.clientWidth, el.clientHeight);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("resize", onResize);

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
      io.observe(el);

      let raf = 0;
      const clock = new THREE.Clock();
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const t = clock.getElapsedTime();
        const s = reduced ? 0 : 1;
        root.rotation.y = t * 0.06 * s + mouse.x * 0.4;
        root.rotation.x = Math.sin(t * 0.1) * 0.1 * s + mouse.y * 0.25;
        core.rotation.y = t * 0.4 * s;
        core.scale.setScalar(1 + Math.sin(t * 1.5) * 0.06 * s);
        root.children.forEach((c) => { if (c.userData['spin']) c.rotation.z += c.userData['spin'] * s; });
        particles.rotation.y = t * 0.01 * s;
        camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03;
        camera.position.y += (-mouse.y * 0.8 - camera.position.y) * 0.03;
        camera.lookAt(root.position.x * 0.5, 0, 0);
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
    return () => { disposed = true; cleanup(); };
  }, [variant]);

  return <div ref={ref} className="absolute inset-0" aria-hidden />;
}
