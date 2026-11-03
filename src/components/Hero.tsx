import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">Krishna<br className="desktop-break" /> Balaji<span className="name-period">.</span></h1>
        <p className="hero-lede">Software engineer building reliable backend systems, AI infrastructure, and data-intensive applications.</p>
        <p className="hero-summary">My work spans production APIs, machine-learning pipelines, and systems that make complex behavior easier to inspect and trust.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="/resume.pdf" target="_blank" rel="noreferrer"><Download size={16} aria-hidden="true" /> View resume</a>
          <a className="text-link" href="#projects">Explore selected work <ArrowDown size={15} aria-hidden="true" /></a>
        </div>
        <div className="social-links" aria-label="Professional links">
          <a href="https://github.com/krishna31102004" target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>
          <a href="https://linkedin.com/in/krishnabalaji" target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn</a>
          <a href="mailto:krishna311004@gmail.com"><Mail size={16} aria-hidden="true" /> Email</a>
        </div>
      </div>
      <aside className="hero-facts" aria-label="Education and experience overview">
        <div className="facts-topline"><span>Education</span></div>
        <div className="fact-block fact-current">
          <span className="fact-label">Graduate study</span>
          <strong>University of Illinois Urbana-Champaign</strong>
          <span>M.C.S. · Aug 2026 – May 2028</span>
        </div>
        <div className="fact-block">
          <span className="fact-label">Undergraduate study</span>
          <strong>Arizona State University</strong>
          <span>B.S. Computer Science (Honors) · 4.00/4.00</span>
        </div>
        <div className="fact-bottom">
          <div><b>3</b><span>engineering roles</span></div>
          <div><b>3</b><span>featured systems</span></div>
          <a href="#experience" aria-label="Read experience"><ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </aside>
    </section>
  );
}
