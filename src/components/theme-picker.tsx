import { useEffect, useRef, useState } from "react";
import { Palette as PaletteIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PALETTES, useTheme } from "./theme-provider";

export function ThemePicker({ size = "sm" }: { size?: "sm" | "md" }) {
  const { palette, setPalette } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const btn = size === "sm" ? "size-7" : "size-8";
  const icon = size === "sm" ? "size-3.5" : "size-4";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Choose color theme"
        aria-expanded={open}
        className={`grid ${btn} place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all duration-300 hover:text-[var(--fg)] cursor-pointer`}
      >
        <PaletteIcon className={icon} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-44 border border-[var(--line)] bg-[var(--card)] p-1.5 shadow-xl"
          >
            {[
              { title: "Colors", items: PALETTES.filter((p) => !p.festive) },
              { title: "Festive", items: PALETTES.filter((p) => p.festive) },
            ].map((group) => (
              <div key={group.title}>
                <p className="px-2 pb-1.5 pt-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--soft)]">
                  {group.title}
                </p>

                {group.items.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setPalette(p.id, {
                        x: rect.left + 12,
                        y: rect.top + rect.height / 2,
                      });
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 px-2 py-1.5 text-left text-[12px] transition-colors hover:bg-[var(--hover)] cursor-pointer ${
                      palette === p.id ? "text-[var(--fg)]" : "text-[var(--muted)]"
                    }`}
                  >
                    {p.festive ? (
                      <span className="grid size-3 place-items-center text-[11px] leading-none">
                        {p.swatch}
                      </span>
                    ) : (
                      <span
                        className="size-3 rounded-full ring-1 ring-[var(--line)]"
                        style={{ background: p.swatch }}
                      />
                    )}
                    {p.label}
                    {palette === p.id && (
                      <span className="ml-auto font-mono text-[10px] text-[var(--soft)]">
                        on
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
