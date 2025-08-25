import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar } from "lucide-react";

const projects = [
  {
    title: "Fake News Detection API",
    period: "Feb 2025 – Mar 2025",
    description: "Created a Flask API with a fine-tuned DistilBERT model achieving 99%+ accuracy on diverse news datasets. Deployed on Render with robust caching, health-check endpoints, and a Bootstrap-based frontend.",
    skills: ["Flask", "DistilBERT", "Hugging Face", "Render", "Bootstrap"],
    category: "ML/AI"
  },
  {
    title: "Charity Donation Manager",
    period: "Aug 2024 – Dec 2024",
    description: "Developed a donation app with real-time location tracking and API-based charity recommendations. Integrated Firebase authentication and live data sync for scalable backend handling.",
    skills: ["SwiftUI", "Firebase", "MVVM", "Location APIs"],
    category: "Mobile App"
  },
  {
    title: "Text to PDF Converter",
    period: "Jan 2025 – Feb 2025",
    description: "Built a Chrome extension and full-stack web service for real-time text-to-PDF conversion with authentication. Optimized UI/UX and Google sign-in flow for secure access and storage.",
    skills: ["Firebase", "Chrome Extension", "Google OAuth", "Render"],
    category: "Web Extension"
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
    "Social Impact": "bg-orange-500/10 text-orange-400 border-orange-500/20"
  };
  return colors[category as keyof typeof colors] || "bg-primary/10 text-primary border-primary/20";
};

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work in machine learning, web development, and impactful applications
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="bg-gradient-secondary border-border hover:shadow-elegant transition-all duration-300 group h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getCategoryColor(project.category)}>
                        {project.category}
                      </Badge>
                      {project.highlight && (
                        <Badge variant="outline" className="border-primary text-primary">
                          {project.highlight}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{project.period}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}