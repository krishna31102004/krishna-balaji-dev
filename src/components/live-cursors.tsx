import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Users, X, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Realtime presence (Supabase broadcast + presence):
 * - live cursors with name, flag and a floating chat bubble
 * - press "/" for cursor chat, Esc to cancel
 * - click ripples
 * - "N here now" panel listing visitors; click one to follow their cursor
 * Cursor x is sent relative to the page centre (the content column is
 * centred), y relative to the document, so positions line up across sizes.
 */

type Profile = { id: string; name: string; color: string; country: string | null; mobile: boolean };
type Cursor = Profile & { x: number; y: number; at: number; chat?: string };
type Ripple = { key: number; x: number; y: number; color: string };

const NAMES = ["Otter", "Falcon", "Panda", "Lynx", "Koala", "Orca", "Fox", "Gecko", "Moose", "Heron", "Yak", "Quokka", "Raven", "Tapir"];
const COLORS = ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#ec4899", "#14b8a6", "#f97316"];
const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

const flag = (cc: string | null) =>
  cc && cc.length === 2 ? String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0))) : "";

const me: Profile = {
  id: Math.random().toString(36).slice(2, 10),
  name: `Anonymous ${pick(NAMES)}`,
  color: pick(COLORS),
  country: null,
  mobile: typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
};

export function LiveCursors() {
  const [cursors, setCursors] = useState<Record<string, Cursor>>({});
  const [people, setPeople] = useState<Profile[]>([me]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [panel, setPanel] = useState(false);
  const [following, setFollowing] = useState<string | null>(null);
  const [chat, setChat] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const channelRef = useRef<ReturnType<NonNullable<typeof supabase>["channel"]> | null>(null);
  const lastSent = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const send = (event: string, payload: object) =>
    channelRef.current?.send({ type: "broadcast", event, payload: { ...me, ...payload } });

  useEffect(() => {
    if (!supabase) return;
    const db = supabase;

    const channel = db.channel("live-room", {
      config: { presence: { key: me.id }, broadcast: { self: false } },
    });
    channelRef.current = channel;

    channel
      .on("broadcast", { event: "move" }, ({ payload }) =>
        setCursors((c) => ({ ...c, [payload.id]: { ...c[payload.id], ...payload, at: Date.now() } }))
      )
      .on("broadcast", { event: "chat" }, ({ payload }) =>
        setCursors((c) => (c[payload.id] ? { ...c, [payload.id]: { ...c[payload.id], chat: payload.text, at: Date.now() } } : c))
      )
      .on("broadcast", { event: "click" }, ({ payload }) => addRipple(payload.x, payload.y, payload.color))
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<Profile>();
        const list = Object.values(state).map((v) => v[0]).filter(Boolean);
        setPeople(list.length ? list : [me]);
        setCursors((c) => Object.fromEntries(Object.entries(c).filter(([id]) => id in state)));
      })
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") return;
        try {
          const geo = await fetch("/api/geo").then((r) => (r.ok ? r.json() : null));
          me.country = geo?.country ?? null;
        } catch {
          /* no geo locally */
        }
        channel.track(me);
      });

    const onMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX - window.innerWidth / 2, y: e.clientY + window.scrollY };
      setPos({ x: e.clientX, y: e.clientY });
      const now = performance.now();
      if (me.mobile || now - lastSent.current < 45) return;
      lastSent.current = now;
      send("move", mouse.current);
    };
    const onDown = (e: PointerEvent) => {
      if (me.mobile) return;
      const p = { x: e.clientX - window.innerWidth / 2, y: e.clientY + window.scrollY };
      send("click", { ...p, color: me.color });
    };

    const sweep = setInterval(() => {
      setCursors((c) => Object.fromEntries(Object.entries(c).filter(([, v]) => Date.now() - v.at < 20000)));
    }, 4000);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      clearInterval(sweep);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      db.removeChannel(channel);
    };
  }, []);

  // "/" opens cursor chat (when not typing somewhere else).
  useEffect(() => {
    if (!supabase || me.mobile) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = /INPUT|TEXTAREA|SELECT/.test(t?.tagName) || t?.isContentEditable;
      if (e.key === "/" && !typing && chat === null) {
        e.preventDefault();
        setChat("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chat]);

  // Follow mode: keep the followed cursor in view; any manual scroll exits.
  useEffect(() => {
    if (!following) return;
    const target = cursors[following];
    if (!target) {
      setFollowing(null);
      return;
    }
    window.scrollTo({ top: Math.max(0, target.y - window.innerHeight / 2), behavior: "smooth" });
  }, [following, cursors]);

  useEffect(() => {
    if (!following) return;
    const stop = () => setFollowing(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && stop();
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchmove", stop, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("keydown", onKey);
    };
  }, [following]);

  const addRipple = (x: number, y: number, color: string) => {
    const key = Math.random();
    setRipples((r) => [...r, { key, x, y, color }]);
    setTimeout(() => setRipples((r) => r.filter((v) => v.key !== key)), 900);
  };

  if (!supabase) return null;

  const others = people.filter((p) => p.id !== me.id);
  const followed = following ? cursors[following] : null;

  return (
    <>
      {/* Remote cursors + ripples, in document space */}
      <div className="pointer-events-none absolute left-0 top-0 z-[9996] w-full overflow-x-clip" style={{ minHeight: "100%" }} aria-hidden="true">
        {ripples.map((r) => (
          <span
            key={r.key}
            className="live-ripple absolute size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{ left: `calc(50% + ${r.x}px)`, top: r.y, borderColor: r.color }}
          />
        ))}

        <AnimatePresence>
          {Object.values(cursors).map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, left: `calc(50% + ${c.x}px)`, top: c.y }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 520, damping: 42, mass: 0.45 }}
              className="absolute"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,.45))" }}>
                <path d="M2 1 L16 8 L9 9.5 L6 16 Z" fill={c.color} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <motion.div
                layout
                className="ml-3 -mt-1 max-w-[220px] rounded-2xl rounded-tl-sm px-2.5 py-1 text-[11px] font-medium text-white shadow-lg"
                style={{ background: c.color }}
              >
                <span className="whitespace-nowrap">
                  {flag(c.country)} {c.name}
                </span>
                {c.chat && <p className="mt-0.5 break-words text-[12px] font-normal leading-snug">{c.chat}</p>}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* My own cursor-chat bubble, following the pointer */}
      <AnimatePresence>
        {chat !== null && (
          <motion.form
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onSubmit={(e) => {
              e.preventDefault();
              send("chat", { text: chat.trim() });
              setTimeout(() => send("chat", { text: "" }), 5000);
              setChat(null);
            }}
            className="fixed z-[10001] rounded-2xl rounded-tl-sm px-3 py-1.5 shadow-xl"
            style={{ left: pos.x + 16, top: pos.y + 14, background: me.color }}
          >
            <input
              autoFocus
              value={chat}
              maxLength={80}
              onChange={(e) => {
                setChat(e.target.value);
                send("chat", { text: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setChat(null);
                  send("chat", { text: "" });
                }
              }}
              onBlur={() => setChat(null)}
              placeholder="Say something…"
              className="w-44 bg-transparent text-[12px] text-white placeholder:text-white/70 outline-none"
            />
          </motion.form>
        )}
      </AnimatePresence>

      {/* Following banner */}
      <AnimatePresence>
        {followed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-0 z-[10000] h-1"
            style={{ background: followed.color, boxShadow: `0 0 24px ${followed.color}` }}
          >
            <span
              className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-medium text-white shadow-lg"
              style={{ background: followed.color }}
            >
              Following {followed.name} · scroll or Esc to stop
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Presence chip + panel */}
      <div className="fixed bottom-5 right-5 z-[9995] hidden flex-col items-end gap-2 md:flex">
        <AnimatePresence>
          {panel && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              className="w-64 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)]/95 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-[var(--line)] px-3 py-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--soft)]">Online now</span>
                <button onClick={() => setPanel(false)} aria-label="Close" className="text-[var(--soft)] hover:text-[var(--fg)]">
                  <X className="size-3.5" />
                </button>
              </div>
              <ul className="max-h-64 overflow-y-auto py-1" data-lenis-prevent>
                {[me, ...others].map((p) => {
                  const canFollow = p.id !== me.id && !!cursors[p.id];
                  return (
                    <li key={p.id}>
                      <button
                        disabled={!canFollow}
                        onClick={() => {
                          setFollowing(p.id);
                          setPanel(false);
                        }}
                        className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[12px] text-[var(--fg)] enabled:hover:bg-[var(--hover)] disabled:cursor-default"
                      >
                        <span className="grid size-6 place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: p.color }}>
                          {p.name.split(" ").pop()?.[0]}
                        </span>
                        <span className="flex-1 truncate">
                          {p.name}
                          {p.id === me.id && <span className="text-[var(--soft)]"> (you)</span>}
                        </span>
                        <span className="text-[12px]">{flag(p.country)}</span>
                        {p.mobile ? <Smartphone className="size-3.5 text-[var(--soft)]" /> : <Monitor className="size-3.5 text-[var(--soft)]" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className="flex items-center gap-1.5 border-t border-[var(--line)] px-3 py-2 text-[10.5px] text-[var(--soft)]">
                <MessageCircle className="size-3" /> Press <kbd className="rounded border border-[var(--line)] px-1 font-mono">/</kbd> to chat on your cursor
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setPanel((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)]/90 px-3 py-1.5 font-mono text-[11px] text-[var(--muted)] shadow-lg backdrop-blur-md transition-colors hover:text-[var(--fg)]"
        >
          <span className="flex -space-x-1">
            {[me, ...others].slice(0, 4).map((p) => (
              <span key={p.id} className="size-2.5 rounded-full ring-2 ring-[var(--card)]" style={{ background: p.color }} />
            ))}
          </span>
          <Users className="size-3" />
          {people.length} here now
        </button>
      </div>
    </>
  );
}
