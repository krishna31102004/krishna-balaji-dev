import { ArrowUpRight } from "lucide-react";

const browserStack = ["Reliability testing", "Browser agents", "CI regression"];
const glassboxStack = ["FastAPI", "Redis", "LangGraph", "PostgreSQL", "Prometheus", "Slack"];
const atlasStack = ["FastAPI", "Redis", "Polars", "Parquet"];

function Stack({ items }: { items: string[] }) {
  return <ul className="stack-list" aria-label="Technologies and focus">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function ProjectLink({ href }: { href: string }) {
  return <a className="project-link" href={href} target="_blank" rel="noreferrer">View source <ArrowUpRight size={15} aria-hidden="true" /></a>;
}

export default function Projects() {
  return (
    <section className="work-section" id="projects" aria-labelledby="projects-title">
      <div className="section-wrap content-section">
        <div className="section-heading">
          <p className="section-index">Selected work</p>
          <div><h2 id="projects-title">Systems built to be trusted</h2><p>Three projects at the intersection of reliability, intelligent operations, and fast data access.</p></div>
        </div>

        <article className="project project-browser" aria-labelledby="browserproof-title">
          <div className="project-visual browser-visual" role="group" aria-label="BrowserProof reliability testing summary">
            <div className="coverage-number">90<span>%</span></div>
            <p>seeded-failure detection</p>
            <div className="coverage-meta"><span><b>36</b> controlled scenarios</span><span><b>10</b> fault types</span></div>
          </div>
          <div className="project-copy">
            <h3 id="browserproof-title">BrowserProof</h3>
            <p className="project-subtitle">Reliability testing for AI browser agents</p>
            <p className="project-description">A controlled test suite for seeing how browser agents behave when the browser or network misbehaves. It turns seeded faults into reproducible CI regression scenarios.</p>
            <Stack items={browserStack} />
            <div className="project-footer"><span>36 scenarios · 10 fault types</span><ProjectLink href="https://github.com/krishna31102004/browser-proof" /></div>
          </div>
        </article>

        <article className="project project-glassbox" aria-labelledby="glassbox-title">
          <div className="project-copy">
            <h3 id="glassbox-title">Glassbox SRE</h3>
            <p className="project-subtitle">An AI-powered incident investigator</p>
            <p className="project-description">A read-only incident analysis system with parallel workflows, evaluated against a replayable 15-scenario benchmark. Top-1 commit identification reached 86.7%, compared with a 13.3% heuristic baseline.</p>
            <Stack items={glassboxStack} />
            <div className="project-footer"><span>15-scenario replay benchmark</span><ProjectLink href="https://github.com/krishna31102004/ai-sre-new" /></div>
          </div>
          <div className="project-visual glassbox-visual" role="img" aria-label="Top-1 commit identification benchmark: 86.7 percent versus 13.3 percent">
            <div className="benchmark-row"><span>Glassbox SRE</span><b>86.7%</b></div>
            <div className="benchmark-track"><span className="benchmark-fill" /></div>
            <div className="benchmark-row baseline"><span>Heuristic baseline</span><b>13.3%</b></div>
            <div className="benchmark-track"><span className="benchmark-fill baseline-fill" /></div>
            <p className="benchmark-note">15-scenario replay benchmark</p>
          </div>
        </article>

        <article className="project project-atlas" aria-labelledby="atlas-title">
          <div className="atlas-summary">
            <div className="atlas-primary"><strong>15M<span>+</span></strong><span>price data points</span></div>
            <div className="atlas-secondary"><div><b>4,000+</b><span>stock tickers</span></div><div><b>&lt;200ms</b><span>P99 latency</span></div></div>
          </div>
          <div className="project-copy">
            <h3 id="atlas-title">ATLAS</h3>
            <p className="project-subtitle">High-performance analytics engine</p>
            <p className="project-description">A data-intensive analytics system built to query market history at scale. Polars and Parquet support fast backtests across 4,000+ tickers, reducing backtest query time by 80%.</p>
            <Stack items={atlasStack} />
            <div className="project-footer"><span>80% less backtest query time</span></div>
          </div>
        </article>
      </div>
    </section>
  );
}
