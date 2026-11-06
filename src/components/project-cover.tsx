import { useEffect, useRef } from "react";
import { type Project } from "@/config/site";

// One hue per project, picked from the title so it stays stable.
const HUES = [215, 265, 160, 25, 330, 190, 45];

function hueFor(title: string) {
  let h = 0;
  for (const c of title) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return HUES[h % HUES.length];
}

/** Animated aurora glow used behind generated covers. */
export function CoverAurora({ title }: { title: string }) {
  const hue = hueFor(title);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -left-1/4 -top-1/2 h-[140%] w-[80%] rounded-full opacity-50 blur-3xl animate-cover-drift"
        style={{ background: `hsl(${hue} 90% 55%)` }}
      />
      <div
        className="absolute -right-1/4 -bottom-1/2 h-[120%] w-[70%] rounded-full opacity-35 blur-3xl animate-cover-drift-rev"
        style={{ background: `hsl(${(hue + 50) % 360} 85% 55%)` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  );
}

/**
 * Stand-in screenshot: a small app window with the project's name and
 * stack, so cards without a real image still have a first look.
 */
export function CoverWindow({ project: p }: { project: Project }) {
  if (p.kind === "research") return <CoverPaper project={p} />;

  const hue = hueFor(p.title);
  const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="flex h-full w-full flex-col bg-[var(--card)]/85 backdrop-blur-md">
      <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-2.5 py-1.5">
        <span className="size-1.5 rounded-full bg-rose-400/80" />
        <span className="size-1.5 rounded-full bg-amber-400/80" />
        <span className="size-1.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate rounded bg-[var(--chip)] px-2 py-px font-mono text-[8px] text-[var(--soft)]">
          ~/{slug}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <p
            className="font-mono text-[8px] uppercase tracking-widest"
            style={{ color: `hsl(${hue} 85% 65%)` }}
          >
            {p.categories?.[0] ?? "Project"} · {p.year}
          </p>
          <p className="mt-1 font-serif text-xl leading-none text-[var(--fg)]">{p.title}</p>
        </div>

        <div className="space-y-1">
          {[78, 56, 66].map((w, i) => (
            <div
              key={i}
              className="h-1 rounded-full bg-[var(--line)] animate-pulse"
              style={{ width: `${w}%`, animationDelay: `${i * 0.3}s` }}
            />
          ))}
          <div className="flex flex-wrap gap-1 pt-1">
            {p.stack.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded border px-1.5 py-px font-mono text-[7.5px] text-[var(--muted)]"
                style={{ borderColor: `hsl(${hue} 80% 60% / 0.4)` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Muted looping background video. Plays only while on screen; HLS streams
 * load hls.js on demand (Safari plays them natively).
 */
export function CoverVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let hls: { destroy: () => void } | null = null;
    let cancelled = false;

    // React doesn't reliably set the muted attribute, and autoplay needs it.
    video.muted = true;

    if (src.endsWith(".m3u8")) {
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled) return;
        if (Hls.isSupported()) {
          const instance = new Hls();
          instance.loadSource(src);
          instance.attachMedia(video);
          hls = instance;
        } else {
          video.src = src; // Safari plays HLS natively.
        }
        video.play().catch(() => {});
      });
    } else {
      video.src = src;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);

    return () => {
      cancelled = true;
      observer.disconnect();
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
    />
  );
}

/** Paper-style cover for research work: a title page with a results plot. */
function CoverPaper({ project: p }: { project: Project }) {
  // Two series climbing over "gameweeks": model vs crowd baseline.
  const model = [8, 14, 13, 20, 24, 23, 30, 34, 33, 40];
  const crowd = [8, 11, 12, 14, 16, 17, 19, 20, 22, 23];
  const path = (ys: number[]) =>
    ys.map((y, i) => `${i ? "L" : "M"}${(i / (ys.length - 1)) * 100} ${44 - y}`).join(" ");

  return (
    <div className="flex h-full w-full flex-col bg-[#f7f5ef] px-3 py-2.5 text-[#1a1a1a]">
      <div className="flex items-center justify-between border-b border-black/15 pb-1 font-mono text-[6.5px] uppercase tracking-widest text-black/50">
        <span>Research · ASU</span>
        <span>{p.year}</span>
      </div>

      <p className="mt-1.5 font-serif text-[15px] leading-[1.05]">
        Forecasting &amp; Optimizing Fantasy Premier League Squads
      </p>
      <p className="mt-0.5 font-serif text-[7.5px] italic text-black/60">K. Balaji · Arizona State University</p>

      <div className="mt-1.5 grid flex-1 grid-cols-[1fr_1.1fr] gap-2">
        <div className="space-y-[3px] pt-0.5">
          <p className="font-mono text-[6px] uppercase tracking-wider text-black/50">Abstract</p>
          {[100, 92, 97, 88, 95, 70].map((w, i) => (
            <div key={i} className="h-[2px] rounded bg-black/20" style={{ width: `${w}%` }} />
          ))}
        </div>

        <svg viewBox="-4 0 108 48" className="h-full w-full">
          <line x1="0" y1="44" x2="100" y2="44" stroke="rgba(0,0,0,.35)" strokeWidth=".6" />
          <line x1="0" y1="0" x2="0" y2="44" stroke="rgba(0,0,0,.35)" strokeWidth=".6" />
          <path d={path(crowd)} fill="none" stroke="rgba(0,0,0,.4)" strokeWidth="1.2" strokeDasharray="2 2" />
          <path d={path(model)} fill="none" stroke="#2547e8" strokeWidth="1.6" />
          <text x="62" y="9" fontSize="5.5" fill="#2547e8" fontFamily="monospace">top 0.9%</text>
        </svg>
      </div>
    </div>
  );
}
