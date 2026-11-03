import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <footer className="contact-section" id="contact">
      <div className="section-wrap">
        <div className="contact-top">
          <div><h2>Let’s get in touch.</h2><p className="contact-note">I’m happy to talk about engineering roles, projects, or what I’m learning at UIUC.</p></div>
          <a className="contact-email" href="mailto:krishna311004@gmail.com">krishna311004@gmail.com <ArrowUpRight size={19} aria-hidden="true" /></a>
        </div>
        <div className="footer-bottom">
          <a className="footer-name" href="#home">Krishna Balaji <span>· Software Engineer</span></a>
          <div className="footer-links">
            <a href="https://linkedin.com/in/krishnabalaji" target="_blank" rel="noreferrer"><Linkedin size={15} aria-hidden="true" /> LinkedIn</a>
            <a href="https://github.com/krishna31102004" target="_blank" rel="noreferrer"><Github size={15} aria-hidden="true" /> GitHub</a>
            <a href="mailto:krishna311004@gmail.com"><Mail size={15} aria-hidden="true" /> Email</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
          <span className="copyright">© {new Date().getFullYear()} Krishna Balaji</span>
        </div>
      </div>
    </footer>
  );
}
