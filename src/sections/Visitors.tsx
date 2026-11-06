import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { supabase } from "@/lib/supabase";
import { Shell, SectionHeader } from "@/components/Layout";

type Visit = { lat: number; lng: number; country: string | null };

const SESSION_KEY = "visit-logged";

/**
 * Spinning globe with a dot for every recent visitor. Location comes from
 * /api/geo (Vercel edge headers, rounded to ~10km), stored once per session.
 */
export function Visitors() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    if (!supabase) return;
    const db = supabase;

    (async () => {
      let logged = false;
      try {
        logged = sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        /* storage unavailable */
      }

      if (!logged) {
        try {
          const geo = await fetch("/api/geo").then((r) => (r.ok ? r.json() : null));
          if (geo?.lat != null && geo?.lng != null) {
            await db.from("visits").insert({ lat: geo.lat, lng: geo.lng, country: geo.country });
            sessionStorage.setItem(SESSION_KEY, "1");
          }
        } catch {
          /* no geo locally, that's fine */
        }
      }

      const { data } = await db
        .from("visits")
        .select("lat,lng,country")
        .order("created_at", { ascending: false })
        .limit(600);
      if (data) setVisits(data as Visit[]);
    })();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !supabase) return;

    const accent = getComputedStyle(document.documentElement).getPropertyValue("--neon-color").trim() || "#60a5fa";
    const hex = accent.startsWith("#") ? accent : "#60a5fa";
    const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
    const dark = !document.documentElement.classList.contains("light");

    let phi = 0;
    let width = canvas.offsetWidth;
    let dragging: number | null = null;
    let dragOffset = 0;
    const onResize = () => (width = canvas.offsetWidth);
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: dark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: dark ? 9 : 1.6,
      baseColor: dark ? [0.35, 0.35, 0.4] : [1, 1, 1],
      markerColor: rgb,
      glowColor: dark ? [0.12, 0.12, 0.16] : [0.9, 0.9, 0.95],
      markers: visits.map((v) => ({ location: [v.lat, v.lng], size: 0.06 })),
      onRender: (state) => {
        if (dragging === null) phi += 0.004;
        state.phi = phi + dragOffset;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    const down = (e: PointerEvent) => {
      dragging = e.clientX - dragOffset * 200;
      canvas.style.cursor = "grabbing";
    };
    const up = () => {
      dragging = null;
      canvas.style.cursor = "grab";
    };
    const move = (e: PointerEvent) => {
      if (dragging !== null) dragOffset = (e.clientX - dragging) / 200;
    };
    canvas.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointermove", move);

    requestAnimationFrame(() => (canvas.style.opacity = "1"));

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointermove", move);
    };
  }, [visits]);

  if (!supabase) return null;

  const countries = new Set(visits.map((v) => v.country).filter(Boolean)).size;

  return (
    <div id="visitors">
      <SectionHeader
        title="Visitors"
        aside={
          <span className="font-mono text-[10px] tracking-wider text-[var(--soft)]">
            {visits.length} recent · {countries} countries
          </span>
        }
      />
      <Shell className="px-6 py-6 sm:px-8">
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <canvas
            ref={canvasRef}
            className="h-full w-full cursor-grab opacity-0 transition-opacity duration-1000 [contain:layout_paint_size]"
          />
        </div>
        <p className="mt-2 text-center font-mono text-[11px] text-[var(--soft)]">
          Every dot is someone who stopped by. Drag to spin.
        </p>
      </Shell>
    </div>
  );
}
