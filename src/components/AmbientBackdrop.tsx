import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Founder-tech ambient backdrop:
 * - Subtle animated blueprint grid (CSS, GPU-cheap)
 * - Low-opacity floating nodes connected by thin lines (canvas)
 * Inspired by Linear / Vercel / Stripe — alive but not distracting.
 */
export default function AmbientBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0, dpr = 1;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    const seed = () => {
      const count = Math.min(48, Math.floor((w * h) / 26000));
      nodes.length = 0;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener("resize", resize);

    const LINK = 150;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const o = (1 - Math.sqrt(d2) / LINK) * 0.18;
            ctx.strokeStyle = `rgba(180,160,255,${o})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = "rgba(200,180,255,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  const gridStyle = useMemo<React.CSSProperties>(() => ({
    backgroundImage:
      "linear-gradient(to right, rgba(180,160,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(180,160,255,0.06) 1px, transparent 1px)",
    backgroundSize: "56px 56px",
    maskImage:
      "radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)",
    WebkitMaskImage:
      "radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)",
  }), []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Blueprint grid */}
      <div
        className={reduced ? "absolute inset-0" : "absolute inset-0 animate-[gridDrift_60s_linear_infinite]"}
        style={gridStyle}
      />
      {/* Soft aurora blobs */}
      <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
           style={{ background: "radial-gradient(circle, oklch(0.70 0.26 310 / 0.45), transparent 70%)" }} />
      <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-25"
           style={{ background: "radial-gradient(circle, oklch(0.75 0.24 50 / 0.40), transparent 70%)" }} />
      {/* Floating nodes + links */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />
      {/* Vignette to keep content readable */}
      <div className="absolute inset-0"
           style={{ background: "radial-gradient(ellipse at 50% 0%, transparent 50%, oklch(0.11 0.04 285 / 0.55) 100%)" }} />
      <style>{`
        @keyframes gridDrift {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 56px 56px, 56px 56px; }
        }
      `}</style>
    </div>
  );
}