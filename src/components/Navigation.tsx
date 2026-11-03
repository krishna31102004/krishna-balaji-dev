import { useRef, useState, type KeyboardEvent } from "react";
import { Menu, X } from "lucide-react";

const items = [
  ["About", "#about"],
  ["Education", "#education"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && open) {
      close();
      menuButton.current?.focus();
    }
  };

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation" onKeyDown={handleKeyDown}>
        <a className="wordmark" href="#home" onClick={close} aria-label="Krishna Balaji, home">
          <span className="wordmark-mark" aria-hidden="true">KB</span>
          <span>Krishna Balaji</span>
        </a>
        <div className="desktop-nav">
          {items.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a>
        </div>
        <button
          className="menu-toggle"
          ref={menuButton}
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <div id="mobile-navigation" className={`mobile-nav${open ? " is-open" : ""}`} hidden={!open}>
          {items.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
          <a href="/resume.pdf" target="_blank" rel="noreferrer" onClick={close}>Resume <span aria-hidden="true">↗</span></a>
        </div>
      </nav>
    </header>
  );
}
