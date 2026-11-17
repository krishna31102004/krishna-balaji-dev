import { useEffect, useRef } from "react";

/**
 * Page-wide dot grid behind the content. Dots near the cursor light up in
 * the theme's accent and get pushed away slightly. Colors are read from CSS
 * variables only when marked dirty (resize, theme or palette change), and the
 * loop skips drawing while the cursor is settled.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const GAP = 28;
    const RADIUS = 140;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let dirty = true;
    let base = "#666";
    let accent = "#fff";

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    const draw = () => {
      if (!reduced) raf = requestAnimationFrame(draw);

      const settled =
        Math.abs(mouse.tx - mouse.x) < 0.05 &&
        Math.abs(mouse.ty - mouse.y) < 0.05;
      if (settled && !dirty) return;

      if (dirty) {
        const styles = getComputedStyle(document.documentElement);
        base = styles.getPropertyValue("--soft").trim() || "#666";
        accent = styles.getPropertyValue("--neon-color").trim() || "#fff";
        dirty = false;
      }

      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      ctx.clearRect(0, 0, w, h);

      const active: number[] = [];
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = base;
      ctx.beginPath();
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          // Keep the 760px reading column clean.
          if (Math.abs(x - w / 2) < 392) continue;
          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          const t = Math.max(0, 1 - dist / RADIUS);
          if (t === 0) {
            ctx.moveTo(x + 0.9, y);
            ctx.arc(x, y, 0.9, 0, Math.PI * 2);
          } else {
            active.push(x, y, dist, t);
          }
        }
      }
      ctx.fill();

      for (let i = 0; i < active.length; i += 4) {
        const x = active[i], y = active[i + 1], dist = active[i + 2], t = active[i + 3];
        const push = t * t * 10;
        const px = dist ? x + ((x - mouse.x) / dist) * push : x;
        const py = dist ? y + ((y - mouse.y) / dist) * push : y;
        ctx.globalAlpha = 0.22 + t * 0.7;
        ctx.fillStyle = t > 0.05 ? accent : base;
        ctx.beginPath();
        ctx.arc(px, py, 0.9 + t * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    resize();
    draw();

    const onResize = () => {
      resize();
      if (reduced) draw();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    // Redraw once on palette / theme change when animation is off.
    const observer = new MutationObserver(() => {
      dirty = true;
      if (reduced) draw();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-palette"],
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
