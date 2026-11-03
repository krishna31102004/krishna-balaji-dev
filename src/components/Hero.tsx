import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-inner section-wrap">
        <div className="hero-copy">
          <h1 id="hero-title">Hello, I’m Krishna!</h1>
          <p className="hero-subtitle">Computer science student, software engineer, and builder of dependable systems.</p>
          <p className="hero-summary">I’m pursuing an M.C.S. at UIUC after studying computer science at Arizona State. My work has ranged from production APIs and applied ML research to tools for testing AI agents and analyzing large datasets.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#about">Discover more <ArrowDown size={16} aria-hidden="true" /></a>
            <a className="button button-light" href="/resume.pdf" target="_blank" rel="noreferrer"><Download size={16} aria-hidden="true" /> View resume</a>
          </div>
          <div className="social-links" aria-label="Professional links">
            <a href="https://github.com/krishna31102004" target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>
            <a href="https://linkedin.com/in/krishnabalaji" target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn</a>
            <a href="mailto:krishna311004@gmail.com"><Mail size={16} aria-hidden="true" /> Email</a>
          </div>
        </div>
        <aside className="hero-highlights" aria-label="A few numbers from my work">
          <div className="highlight-top"><span>Recent work</span><ArrowUpRight size={17} aria-hidden="true" /></div>
          <div className="highlight-row"><strong>41</strong><span>REST API endpoints<br />across nine route modules</span></div>
          <div className="highlight-row"><strong>106,881</strong><span>player-gameweek observations<br />in an ML research pipeline</span></div>
          <div className="highlight-row"><strong>15M+</strong><span>historical price points<br />queried by ATLAS</span></div>
          <div className="highlight-foot"><span>UIUC M.C.S. · Class of 2028</span><span className="orange-dot" aria-hidden="true" /></div>
        </aside>
      </div>
    </section>
  );
}
