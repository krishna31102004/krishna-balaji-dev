import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, type Palette } from "./theme-provider";
import { runScene, type SceneKind } from "./festive-scenes";

const isFestive = (p: Palette): p is SceneKind =>
  p === "christmas" || p === "diwali" || p === "halloween";

/**
 * Seasonal decorations for the festive themes: a canvas scene (snow and a
 * sleigh / fireworks and a sparkler cursor / bats, ghosts and lightning)
 * plus hand-drawn SVG ornaments. Click anywhere for a burst.
 * Everything is pointer-events: none so the page stays usable.
 */
export function FestiveLayer() {
  const { palette } = useTheme();
  const festive = isFestive(palette) ? palette : null;

  return (
    <AnimatePresence mode="wait">
      {festive && (
        <motion.div
          key={festive}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[45] overflow-hidden"
        >
          <SceneCanvas kind={festive} />
          {festive === "christmas" && <Christmas />}
          {festive === "diwali" && <Diwali />}
          {festive === "halloween" && <Halloween />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SceneCanvas({ kind }: { kind: SceneKind }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => (ref.current ? runScene(ref.current, kind) : undefined), [kind]);
  return <canvas ref={ref} className="absolute inset-0" />;
}

/** Positions items along two sagging swags just under the nav. */
function Swag({ count, children }: { count: number; children: (i: number, sag: number) => React.ReactNode }) {
  const sag = (x: number) => 6 + 22 * Math.sin(((x * 2) % 1) * Math.PI);
  const d = Array.from({ length: 101 }, (_, i) => `${i ? "L" : "M"}${i} ${sag(i / 100)}`).join(" ");

  return (
    <div className="absolute inset-x-0 top-[58px] h-16">
      <svg className="absolute inset-x-0 top-0 h-10 w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <path d={d} fill="none" stroke="#1f2a1f" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      </svg>
      {Array.from({ length: count }, (_, i) => {
        const x = (i + 0.5) / count;
        return (
          <div key={i} className="absolute -translate-x-1/2" style={{ left: `${x * 100}%`, top: sag(x) }}>
            {children(i, sag(x))}
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================== */
/*  Christmas                                                         */
/* ================================================================== */

const BULB_COLORS = ["#ef4444", "#22c55e", "#facc15", "#3b82f6", "#ec4899"];

function Bulb({ color, delay }: { color: string; delay: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="block h-1.5 w-1.5 rounded-sm bg-gradient-to-b from-zinc-300 to-zinc-600" />
      <span
        className="festive-chase -mt-px block h-4 w-2.5 rounded-[45%_45%_50%_50%/35%_35%_65%_65%]"
        style={{
          background: `radial-gradient(circle at 35% 30%, #fff 0 12%, ${color} 45%, color-mix(in srgb, ${color} 60%, #000) 100%)`,
          boxShadow: `0 0 12px 3px ${color}`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

function Christmas() {
  return (
    <>
      {/* Frosted corners */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_0%_100%,rgba(224,242,254,0.18),transparent_35%),radial-gradient(ellipse_at_100%_100%,rgba(224,242,254,0.18),transparent_35%)]" />

      {/* Pine garland with glass bulbs */}
      <Swag count={40}>
        {(i) =>
          i % 2 ? (
            <Bulb color={BULB_COLORS[i % BULB_COLORS.length]} delay={(i % 10) * 0.18} />
          ) : (
            <span className="festive-sway-sm block text-[13px] leading-none" style={{ animationDelay: `${i * 0.1}s` }}>
              <PineSprig />
            </span>
          )
        }
      </Swag>

      {/* Snow drift */}
      <svg className="absolute inset-x-0 bottom-0 h-14 w-full" viewBox="0 0 100 14" preserveAspectRatio="none">
        <defs>
          <linearGradient id="drift" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#dbeafe" />
          </linearGradient>
        </defs>
        <path d="M0 14 L0 8 Q6 3 13 7 T27 6 T41 8 T55 5 T70 8 T84 5 T100 7 L100 14 Z" fill="url(#drift)" opacity="0.92" />
      </svg>

      {/* Tree in the right margin */}
      <div className="absolute bottom-4 right-8 hidden xl:block">
        <ChristmasTree />
      </div>

      {/* Presents in the left margin */}
      <div className="absolute bottom-6 left-20 hidden items-end gap-1 xl:flex">
        <Present color="#dc2626" ribbon="#facc15" size={34} />
        <Present color="#16a34a" ribbon="#fef2f2" size={26} />
        <Present color="#2563eb" ribbon="#f472b6" size={30} />
      </div>
    </>
  );
}

function PineSprig() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12">
      {[-1, 1].map((s) =>
        [0, 1, 2, 3].map((k) => (
          <line key={`${s}${k}`} x1={11} y1={2 + k * 2} x2={11 + s * (9 - k * 1.5)} y2={5 + k * 2} stroke="#166534" strokeWidth="1.6" strokeLinecap="round" />
        ))
      )}
      <line x1="11" y1="1" x2="11" y2="10" stroke="#14532d" strokeWidth="1.4" />
    </svg>
  );
}

function ChristmasTree() {
  const tiers = [
    { y: 30, w: 34 },
    { y: 62, w: 52 },
    { y: 96, w: 70 },
    { y: 132, w: 88 },
  ];
  const ornaments = [
    [70, 52, "#ef4444"], [92, 50, "#facc15"], [58, 84, "#3b82f6"], [100, 88, "#ef4444"], [80, 76, "#ec4899"],
    [48, 120, "#facc15"], [76, 116, "#22d3ee"], [108, 122, "#ef4444"], [40, 156, "#3b82f6"], [64, 150, "#facc15"],
    [94, 154, "#ec4899"], [120, 158, "#22d3ee"],
  ] as const;

  return (
    <svg width="160" height="200" viewBox="0 0 160 200" className="drop-shadow-[0_0_24px_rgba(250,204,21,0.25)]">
      <defs>
        <linearGradient id="pine" x1="0" x2="1">
          <stop offset="0" stopColor="#14532d" />
          <stop offset="0.55" stopColor="#15803d" />
          <stop offset="1" stopColor="#14532d" />
        </linearGradient>
        <radialGradient id="star">
          <stop offset="0" stopColor="#fff7c2" />
          <stop offset="1" stopColor="#facc15" />
        </radialGradient>
      </defs>
      <rect x="72" y="166" width="16" height="22" rx="2" fill="#78350f" />
      {tiers.map((t, i) => (
        <path key={i} d={`M80 ${t.y - 30} L${80 + t.w} ${t.y + 32} Q80 ${t.y + 40} ${80 - t.w} ${t.y + 32} Z`} fill="url(#pine)" />
      ))}
      {/* Tinsel */}
      <path d="M52 70 Q80 82 112 66 M40 104 Q82 120 124 100 M30 142 Q80 160 132 138" stroke="#fde68a" strokeWidth="1.4" fill="none" strokeDasharray="1 3" strokeLinecap="round" />
      {ornaments.map(([x, y, c], i) => (
        <circle key={i} cx={x} cy={y} r="4.2" fill={c} className="festive-chase" style={{ animationDelay: `${i * 0.2}s`, filter: `drop-shadow(0 0 4px ${c})` }} />
      ))}
      <g className="festive-star" style={{ transformOrigin: "80px 0px" }}>
        <path d="M80 -14 L84.5 -2 L97 -2 L87 6 L91 18 L80 11 L69 18 L73 6 L63 -2 L75.5 -2 Z" transform="translate(0 6)" fill="url(#star)" style={{ filter: "drop-shadow(0 0 10px #facc15)" }} />
      </g>
    </svg>
  );
}

function Present({ color, ribbon, size }: { color: string; ribbon: string; size: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 30 34">
      <rect x="2" y="10" width="26" height="22" rx="2" fill={color} />
      <rect x="0" y="6" width="30" height="7" rx="1.5" fill={color} style={{ filter: "brightness(1.15)" }} />
      <rect x="13" y="6" width="4" height="26" fill={ribbon} />
      <path d="M15 6 C9 -1 4 3 9 6 Z M15 6 C21 -1 26 3 21 6 Z" fill={ribbon} />
    </svg>
  );
}

/* ================================================================== */
/*  Diwali                                                            */
/* ================================================================== */

function Diwali() {
  return (
    <>
      {/* Warm glow from below */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-amber-500/15 to-transparent" />

      {/* Marigold toran with mango leaves and bells */}
      <Swag count={38}>
        {(i) =>
          i % 6 === 5 ? (
            <Bell delay={i * 0.2} />
          ) : i % 3 === 2 ? (
            <span className="block h-5 w-2.5 rounded-[50%_50%_50%_50%/70%_70%_30%_30%] bg-gradient-to-b from-lime-600 to-green-800" />
          ) : (
            <span className="flex flex-col items-center">
              {[0, 1, 2, 3].map((k) => (
                <Marigold key={k} color={(i + k) % 2 ? "#f59e0b" : "#ea580c"} />
              ))}
            </span>
          )
        }
      </Swag>

      {/* Sky lanterns in the margins */}
      <div className="absolute left-[6%] top-28 hidden xl:block">
        <Lantern hue="#f97316" delay={0} />
      </div>
      <div className="absolute right-[7%] top-24 hidden xl:block">
        <Lantern hue="#ec4899" delay={0.8} />
      </div>
      <div className="absolute right-[15%] top-40 hidden 2xl:block">
        <Lantern hue="#eab308" delay={1.6} small />
      </div>

      {/* Rangoli */}
      <div className="absolute bottom-24 left-10 hidden opacity-90 xl:block">
        <Rangoli />
      </div>

      {/* Row of diyas */}
      <div className="absolute bottom-3 right-6 hidden items-end gap-5 xl:flex">
        {[0, 1, 2, 3].map((i) => (
          <Diya key={i} delay={i * 0.35} scale={i === 1 || i === 2 ? 1.15 : 0.95} />
        ))}
      </div>
    </>
  );
}

function Marigold({ color }: { color: string }) {
  return (
    <span
      className="-mt-1 block size-3 rounded-full"
      style={{
        background: `radial-gradient(circle at 40% 35%, #fde68a 0 15%, ${color} 50%, color-mix(in srgb, ${color} 70%, #7c2d12) 100%)`,
        boxShadow: "inset -1px -1px 2px rgba(0,0,0,0.3)",
      }}
    />
  );
}

function Bell({ delay }: { delay: number }) {
  return (
    <svg width="14" height="22" viewBox="0 0 14 22" className="festive-swing" style={{ animationDelay: `${delay}s`, transformOrigin: "7px 0" }}>
      <line x1="7" y1="0" x2="7" y2="6" stroke="#b45309" />
      <path d="M2 18 Q2 7 7 6 Q12 7 12 18 Z" fill="#facc15" stroke="#b45309" strokeWidth=".6" />
      <circle cx="7" cy="19.5" r="1.8" fill="#b45309" />
    </svg>
  );
}

function Lantern({ hue, delay, small }: { hue: string; delay: number; small?: boolean }) {
  const s = small ? 0.75 : 1;
  const id = `lan-${hue.slice(1)}`;
  return (
    <div className="festive-swing flex flex-col items-center" style={{ animationDelay: `${delay}s`, transform: `scale(${s})`, transformOrigin: "top center" }}>
      <span className="block h-24 w-px bg-amber-200/40" />
      <svg width="70" height="96" viewBox="0 0 70 96" style={{ filter: `drop-shadow(0 0 22px ${hue})` }}>
        <defs>
          <radialGradient id={id}>
            <stop offset="0" stopColor="#fff7d6" />
            <stop offset="0.5" stopColor={hue} />
            <stop offset="1" stopColor="color-mix(in srgb, #000 30%, transparent)" />
          </radialGradient>
        </defs>
        <path d="M35 4 L46 22 L66 26 L52 42 L56 62 L35 54 L14 62 L18 42 L4 26 L24 22 Z" fill={`url(#${id})`} stroke="#fde68a" strokeWidth="1.2" />
        <path d="M35 4 L35 54 M4 26 L52 42 M66 26 L18 42" stroke="#fde68a" strokeWidth=".6" opacity=".6" />
        {[0, 1, 2, 3, 4].map((k) => (
          <line key={k} x1={24 + k * 5.5} y1="58" x2={24 + k * 5.5} y2={80 + (k % 2) * 8} stroke={hue} strokeWidth="1.5" />
        ))}
      </svg>
    </div>
  );
}

function Rangoli() {
  const petals = (n: number, r: number, len: number, color: string) =>
    Array.from({ length: n }, (_, i) => (
      <ellipse key={i} cx="0" cy={-r} rx={len * 0.35} ry={len} fill={color} transform={`rotate(${(360 / n) * i})`} />
    ));

  return (
    <svg width="150" height="150" viewBox="-75 -75 150 150" className="festive-spin">
      {petals(16, 52, 14, "#db2777")}
      {petals(16, 52, 8, "#f9a8d4")}
      {petals(12, 36, 12, "#f97316")}
      {petals(12, 36, 6, "#fde68a")}
      {petals(8, 20, 10, "#7c3aed")}
      <circle r="12" fill="#facc15" />
      <circle r="6" fill="#dc2626" />
      {Array.from({ length: 24 }, (_, i) => (
        <circle key={i} r="2" cx={Math.cos((i / 24) * Math.PI * 2) * 68} cy={Math.sin((i / 24) * Math.PI * 2) * 68} fill="#fde68a" />
      ))}
    </svg>
  );
}

function Diya({ delay, scale }: { delay: number; scale: number }) {
  return (
    <div className="relative" style={{ transform: `scale(${scale})`, transformOrigin: "bottom center" }}>
      <span
        className="festive-flame absolute -top-7 left-1/2 block h-8 w-4 -translate-x-1/2 rounded-[50%_50%_50%_50%/65%_65%_35%_35%]"
        style={{
          background: "radial-gradient(circle at 50% 75%, #ffffff 0 12%, #fff3a3 25%, #fbbf24 50%, #f97316 80%, transparent 100%)",
          boxShadow: "0 0 24px 10px rgba(251,191,36,0.45), 0 0 60px 20px rgba(249,115,22,0.25)",
          animationDelay: `${delay}s`,
        }}
      />
      <svg width="56" height="26" viewBox="0 0 56 26">
        <defs>
          <linearGradient id="clay" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ea580c" />
            <stop offset="1" stopColor="#7c2d12" />
          </linearGradient>
        </defs>
        <path d="M2 4 Q28 30 54 4 Q48 2 44 4 L28 0 L12 4 Q6 2 2 4 Z" fill="url(#clay)" />
        <path d="M6 6 Q28 24 50 6" fill="none" stroke="#fde68a" strokeWidth="1.2" strokeDasharray="2 2.5" />
        {[14, 22, 28, 34, 42].map((x) => (
          <circle key={x} cx={x} cy={x === 28 ? 15 : 12} r="1.4" fill="#fde68a" />
        ))}
      </svg>
    </div>
  );
}

/* ================================================================== */
/*  Halloween                                                         */
/* ================================================================== */

function Halloween() {
  return (
    <>
      {/* Vignette */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_55%,rgba(10,4,20,0.55))]" />

      {/* Moon with drifting clouds */}
      <div className="absolute right-[6%] top-24 hidden xl:block">
        <Moon />
      </div>

      {/* Cobweb */}
      <Cobweb />

      {/* Spider */}
      <div className="festive-dangle absolute left-[14%] top-[56px] hidden origin-top flex-col items-center xl:flex">
        <span className="block h-44 w-px bg-zinc-300/50" />
        <Spider />
      </div>

      {/* Graveyard silhouette */}
      <svg className="absolute inset-x-0 bottom-0 h-28 w-full" viewBox="0 0 400 60" preserveAspectRatio="xMidYMax slice">
        <path d="M0 60 L0 48 Q50 40 100 47 T200 45 T300 48 T400 44 L400 60 Z" fill="#05030a" />
        {[
          [24, 36], [60, 40], [330, 34], [362, 40],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} 52 L${x} ${y + 6} Q${x} ${y} ${x + 6} ${y} Q${x + 12} ${y} ${x + 12} ${y + 6} L${x + 12} 52 Z`} fill="#0b0712" stroke="#2e1f45" strokeWidth=".4" />
        ))}
        <path d="M300 50 L301 30 L296 24 M301 30 L306 22 M301 36 L292 31" stroke="#05030a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M92 52 L92 40 M88 44 L96 44" stroke="#0b0712" strokeWidth="2" />
      </svg>

      {/* Jack-o'-lanterns */}
      <div className="absolute bottom-3 right-6 hidden items-end gap-2 xl:flex">
        <Pumpkin size={58} delay={0.4} />
        <Pumpkin size={84} delay={0} />
      </div>
    </>
  );
}

function Moon() {
  return (
    <div className="relative">
      <svg width="130" height="130" viewBox="0 0 130 130" style={{ filter: "drop-shadow(0 0 40px rgba(253,230,138,0.45))" }}>
        <defs>
          <radialGradient id="moon" cx="40%" cy="35%">
            <stop offset="0" stopColor="#fffbeb" />
            <stop offset="0.7" stopColor="#fde68a" />
            <stop offset="1" stopColor="#d6b45a" />
          </radialGradient>
        </defs>
        <circle cx="65" cy="65" r="55" fill="url(#moon)" />
        {[
          [45, 50, 9], [80, 40, 6], [72, 80, 11], [42, 86, 5], [95, 70, 5],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#c9a24b" opacity=".35" />
        ))}
      </svg>
      <span className="festive-cloud absolute left-[-30px] top-[70px] block h-6 w-36 rounded-full bg-[#1a1226]/90 blur-[2px]" />
      <span className="festive-cloud absolute left-[30px] top-[30px] block h-4 w-24 rounded-full bg-[#1a1226]/80 blur-[2px]" style={{ animationDelay: "-6s" }} />
    </div>
  );
}

function Cobweb() {
  const spokes = [0, 15, 30, 45, 60, 75, 90];
  const rings = [18, 34, 52, 72, 94, 118];
  const pt = (r: number, a: number) => [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)];

  return (
    <svg className="absolute right-0 top-[56px] size-56 -scale-x-100 opacity-80" viewBox="0 0 125 125" fill="none" stroke="#e4e4e7" strokeWidth=".5">
      {spokes.map((a) => {
        const [x, y] = pt(125, a);
        return <line key={a} x1="0" y1="0" x2={x} y2={y} />;
      })}
      {rings.map((r) => (
        <path
          key={r}
          d={spokes
            .map((a, i) => {
              const [x, y] = pt(r, a);
              if (!i) return `M${x} ${y}`;
              const [cx, cy] = pt(r * 0.86, a - 7.5);
              return `Q${cx} ${cy} ${x} ${y}`;
            })
            .join(" ")}
        />
      ))}
    </svg>
  );
}

function Spider() {
  return (
    <svg width="34" height="30" viewBox="0 0 34 30" className="-mt-1">
      {[-1, 1].map((s) =>
        [0, 1, 2, 3].map((k) => (
          <path key={`${s}${k}`} d={`M17 ${12 + k * 2} Q${17 + s * 10} ${4 + k * 4} ${17 + s * 16} ${10 + k * 5}`} stroke="#0a0a0a" strokeWidth="1.6" fill="none" className="festive-legs" style={{ animationDelay: `${k * 0.1}s` }} />
        ))
      )}
      <ellipse cx="17" cy="18" rx="7" ry="8" fill="#0a0a0a" />
      <circle cx="17" cy="9" r="4.5" fill="#0a0a0a" />
      <circle cx="15.3" cy="8.4" r="1.1" fill="#ef4444" />
      <circle cx="18.7" cy="8.4" r="1.1" fill="#ef4444" />
    </svg>
  );
}

function Pumpkin({ size, delay }: { size: number; delay: number }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 100 90" className="festive-pumpkin" style={{ animationDelay: `${delay}s` }}>
      <defs>
        <radialGradient id="pk" cx="45%" cy="40%">
          <stop offset="0" stopColor="#fdba74" />
          <stop offset="0.6" stopColor="#ea580c" />
          <stop offset="1" stopColor="#7c2d12" />
        </radialGradient>
        <radialGradient id="fire">
          <stop offset="0" stopColor="#fff7c2" />
          <stop offset="0.6" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f97316" />
        </radialGradient>
      </defs>
      <path d="M48 14 Q46 4 54 0 Q52 8 54 14 Z" fill="#3f6212" />
      <ellipse cx="30" cy="52" rx="26" ry="34" fill="url(#pk)" />
      <ellipse cx="70" cy="52" rx="26" ry="34" fill="url(#pk)" />
      <ellipse cx="50" cy="52" rx="24" ry="37" fill="url(#pk)" />
      <g fill="url(#fire)" className="festive-flicker">
        <path d="M28 42 L40 42 L34 30 Z" />
        <path d="M60 42 L72 42 L66 30 Z" />
        <path d="M46 54 L54 54 L50 46 Z" />
        <path d="M24 62 Q50 82 76 62 L70 64 L66 70 L60 65 L54 72 L48 66 L42 72 L36 65 L32 70 L28 64 Z" />
      </g>
    </svg>
  );
}
