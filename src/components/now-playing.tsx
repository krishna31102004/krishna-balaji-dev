import { useEffect, useRef, useState } from "react";
import { ListMusic, Music2, Pause, Play, SkipForward, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { site, SPOTIFY_PLAYLIST_ID, SPOTIFY_PLAYLIST_NAME, SPOTIFY_TRACKS } from "@/config/site";

const toMs = (len: string) => {
  const [m, s] = len.split(":").map(Number);
  return (m * 60 + s) * 1000;
};

/** Find the playlist song with this length; null if none or ambiguous. */
function matchByLength(durationMs: number) {
  const hits = SPOTIFY_TRACKS.filter((t) => Math.abs(toMs(t.length) - durationMs) <= 1500);
  return hits.length === 1 ? hits[0] : null;
}

const HIDDEN_KEY = "now-playing-hidden";
const SPOTIFY_API_SRC = "https://open.spotify.com/embed/iframe-api/v1";
const SPOTIFY_URI = `spotify:playlist:${SPOTIFY_PLAYLIST_ID}`;

type SpotifyPlaybackState = {
  playingURI?: string;
  isPaused: boolean;
  isBuffering?: boolean;
  duration?: number;
  position?: number;
};
type SpotifyController = {
  togglePlay: () => void;
  pause: () => void;
  destroy: () => void;
  addListener: (name: string, cb: (e: { data: SpotifyPlaybackState }) => void) => void;
  removeListener: (name: string, cb: (e: { data: SpotifyPlaybackState }) => void) => void;
};
type SpotifyIFrameAPI = {
  createController: (
    el: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    cb: (controller: SpotifyController) => void,
  ) => void;
};
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}

let spotifyApiPromise: Promise<SpotifyIFrameAPI> | null = null;
/** Loads Spotify's iFrame API once, and only when first asked for. */
function loadSpotifyApi(): Promise<SpotifyIFrameAPI> {
  if (spotifyApiPromise) return spotifyApiPromise;
  spotifyApiPromise = new Promise<SpotifyIFrameAPI>((resolve, reject) => {
    // The callback must exist before the script runs.
    window.onSpotifyIframeApiReady = (api) => resolve(api);
    if (document.querySelector(`script[src="${SPOTIFY_API_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SPOTIFY_API_SRC;
    script.async = true;
    script.onerror = () => {
      spotifyApiPromise = null; // allow a retry on next open
      script.remove();
      reject(new Error("Spotify iFrame API failed to load"));
    };
    document.body.appendChild(script);
  });
  return spotifyApiPromise;
}

/** Hosts the Spotify controller. Mounts only when the popup is open. */
function SpotifyEmbed({
  onController,
  onUpdate,
}: {
  onController: (c: SpotifyController | null) => void;
  onUpdate: (state: SpotifyPlaybackState) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const cbRef = useRef({ onController, onUpdate });
  cbRef.current = { onController, onUpdate };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let controller: SpotifyController | null = null;
    const listener = (e: { data: SpotifyPlaybackState }) => cbRef.current.onUpdate(e.data);
    // createController replaces its target element, so give it a throwaway
    // child and keep React's own node untouched.
    const target = document.createElement("div");
    host.appendChild(target);

    loadSpotifyApi()
      .then((api) => {
        if (cancelled) return;
        api.createController(target, { uri: SPOTIFY_URI, width: "100%", height: 352 }, (c) => {
          if (cancelled) {
            c.destroy();
            return;
          }
          controller = c;
          c.addListener("playback_update", listener);
          cbRef.current.onController(c);
        });
      })
      .catch(() => {
        /* embed unavailable; pill keeps working with local audio */
      });

    return () => {
      cancelled = true;
      if (controller) {
        controller.removeListener("playback_update", listener);
        try {
          controller.destroy();
        } catch {
          /* already gone */
        }
      }
      cbRef.current.onController(null);
      host.replaceChildren();
    };
  }, []);

  return <div ref={hostRef} className="block h-[352px] w-full overflow-hidden rounded-xl" />;
}

function spotifyOembedUrl(uri: string): string | null {
  const m = /^spotify:(track|episode):([A-Za-z0-9]+)$/.exec(uri);
  return m ? `https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/${m[1]}/${m[2]}`)}` : null;
}

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

  // Which player the pill reflects. Spotify's embed reports playback via the iFrame API.
  const [source, setSource] = useState<"local" | "spotify">("local");
  const [spotifyPlaying, setSpotifyPlaying] = useState(false);
  const [spotifyUri, setSpotifyUri] = useState<string | null>(null);
  const [spotifyDuration, setSpotifyDuration] = useState(0);
  const [spotifyMeta, setSpotifyMeta] = useState<{ uri: string; title: string | null } | null>(null);
  const spotifyRef = useRef<SpotifyController | null>(null);
  const metaCache = useRef(new Map<string, string | null>());

  const reduceMotion = useReducedMotion();
  const [popupOpen, setPopupOpen] = useState(false);
  // Mount the iframe only after the first open so it adds nothing to page load.
  const [popupMounted, setPopupMounted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSpotifyUpdate = (state: SpotifyPlaybackState) => {
    if (state.playingURI) setSpotifyUri(state.playingURI);
    if (state.duration) setSpotifyDuration(state.duration);
    if (!state.isPaused) {
      setSource("spotify");
      setPlaying(false); // pauses the local audio via the effect below
      setSpotifyPlaying(true);
    } else {
      setSpotifyPlaying(false);
    }
  };
  const handleSpotifyController = (c: SpotifyController | null) => {
    spotifyRef.current = c;
    if (!c) {
      // Embed torn down (popup closed): its audio stops with it.
      setSpotifyPlaying(false);
      setSource("local");
    }
  };
  const switchToLocal = () => {
    spotifyRef.current?.pause();
    setSpotifyPlaying(false);
    setSource("local");
  };

  // Resolve a title for the Spotify track via oEmbed (cached, stale requests aborted).
  useEffect(() => {
    if (!spotifyUri) return;
    const cache = metaCache.current;
    if (cache.has(spotifyUri)) {
      setSpotifyMeta({ uri: spotifyUri, title: cache.get(spotifyUri) ?? null });
      return;
    }
    const url = spotifyOembedUrl(spotifyUri);
    if (!url) {
      setSpotifyMeta({ uri: spotifyUri, title: null });
      return;
    }
    const ctrl = new AbortController();
    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { title?: string }) => {
        const title = typeof j.title === "string" && j.title.trim() ? j.title.trim() : null;
        cache.set(spotifyUri, title);
        setSpotifyMeta({ uri: spotifyUri, title });
      })
      .catch((err) => {
        if (ctrl.signal.aborted || err?.name === "AbortError") return;
        cache.set(spotifyUri, null);
        setSpotifyMeta({ uri: spotifyUri, title: null });
      });
    return () => ctrl.abort();
  }, [spotifyUri]);

  const fromSpotify = source === "spotify";
  const isPlaying = fromSpotify ? spotifyPlaying : playing;
  const spotifyTitle = spotifyMeta && spotifyMeta.uri === spotifyUri ? spotifyMeta.title : null;
  // Logged out: Spotify reports the track, so oEmbed gives the title and the
  // list gives the artist. Logged in: it reports only the playlist and the
  // song length, so match the length against the list.
  const byTitle = spotifyTitle
    ? SPOTIFY_TRACKS.find((t) => t.title.toLowerCase() === spotifyTitle.toLowerCase()) ?? null
    : null;
  const byLength = !spotifyTitle && spotifyDuration ? matchByLength(spotifyDuration) : null;
  const spotifyMatch = byTitle ?? byLength;
  const displayTitle = fromSpotify
    ? spotifyTitle ?? spotifyMatch?.title ?? SPOTIFY_PLAYLIST_NAME
    : track.title;
  const displayArtist = fromSpotify
    ? spotifyMatch?.artist ?? (spotifyTitle ? null : "Spotify")
    : track.artist;

  const togglePlay = () => {
    if (fromSpotify) {
      spotifyRef.current?.togglePlay();
      return;
    }
    spotifyRef.current?.pause();
    setPlaying((p) => !p);
  };
  const skip = () => {
    if (fromSpotify) switchToLocal();
    setIndex((i) => (i + 1) % tracks.length);
    if (fromSpotify) setPlaying(true);
  };

  const openPopup = () => {
    setPlaying(false); // pause the site's own audio
    setPopupMounted(true);
    setPopupOpen(true);
  };
  const closePopup = (restoreFocus = true) => {
    setPopupOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!popupOpen) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
        return;
      }
      if (e.key === "Tab" && popupRef.current) {
        const f = popupRef.current.querySelectorAll<HTMLElement>("button, iframe, [href], [tabindex]:not([tabindex='-1'])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) closePopup(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [popupOpen]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    if (playing) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [playing, index]);

  const next = () => setIndex((i) => (i + 1) % tracks.length); // local auto-advance

  const setHiddenPersist = (value: boolean) => {
    setHidden(value);
    if (value) {
      setPlaying(false);
      spotifyRef.current?.pause();
      setPopupOpen(false);
    }
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
            ref={wrapRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-5 left-5 z-[9995] max-w-[calc(100vw-40px)]"
          >
            {popupMounted && (
                <motion.div
                  ref={popupRef}
                  role="dialog"
                  aria-label="Spotify playlist"
                  aria-hidden={!popupOpen}
                  {...(popupOpen ? {} : ({ inert: "" } as object))}
                  initial={reduceMotion ? { opacity: 1, visibility: "visible" } : { opacity: 0, y: 12, scale: 0.98, visibility: "visible" }}
                  animate={
                    popupOpen
                      ? { opacity: 1, y: 0, scale: 1, visibility: "visible" }
                      : reduceMotion
                        ? { opacity: 0, transitionEnd: { visibility: "hidden" } }
                        : { opacity: 0, y: 12, scale: 0.98, transitionEnd: { visibility: "hidden" } }
                  }
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
                  className={`absolute bottom-full left-0 mb-3 w-[min(360px,calc(100vw-40px))] max-h-[calc(100dvh-96px)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-2 shadow-2xl backdrop-blur-md${popupOpen ? "" : " pointer-events-none"}`}
                >
                  <div className="flex items-center justify-between px-2 pb-2 pt-1">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--soft)]">Playlist</p>
                    <button
                      ref={closeBtnRef}
                      type="button"
                      onClick={() => closePopup()}
                      aria-label="Close playlist"
                      className="grid size-6 place-items-center rounded-full text-[var(--muted)] transition-colors hover:text-[var(--fg)] cursor-pointer"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                  <SpotifyEmbed onController={handleSpotifyController} onUpdate={handleSpotifyUpdate} />
                </motion.div>
            )}

            <div className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--card)]/90 py-1.5 pl-1.5 pr-3 shadow-lg backdrop-blur-md">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--fg)] text-[var(--bg)] transition-transform hover:scale-105 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="size-3.5" fill="currentColor" />
              ) : (
                <Play className="size-3.5 translate-x-px" fill="currentColor" />
              )}
            </button>

            <div
              className="min-w-0 cursor-pointer leading-tight"
              onClick={() => (popupOpen ? closePopup() : openPopup())}
            >
              <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[var(--soft)]">
                <Equalizer active={isPlaying} />
                {isPlaying ? "Now playing" : "Paused"}
              </p>
              <p className="truncate text-[12px] text-[var(--fg)] w-[130px]">
                {displayTitle}
                {displayArtist && (
                  <span className="text-[var(--muted)]"> · {displayArtist}</span>
                )}
              </p>
            </div>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => (popupOpen ? closePopup() : openPopup())}
              aria-label="Open Spotify playlist"
              aria-haspopup="dialog"
              aria-expanded={popupOpen}
              className="text-[var(--muted)] transition-colors hover:text-[var(--fg)] cursor-pointer"
            >
              <ListMusic className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={skip}
              aria-label={fromSpotify ? "Switch to site playlist" : "Next song"}
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
            </div>
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
