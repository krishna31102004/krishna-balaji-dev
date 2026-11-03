const roles = [
  {
    company: "Circle.ooo",
    title: "Software Engineering Intern",
    dates: "Sep 2025 – Apr 2026",
    points: [
      <>Implemented <strong>41 REST API endpoints</strong> across 9 Node.js / Express route modules.</>,
      <>Designed a sponsorship recommendation engine with <strong>6 weighted compatibility factors</strong>.</>,
      <>Connected workflows across 9 relational tables, messaging, proposal management, and Stripe checkout.</>,
    ],
  },
  {
    company: "Arizona State University",
    title: "Research Software Engineer Intern",
    dates: "Sep 2025 – Apr 2026",
    points: [
      <>Built ML pipelines over <strong>106,881 player-gameweek observations</strong>, reaching 0.70 mean Spearman correlation with XGBoost, LightGBM, and walk-forward validation.</>,
      <>Developed a rank-based signal evaluated against <strong>11M+ historical selection records</strong>.</>,
      <>Built a PuLP optimization system that ranked in the <strong>top 0.9% on a blind holdout</strong>.</>,
    ],
  },
  {
    company: "Quantiphi",
    title: "Machine Learning Engineer Intern",
    dates: "May 2025 – Aug 2025",
    points: [
      <>Built Python ETL pipelines for <strong>50,000+ claims per month</strong>, reducing manual review time by 80%.</>,
      <>Raised document extraction accuracy from <strong>72% to 90%</strong>.</>,
      <>Deployed GCP microservices supporting a <strong>25% reduction</strong> in claim approval cycle time.</>,
    ],
  },
];

export default function Experience() {
  return (
    <section className="section-wrap content-section" id="experience" aria-labelledby="experience-title">
      <div className="section-heading">
        <h2 id="experience-title">My experience</h2>
        <p>Product engineering, university research, and applied machine learning.</p>
      </div>
      <div className="experience-timeline">
        {roles.map((role) => (
          <article className="experience-row" key={role.company}>
            <div className="experience-date"><span>{role.dates}</span></div>
            <div className="experience-detail">
              <div className="experience-titleline"><div><h3>{role.company}</h3><p>{role.title}</p></div></div>
              <ul>{role.points.map((point, index) => <li key={index}>{point}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
