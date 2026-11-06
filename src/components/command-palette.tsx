import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import { PALETTES, useTheme, type Palette } from "./theme-provider";
import {
  Search,
  Compass,
  Globe,
  Terminal,
  Copy,
  Check,
  Moon,
  Sun,
  Mail,
  Briefcase,
  FlaskConical,
  FileText,
  Linkedin,
  Palette as PaletteIcon,
  ChevronLeft,
  CornerDownLeft,
  User,
} from "lucide-react";
import { GitHubIcon } from "./icons";

type Page = "root" | "themes";

/**
 * ⌘K menu built on cmdk (fuzzy search, keyboard nav, nested pages).
 * Backspace on an empty search goes back from a sub-page.
 */
export function CommandPalette({
  open,
  isOpen,
  onClose,
  setIsOpen,
}: {
  open?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  setIsOpen?: (open: boolean) => void;
}) {
  const activeOpen = open ?? isOpen ?? false;
  const handleClose = () => {
    if (onClose) onClose();
    if (setIsOpen) setIsOpen(false);
  };
  const { theme, toggleTheme, palette, setPalette } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<Page>("root");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (activeOpen) {
      setSearch("");
      setPage("root");
    }
  }, [activeOpen]);

  useEffect(() => {
    if (!activeOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const go = (path: string) => {
    navigate(path);
    handleClose();
  };
  const external = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    handleClose();
  };

  return (
    <AnimatePresence>
      {activeOpen && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center px-4 pt-[14vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative z-10 w-full max-w-xl"
          >
            <Command
              label="Command menu"
              loop
              className="cmdk overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]/95 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !search && page !== "root") {
                  e.preventDefault();
                  setPage("root");
                }
              }}
            >
              <div className="flex items-center gap-2.5 border-b border-[var(--line)] px-4">
                {page !== "root" ? (
                  <button onClick={() => setPage("root")} aria-label="Back" className="rounded-md border border-[var(--line)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted)] hover:text-[var(--fg)]">
                    <ChevronLeft className="inline size-3" /> themes
                  </button>
                ) : (
                  <Search className="size-4 shrink-0 text-[var(--soft)]" />
                )}
                <Command.Input
                  autoFocus
                  value={search}
                  onValueChange={setSearch}
                  placeholder={page === "themes" ? "Pick a theme..." : "Type a command or search..."}
                  className="h-12 w-full bg-transparent text-[14px] text-[var(--fg)] outline-none placeholder:text-[var(--soft)]"
                />
                <kbd className="hidden rounded-md border border-[var(--line)] bg-[var(--chip)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--soft)] sm:inline-block">
                  ESC
                </kbd>
              </div>

              <Command.List data-lenis-prevent className="max-h-[min(420px,55vh)] overflow-y-auto overscroll-contain p-2">
                <Command.Empty className="py-10 text-center font-mono text-xs text-[var(--soft)]">
                  Nothing matched “{search}”
                </Command.Empty>

                {page === "root" && (
                  <>
                    <Command.Group heading="Navigate">
                      <Item icon={<Compass />} title="Home" sub="Intro, football game and highlights" onSelect={() => go("/")} />
                      <Item icon={<User />} title="About" sub="Bio, education and quick facts" onSelect={() => go("/#about")} />
                      <Item icon={<Globe />} title="Projects" sub="BrowserProof, Glassbox SRE, ATLAS, FPL research..." onSelect={() => go("/projects")} />
                      <Item icon={<Briefcase />} title="Experience" sub="Circle.ooo, ASU research, Quantiphi" onSelect={() => go("/experience")} />
                      <Item icon={<FlaskConical />} title="Experiments" sub="Memory board, vending machine and other toys" onSelect={() => go("/experiments")} />
                      <Item icon={<Mail />} title="Contact" sub="Send a message or grab the email" onSelect={() => go("/contact")} />
                    </Command.Group>

                    <Command.Group heading="Projects">
                      {site.projects.map((p) => (
                        <Item
                          key={p.title}
                          icon={<Globe />}
                          title={p.title}
                          sub={p.blurb}
                          keywords={p.stack}
                          onSelect={() => go(`/projects?search=${encodeURIComponent(p.title)}`)}
                        />
                      ))}
                    </Command.Group>

                    <Command.Group heading="Actions">
                      <Item icon={<PaletteIcon />} title="Change theme…" sub={`Now: ${PALETTES.find((p) => p.id === palette)?.label}`} keywords={["color", "christmas", "diwali", "halloween"]} onSelect={() => { setSearch(""); setPage("themes"); }} />
                      <Item
                        icon={theme === "dark" ? <Sun /> : <Moon />}
                        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        onSelect={() => {
                          toggleTheme();
                          handleClose();
                        }}
                      />
                      <Item
                        icon={<Terminal />}
                        title="Open terminal"
                        sub="Browse the site from a shell"
                        shortcut="`"
                        onSelect={() => {
                          handleClose();
                          window.dispatchEvent(new Event("terminal:open"));
                        }}
                      />
                      <Item
                        icon={copied ? <Check /> : <Copy />}
                        title={copied ? "Copied!" : "Copy email address"}
                        sub={site.email}
                        onSelect={() => {
                          navigator.clipboard.writeText(site.email);
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                            handleClose();
                          }, 900);
                        }}
                      />
                      <Item icon={<FileText />} title="Open resume" sub="PDF" onSelect={() => external(site.socials.resume)} />
                    </Command.Group>

                    <Command.Group heading="Elsewhere">
                      <Item icon={<GitHubIcon className="size-4" />} title="GitHub" sub={site.socials.github.replace("https://", "")} onSelect={() => external(site.socials.github)} />
                      <Item icon={<Linkedin />} title="LinkedIn" sub={site.socials.linkedin.replace("https://www.", "")} onSelect={() => external(site.socials.linkedin)} />
                    </Command.Group>
                  </>
                )}

                {page === "themes" &&
                  [
                    { heading: "Colors", items: PALETTES.filter((p) => !p.festive) },
                    { heading: "Festive", items: PALETTES.filter((p) => p.festive) },
                  ].map((g) => (
                    <Command.Group key={g.heading} heading={g.heading}>
                      {g.items.map((p) => (
                        <Item
                          key={p.id}
                          icon={
                            p.festive ? (
                              <span className="text-[14px] leading-none">{p.swatch}</span>
                            ) : (
                              <span className="block size-3.5 rounded-full ring-1 ring-[var(--line)]" style={{ background: p.swatch }} />
                            )
                          }
                          title={p.label}
                          sub={palette === p.id ? "Current theme" : undefined}
                          onSelect={() => {
                            setPalette(p.id as Palette);
                            handleClose();
                          }}
                        />
                      ))}
                    </Command.Group>
                  ))}
              </Command.List>

              <div className="flex items-center justify-between border-t border-[var(--line)] bg-[var(--chip)]/60 px-4 py-2 font-mono text-[10px] text-[var(--soft)]">
                <span className="flex items-center gap-3">
                  <span>↑↓ navigate</span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="size-3" /> select
                  </span>
                  {page !== "root" && <span>⌫ back</span>}
                </span>
                <span>
                  press <kbd className="rounded border border-[var(--line)] px-1">`</kbd> for terminal
                </span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Item({
  icon,
  title,
  sub,
  keywords,
  shortcut,
  onSelect,
}: {
  icon: React.ReactNode;
  title: string;
  sub?: string;
  keywords?: string[];
  shortcut?: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      value={title}
      keywords={keywords}
      onSelect={onSelect}
      className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[var(--muted)] transition-colors data-[selected=true]:bg-[var(--hover)] data-[selected=true]:text-[var(--fg)]"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-[var(--line)] bg-[var(--chip)] text-[var(--soft)] transition-colors group-data-[selected=true]:border-[color-mix(in_srgb,var(--neon-color)_45%,transparent)] group-data-[selected=true]:text-[var(--neon-color)] [&_svg]:size-4">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium">{title}</span>
        {sub && <span className="block truncate text-[11px] text-[var(--soft)]">{sub}</span>}
      </span>
      {shortcut ? (
        <kbd className="rounded border border-[var(--line)] px-1.5 font-mono text-[10px] text-[var(--soft)]">{shortcut}</kbd>
      ) : (
        <CornerDownLeft className="size-3.5 opacity-0 transition-opacity group-data-[selected=true]:opacity-60" />
      )}
    </Command.Item>
  );
}
