import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/*  Text scramble: decrypts into place the first time it scrolls in.   */
/* ------------------------------------------------------------------ */

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFKX";

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const dur = 700;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const settled = Math.floor(p * text.length);
        setOut(
          text
            .split("")
            .map((c, i) => (i < settled || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join("")
        );
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Spotlight: a soft accent glow that follows the cursor on a card.   */
/* ------------------------------------------------------------------ */

export function Spotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={`group/spot relative ${className}`}>
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--sx) var(--sy), color-mix(in srgb, var(--neon-color) 14%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(220px circle at var(--sx) var(--sy), color-mix(in srgb, var(--neon-color) 70%, transparent), transparent 70%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic: pulls its child slightly toward the cursor.              */
/* ------------------------------------------------------------------ */

export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 250, damping: 15, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reducedMotion() || e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Velocity marquee: drifts on its own, speeds up as you scroll.      */
/* ------------------------------------------------------------------ */

export function VelocityMarquee({ items, baseSpeed = 2, reverse = false }: { items: string[]; baseSpeed?: number; reverse?: boolean }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const dir = useRef(reverse ? -1 : 1);
  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (reducedMotion()) return;
    const b = boost.get();
    if (b < 0) dir.current = reverse ? 1 : -1;
    else if (b > 0) dir.current = reverse ? -1 : 1;
    const width = (trackRef.current?.scrollWidth ?? 0) / 2;
    if (!width) return;
    let next = x.get() - dir.current * baseSpeed * (delta / 16) * (1 + Math.abs(b));
    if (next <= -width) next += width;
    if (next > 0) next -= width;
    x.set(next);
  });

  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-6 font-mono text-[13px] text-[var(--muted)]">
            {item}
            <span className="size-1 rounded-full bg-[var(--neon-color)] opacity-70" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
