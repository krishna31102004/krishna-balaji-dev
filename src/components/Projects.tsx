import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "browserproof",
    name: "BrowserProof",
    subtitle: "Reliability testing for AI browser agents",
    description: "A repeatable test suite for checking how browser agents respond to browser and network failures, with regression scenarios that can run in CI.",
    stack: ["Browser agents", "Fault injection", "CI regression"],
    link: "https://github.com/krishna31102004/browser-proof",
    linkLabel: "View source",
  },
  {
    id: "glassbox",
    name: "Glassbox SRE",
    subtitle: "AI-powered incident investigator",
    description: "Parallel incident analysis workflows, measured on a replayable 15-scenario benchmark. Top-1 commit identification reached 86.7%, against a 13.3% heuristic baseline.",
    stack: ["FastAPI", "Redis", "LangGraph", "PostgreSQL", "Prometheus", "Slack"],
    link: "https://github.com/krishna31102004/ai-sre-new",
    linkLabel: "View source",
  },
  {
    id: "atlas",
    name: "ATLAS",
    subtitle: "High-performance analytics engine",
    description: "A FastAPI analytics engine using Polars and Parquet to work across 4,000+ stock tickers and 15M+ price points, with sub-200ms P99 latency and an 80% reduction in backtest query time.",
    stack: ["FastAPI", "Redis", "Polars", "Parquet"],
  },
];

function ProjectArtwork({ id }: { id: string }) {
  if (id === "browserproof") return (
    <div className="project-art browser-art" role="img" aria-label="90 percent seeded-failure detection across 36 scenarios and 10 fault types">
      <div className="art-topline"><span>BrowserProof · reliability suite</span><span className="art-pip" /></div>
      <div className="art-metric">90<span>%</span></div>
      <div className="art-caption">seeded-failure detection</div>
      <div className="art-footer"><span>36 controlled scenarios</span><span>10 fault types</span></div>
    </div>
  );
  if (id === "glassbox") return (
    <div className="project-art glassbox-art" role="img" aria-label="Glassbox SRE identified the right commit in 86.7 percent of scenarios, versus 13.3 percent for the heuristic baseline">
      <div className="art-topline"><span>Replay benchmark</span><span>15 scenarios</span></div>
      <div className="benchmark-row"><span>Glassbox SRE</span><b>86.7%</b></div>
      <div className="benchmark-track"><span className="benchmark-fill" /></div>
      <div className="benchmark-row baseline"><span>Heuristic baseline</span><b>13.3%</b></div>
      <div className="benchmark-track"><span className="benchmark-fill baseline-fill" /></div>
      <div className="art-footer"><span>Top-1 commit identification</span></div>
    </div>
  );
  return (
    <div className="project-art atlas-art" role="img" aria-label="ATLAS processes over 15 million price data points across 4,000 plus stock tickers with sub-200 millisecond P99 latency">
      <div className="art-topline"><span>ATLAS · market analytics</span><span>Parquet / Polars</span></div>
      <div className="atlas-primary"><strong>15M<span>+</span></strong><span>historical price data points</span></div>
      <div className="atlas-metric-row"><div><strong>4,000+</strong><span>tickers</span></div><div><strong>&lt;200ms</strong><span>P99</span></div><div><strong>80%</strong><span>less query time</span></div></div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-wrap content-section">
        <div className="section-heading">
          <h2 id="projects-title">Projects I’ve been working on</h2>
          <p>Tools and systems built around reliability, incident analysis, and data at scale.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card project-${project.id}`} key={project.id}>
              <ProjectArtwork id={project.id} />
              <div className="project-copy">
                <h3>{project.name}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <ul className="stack-list" aria-label={`${project.name} technologies`}>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                {project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel}<ArrowUpRight size={15} aria-hidden="true" /></a> : <span className="project-note">No public repository link</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
