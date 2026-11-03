export default function About() {
  return (
    <section className="about-section section-wrap content-section" id="about" aria-labelledby="about-title">
      <div className="section-heading">
        <h2 id="about-title">A little about me</h2>
      </div>
      <div className="about-layout">
        <p className="about-lede">I’m a computer science student at the University of Illinois Urbana-Champaign, continuing my studies after graduating from Arizona State University.</p>
        <div className="about-copy">
          <p>My internships have taken me through product engineering, university research, and machine-learning work in industry. Along the way I’ve built APIs and workflows, data pipelines, and cloud services.</p>
          <p>Outside those roles, I’ve been building BrowserProof, Glassbox SRE, and ATLAS: projects focused on agent reliability, incident analysis, and fast analytics.</p>
          <div className="about-focus"><span>Currently studying</span><strong>Master of Computer Science · UIUC</strong></div>
        </div>
      </div>
    </section>
  );
}
