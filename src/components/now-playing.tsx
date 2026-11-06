import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, SkipForward, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";

const HIDDEN_KEY = "now-playing-hidden";

/**
 * Small floating player. Starts paused (browsers block autoplay anyway),
 * plays the playlist in order and loops. The X switches it off for good
 * on this device; the music note brings it back.
 */
export function NowPlaying() {
  const tracks = site.playlist;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem(HIDDEN_KEY) === "1";
    } catch {
      return false;
    }
  });

  const track = tracks[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    if (playing) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [playing, index]);

  const next = () => setIndex((i) => (i + 1) % tracks.length);

  const setHiddenPersist = (value: boolean) => {
    setHidden(value);
    if (value) setPlaying(false);
    try {
      localStorage.setItem(HIDDEN_KEY, value ? "1" : "0");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        preload="none"
        onEnded={next}
      />

      <AnimatePresence mode="wait">
        {hidden ? (
          <motion.button
            key="note"
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setHiddenPersist(false)}
            aria-label="Show music player"
            className="fixed bottom-5 left-5 z-[9995] grid size-9 place-items-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] shadow-lg transition-colors hover:text-[var(--fg)] cursor-pointer"
          >
            <Music2 className="size-4" />
          </motion.button>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-5 left-5 z-[9995] flex max-w-[calc(100vw-40px)] items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--card)]/90 py-1.5 pl-1.5 pr-3 shadow-lg backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause music" : "Play music"}
              className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--fg)] text-[var(--bg)] transition-transform hover:scale-105 cursor-pointer"
            >
              {playing ? (
                <Pause className="size-3.5" fill="currentColor" />
              ) : (
                <Play className="size-3.5 translate-x-px" fill="currentColor" />
              )}
            </button>

            <div className="min-w-0 leading-tight">
              <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[var(--soft)]">
                <Equalizer active={playing} />
                {playing ? "Now playing" : "Paused"}
              </p>
              <p className="truncate text-[12px] text-[var(--fg)] w-[130px]">
                {track.title}
                {track.artist && (
                  <span className="text-[var(--muted)]"> · {track.artist}</span>
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next song"
              className="text-[var(--muted)] transition-colors hover:text-[var(--fg)] cursor-pointer"
            >
              <SkipForward className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setHiddenPersist(true)}
              aria-label="Turn off music player"
              className="text-[var(--soft)] transition-colors hover:text-[var(--fg)] cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Equalizer({ active }: { active: boolean }) {
  return (
    <span className="flex h-2.5 items-end gap-[2px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-[var(--neon-color)]"
          animate={
            active
              ? { height: ["30%", "100%", "50%", "80%", "30%"] }
              : { height: "30%" }
          }
          transition={
            active
              ? { duration: 0.9, repeat: Infinity, delay: i * 0.15 }
              : { duration: 0.2 }
          }
        />
      ))}
    </span>
  );
}
