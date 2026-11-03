const groups = [
  ["Backend & APIs", "Node.js, Express, FastAPI, REST APIs"],
  ["Data & machine learning", "PostgreSQL, Redis, Polars, Parquet, XGBoost, LightGBM, PuLP"],
  ["Infrastructure & integrations", "GCP, Prometheus, Slack, Stripe, LangGraph"],
  ["Languages", "Python, JavaScript / TypeScript, SQL"],
];

export default function About() {
  return (
    <section className="section-wrap content-section about-section" id="education" aria-labelledby="education-title">
      <div className="section-heading">
        <p className="section-index">Education</p>
        <div><h2 id="education-title">Learning in progress</h2><p>Computer science, applied systems, and the business context around them.</p></div>
      </div>
      <div className="about-grid">
        <div className="education-list">
          <article className="education-item">
            <span className="education-date">Aug 2026 – May 2028</span>
            <div><h3>University of Illinois Urbana-Champaign</h3><p>Master of Computer Science</p></div>
            <span className="education-status">In progress</span>
          </article>
          <article className="education-item">
            <span className="education-date">Aug 2022 – May 2026</span>
            <div><h3>Arizona State University</h3><p>B.S. Computer Science (Honors) · Minor in Business</p></div>
            <span className="education-status">GPA 4.00 / 4.00</span>
          </article>
        </div>
        <div className="skills-panel">
          <h3>Technical toolkit</h3>
          <dl>{groups.map(([label, skills]) => <div className="skill-row" key={label}><dt>{label}</dt><dd>{skills}</dd></div>)}</dl>
        </div>
      </div>
    </section>
  );
}
