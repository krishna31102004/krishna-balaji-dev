const groups = [
  ["Backend", "Node.js, Express, FastAPI, REST APIs"],
  ["Data & ML", "PostgreSQL, Redis, Polars, Parquet, XGBoost, LightGBM, PuLP"],
  ["Infrastructure", "GCP, Prometheus, Slack, Stripe, LangGraph"],
  ["Languages", "Python, JavaScript / TypeScript, SQL"],
];

export default function Education() {
  return (
    <section className="education-section" id="education" aria-labelledby="education-title">
      <div className="section-wrap content-section">
        <div className="section-heading">
          <h2 id="education-title">My education</h2>
        </div>
        <div className="education-layout">
          <div className="education-list">
            <article className="education-item uiuc-item">
              <span className="education-date">Aug 2026 — May 2028</span>
              <div><h3>University of Illinois Urbana-Champaign</h3><p>Master of Computer Science</p></div>
              <span className="education-status">In progress</span>
            </article>
            <article className="education-item asu-item">
              <span className="education-date">Aug 2022 — May 2026</span>
              <div><h3>Arizona State University</h3><p>B.S. Computer Science (Honors)<br />Minor in Business</p></div>
              <span className="education-status">GPA 4.00 / 4.00</span>
            </article>
          </div>
          <aside className="skills-panel" aria-labelledby="skills-title">
            <h3 id="skills-title">Technical toolkit</h3>
            <dl>{groups.map(([label, skills]) => <div className="skill-row" key={label}><dt>{label}</dt><dd>{skills}</dd></div>)}</dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
