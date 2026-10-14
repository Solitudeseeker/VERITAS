
import { useEffect, useRef } from "react";
import intelligenceField from "@/assets/intelligence-field.jpg";
import evidenceArchive from "@/assets/evidence-archive.jpg";

type AtmosphereVariant = "ambient" | "hero" | "archive";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const COLORS = [
  "100, 150, 255",
  "80, 220, 255",
  "150, 110, 255",
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let width = 0;
    let height = 0;
    let frame = 0;
    let disposed = false;

    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
    };

    let particles: Particle[] = [];

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        window.innerWidth < 768 ? 18 : 42,
        Math.floor((width * height) / 18000)
      );

      while (particles.length < count) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          radius: Math.random() * 1.5 + 0.6,
          color: COLORS[
            Math.floor(Math.random() * COLORS.length)
          ],
        });
      }

      particles = particles.slice(0, count);
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();

      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const draw = () => {
      if (disposed) return;

      ctx.clearRect(0, 0, width, height);

      // Soft spotlight following the mouse.
      if (pointer.active && !reducedMotion.matches) {
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          220
        );

        glow.addColorStop(0, "rgba(90, 130, 255, 0.075)");
        glow.addColorStop(0.5, "rgba(110, 90, 255, 0.025)");
        glow.addColorStop(1, "rgba(90, 130, 255, 0)");

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      for (const particle of particles) {
        if (!reducedMotion.matches) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap particles around the background edges.
          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;

          // Gently repel particles near the cursor.
          if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);

            if (distance > 0 && distance < 115) {
              const force = ((115 - distance) / 115) * 0.018;

              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }

          // Keep movement slow and controlled.
          particle.vx *= 0.995;
          particle.vy *= 0.995;

          const speed = Math.hypot(particle.vx, particle.vy);
          const maxSpeed = 0.45;

          if (speed > maxSpeed) {
            particle.vx = (particle.vx / speed) * maxSpeed;
            particle.vy = (particle.vy / speed) * maxSpeed;
          }
        }

        // Draw connections between nearby particles.
        for (let j = particles.indexOf(particle) + 1; j < particles.length; j++) {
          const other = particles[j];
          const distance = Math.hypot(
            particle.x - other.x,
            particle.y - other.y
          );

          if (distance < 105) {
            const opacity = (1 - distance / 105) * 0.18;

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(110, 160, 255, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Draw each glowing particle.
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(${particle.color}, 0.65)`;
        ctx.fill();
      }

      if (!reducedMotion.matches) {
        frame = requestAnimationFrame(draw);
      }
    };

    const onMotionPreferenceChange = () => {
      cancelAnimationFrame(frame);
      draw();
    };

    const observer = new ResizeObserver(resize);

    observer.observe(parent);
    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onMotionPreferenceChange);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener(
        "visibilitychange",
        onMotionPreferenceChange
      );
      reducedMotion.removeEventListener(
        "change",
        onMotionPreferenceChange
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="atmosphere-particles"
      aria-hidden="true"
    />
  );
}

export function BackgroundAtmosphere({
  variant = "ambient",
}: {
  variant?: AtmosphereVariant;
}) {
  return (
    <div
      className={`atmosphere atmosphere-${variant}`}
      aria-hidden="true"
    >
      <img
        src={variant === "archive" ? evidenceArchive : intelligenceField}
        alt=""
        width={1920}
        height={1088}
        loading={variant === "hero" ? "eager" : "lazy"}
        className="atmosphere-image"
      />

      <div className="atmosphere-shade" />

      <ParticleField />

      <div className="atmosphere-scan" />

      <div className="atmosphere-traces">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
