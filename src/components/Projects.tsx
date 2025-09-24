import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar } from "lucide-react";
import aiJobMatcherImage from "@/assets/ai-job-matcher.jpg";
import fakeNewsDetectionImage from "@/assets/fake-news-detection.jpg";
import charityDonationImage from "@/assets/charity-donation-manager.jpg";
import pennywiseAiImage from "@/assets/pennywise-ai.jpg";

const projects = [
  {
    title: "AI-Powered Job Matcher",
    period: "Aug 2025 – Sep 2025",
    description: "Production-ready FastAPI service that parses PDF/DOCX resumes and computes job-fit scores with TF-IDF cosine similarity. Includes LLM-powered suggestions with switchable embeddings (TF-IDF, Sentence-Transformers, OpenAI). React frontend on Vercel; secured backend on Render with Docker, CORS, health checks, and pytest CI/CD.",
    skills: ["FastAPI", "React", "OpenAI", "Sentence-Transformers", "Docker", "Render", "Vercel", "Swagger/OpenAPI", "pytest"],
    category: "ML/AI",
    codeUrl: "https://github.com/krishna31102004/ai-job-matcher",
    demoUrl: "https://ai-job-matcher-beige.vercel.app",
    image: aiJobMatcherImage
  },
  {
    title: "Fake News Detection API",
    period: "Feb 2025 – Mar 2025",
    description: "Created a Flask API with a fine-tuned DistilBERT model achieving 99%+ accuracy on diverse news datasets. Deployed on Render with robust caching, health-check endpoints, and a Bootstrap-based frontend.",
    skills: ["Flask", "DistilBERT", "Hugging Face", "Render", "Bootstrap"],
    category: "ML/AI",
    image: fakeNewsDetectionImage
  },
  {
    title: "Charity Donation Manager",
    period: "Aug 2024 – Dec 2024",
    description: "Developed a donation app with real-time location tracking and API-based charity recommendations. Integrated Firebase authentication and live data sync for scalable backend handling.",
    skills: ["SwiftUI", "Firebase", "MVVM", "Location APIs"],
    category: "Mobile App",
    codeUrl: "https://github.com/krishna31102004/charity-donation-manager",
    image: charityDonationImage
  },
  {
    title: "Pennywise AI — Personal Finance Tracker with AI Insights",
    period: "Aug 2025 – Sep 2025",
    description: "Production-ready Next.js app that links Plaid Sandbox accounts, securely syncs transactions/balances, and surfaces KPIs (runway, burn, MTD spend) with interactive charts. Includes per-visitor sessions, a resilient `/jobs/refresh` pipeline (optional webhooks), encrypted Plaid tokens, NL \"Ask\" and AI Insights, and idempotent 6-month demo seeding — deployed on Vercel.",
    skills: ["Next.js", "TypeScript", "Prisma", "Neon Postgres", "Plaid", "OpenAI", "Recharts", "Vercel", "pgvector (optional)"],
    category: "FinTech/AI",
    codeUrl: "https://github.com/krishna31102004/pennywise-ai",
    demoUrl: "https://pennywise-ai.vercel.app",
    image: pennywiseAiImage
  },
  {
    title: "Jirani Digital Library Software",
    period: "Aug 2023 – Dec 2023",
    description: "Developed the front-end for an SQL-based knowledge hub aiding underprivileged learners in Kenya. Pitched and secured $3,000 in funding through a competition based on usability and impact.",
    skills: ["SQL", "UX Design", "Front-End Dev"],
    category: "Social Impact",
    highlight: "$3,000 funding secured"
  }
];

const getCategoryColor = (category: string) => {
  const colors = {
    "ML/AI": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Mobile App": "bg-green-500/10 text-green-400 border-green-500/20",
    "Web Extension": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Social Impact": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "FinTech/AI": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  };
  return colors[category as keyof typeof colors] || "bg-primary/10 text-primary border-primary/20";
};

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4"
              style={{ 
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            Projects
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'hsl(var(--text-1))' }}>
            A showcase of my work in machine learning, web development, and impactful applications
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="experience-card group h-full overflow-hidden">
              {project.image && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - ${project.description.substring(0, 100)}...`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`skill-tag ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </Badge>
                      {project.highlight && (
                        <Badge className="skill-tag border-primary/20" style={{ color: 'hsl(var(--brand-1))' }}>
                          {project.highlight}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-semibold transition-colors" 
                              style={{ color: 'hsl(var(--text-1))' }}>
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2" style={{ color: 'hsl(var(--text-2))' }}>
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{project.period}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="leading-relaxed mb-6" style={{ color: 'hsl(var(--text-1))' }}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills.map((skill) => (
                    <Badge key={skill} className="skill-tag">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {project.codeUrl ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="transition-all duration-150 hover:scale-105"
                      style={{
                        borderColor: 'hsl(var(--brand-1))',
                        color: 'hsl(var(--brand-1))',
                        backgroundColor: 'transparent'
                      }}
                      asChild
                    >
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="opacity-50 cursor-not-allowed" disabled>
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  )}
                  {project.demoUrl ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="transition-all duration-150 hover:scale-105"
                      style={{
                        borderColor: 'hsl(var(--brand-2))',
                        color: 'hsl(var(--brand-2))',
                        backgroundColor: 'transparent'
                      }}
                      asChild
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="opacity-50 cursor-not-allowed" disabled>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}