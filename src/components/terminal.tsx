import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import { PALETTES, useTheme, type Palette } from "./theme-provider";

type Line = { kind: "in" | "out" | "err" | "ascii"; text: string };

const PROMPT = "guest@krishna:~$";

const SECTIONS: Record<string, string> = {
  about: "/#about",
  contact: "/contact",
  projects: "/projects",
  experience: "/experience",
  skills: "/#skills",
  github: "/#github",
  experiments: "/experiments",
  home: "/",
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const BANNER = String.raw`
 _  __     _     _
| |/ /_ __(_)___| |__  _ __   __ _
| ' /| '__| / __| '_ \| '_ \ / _' |
| . \| |  | \__ \ | | | | | | (_| |
|_|\_\_|  |_|___/_| |_|_| |_|\__,_|
`;

/**
 * A fake shell for browsing the portfolio. Open with the backtick key or
 * from the command palette (it listens for a "terminal:open" event).
 */
export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setPalette, toggleTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement)?.tagName) || (e.target as HTMLElement)?.isContentEditable;
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("terminal:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("terminal:open", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    if (lines.length === 0) {
      setLines([
        { kind: "ascii", text: BANNER },
        { kind: "out", text: `Welcome to ${site.name}'s portfolio shell.` },
        { kind: "out", text: "Type 'help' to see what you can do. Esc to close." },
      ]);
    }
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [open, lines.length]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string): Line[] => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ");
    const out = (...t: string[]): Line[] => t.map((text) => ({ kind: "out", text }));
    const err = (text: string): Line[] => [{ kind: "err", text }];

    switch (cmd?.toLowerCase()) {
      case "":
        return [];
      case "help":
        return out(
          "Navigation",
          "  ls                 list sections",
          "  cd <section>       go to a section (about, projects, contact...)",
          "  open <project>     open a project",
          "Info",
          "  whoami             who is Krishna",
          "  cat about          the long version",
          "  projects           list projects",
          "  experience         work history",
          "  skills             tech stack",
          "  socials            where to find him",
          "  resume             open the resume",
          "  email              copy his email",
          "Fun",
          "  neofetch           system info",
          "  theme <name>       switch theme (" + PALETTES.map((p) => p.id).join(", ") + ")",
          "  theme toggle       light / dark",
          "  sudo hire krishna  try it",
          "  clear, exit"
        );
      case "ls":
        return out(Object.keys(SECTIONS).join("   "));
      case "cd": {
        const target = SECTIONS[arg.toLowerCase().replace(/\/$/, "")];
        if (!arg || arg === "~") {
          navigate("/");
          return out("→ home");
        }
        if (!target) return err(`cd: no such section: ${arg}. Try 'ls'.`);
        navigate(target);
        return out(`→ ${arg}`);
      }
      case "whoami":
        return out(`${site.name} — ${site.role}, ${site.location}`, site.tagline);
      case "cat":
        if (arg === "about") return out(...site.about);
        if (arg === "resume") {
          window.open(site.socials.resume, "_blank");
          return out("Opening resume.pdf ...");
        }
        return err(`cat: ${arg || "?"}: No such file. Try 'cat about'.`);
      case "projects":
        return out(...site.projects.map((p) => `  ${slug(p.title).padEnd(26)} ${p.year}  ${p.stack.slice(0, 3).join(", ")}`), "", "Use 'open <name>' to view one.");
      case "open": {
        const q = slug(arg);
        const p = site.projects.find((x) => slug(x.title).includes(q) && q);
        if (!p) return err(`open: no project matching '${arg}'. Try 'projects'.`);
        navigate(`/projects?search=${encodeURIComponent(p.title)}`);
        return out(`→ ${p.title}`);
      }
      case "experience":
        return site.experience.flatMap((j) => out(`  ${j.role} @ ${j.company}`, `    ${j.period}`));
      case "skills":
        return out(site.skills.join(" · "));
      case "socials":
        return out(
          ...Object.entries(site.socials)
            .filter(([, v]) => v)
            .map(([k, v]) => `  ${k.padEnd(10)} ${v}`)
        );
      case "resume":
        window.open(site.socials.resume, "_blank");
        return out("Opening resume.pdf ...");
      case "email":
        navigator.clipboard?.writeText(site.email).catch(() => {});
        return out(`Copied ${site.email} to clipboard.`);
      case "theme": {
        if (arg === "toggle") {
          toggleTheme();
          return out("Toggled light / dark.");
        }
        const p = PALETTES.find((x) => x.id === arg.toLowerCase());
        if (!p) return err(`theme: unknown theme '${arg}'. Options: ${PALETTES.map((x) => x.id).join(", ")}`);
        setPalette(p.id as Palette);
        return out(`Theme set to ${p.label}.`);
      }
      case "neofetch":
        return [
          { kind: "ascii", text: BANNER },
          ...out(
            `  user      guest@krishna`,
            `  host      ${site.url.replace("https://", "")}`,
            `  role      ${site.role}`,
            `  location  ${site.location}`,
            `  edu       MCS @ UIUC · B.S. CS @ ASU (4.00)`,
            `  stack     Python, TypeScript, FastAPI, Postgres, Redis`,
            `  status    ${site.status.availableText}`,
            `  uptime    ${Math.floor(performance.now() / 1000)}s on this page`
          ),
        ];
      case "sudo":
        if (arg.toLowerCase() === "hire krishna") {
          setTimeout(() => navigate("/contact"), 900);
          return out("[sudo] password for guest: ********", "Permission granted. Redirecting you to the contact page... 🚀");
        }
        return err("sudo: nice try.");
      case "rm":
        return err("rm: permission denied. This portfolio is load-bearing.");
      case "clear":
        setTimeout(() => setLines([]), 0);
        return [];
      case "exit":
        setOpen(false);
        return [];
      default:
        return err(`command not found: ${cmd}. Type 'help'.`);
    }
  };

  const submit = () => {
    const result = run(input);
    setLines((l) => [...l, { kind: "in", text: input }, ...result]);
    if (input.trim()) setHistory((h) => [input, ...h].slice(0, 50));
    setCursor(-1);
    setInput("");
  };

  const COMPLETIONS = ["help", "ls", "cd", "open", "whoami", "cat about", "projects", "experience", "skills", "socials", "resume", "email", "neofetch", "theme", "sudo hire krishna", "clear", "exit", ...Object.keys(SECTIONS).map((s) => `cd ${s}`)];

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMPLETIONS.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            initial={{ y: 20, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="flex h-[min(560px,80vh)] w-full max-w-[760px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0d]/95 font-mono text-[12.5px] text-zinc-300 shadow-2xl"
            onClick={() => inputRef.current?.focus()}
            data-lenis-prevent
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <button onClick={() => setOpen(false)} aria-label="Close terminal" className="size-3 rounded-full bg-rose-500 hover:brightness-110" />
              <span className="size-3 rounded-full bg-amber-400" />
              <span className="size-3 rounded-full bg-emerald-500" />
              <span className="ml-3 text-[11px] text-zinc-500">guest@krishna — zsh — 80×24</span>
            </div>

            <div ref={bodyRef} className="flex-1 space-y-0.5 overflow-y-auto overscroll-contain px-4 py-3">
              {lines.map((l, i) => (
                <div key={i} className="whitespace-pre-wrap break-words">
                  {l.kind === "in" ? (
                    <>
                      <span className="text-[var(--neon-color)]">{PROMPT}</span> <span className="text-zinc-100">{l.text}</span>
                    </>
                  ) : l.kind === "ascii" ? (
                    <pre className="text-[10px] leading-[1.2] text-[var(--neon-color)]">{l.text}</pre>
                  ) : (
                    <span className={l.kind === "err" ? "text-rose-400" : ""}>{l.text}</span>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2">
                <span className="shrink-0 text-[var(--neon-color)]">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                  className="flex-1 bg-transparent text-zinc-100 caret-[var(--neon-color)] outline-none"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
