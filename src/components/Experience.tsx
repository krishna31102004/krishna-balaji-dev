import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Building2 } from "lucide-react";
import quantiphiLogo from "@/assets/quantiphi-logo.png";
import nexusInfoLogo from "@/assets/nexus-info-logo.png";
import headstarterLogo from "@/assets/headstarter-logo.png";

const experiences = [
  {
    title: "Machine Learning Engineer Intern",
    company: "Quantiphi",
    location: "Mumbai, India",
    period: "May 2025 – Aug 2025",
    description: [
      "Engineered and fine-tuned LLM prompts to extract structured data from complex insurance claim documents",
      "Developed Python-based post-processing pipelines to clean, validate, and map outputs to a structured schema",
      "Reduced manual correction efforts by 80% through automation and improved prompt engineering strategies"
    ],
    skills: ["LLMs", "Python", "Prompt Engineering", "Data Processing"],
    logo: quantiphiLogo
  },
  {
    title: "AI/ML Intern",
    company: "Nexus Info",
    location: "Coimbatore, India",
    period: "July 2024 – August 2024",
    description: [
      "Built conversational AI chatbots with contextual understanding for college admissions queries",
      "Designed and deployed a Disease Prediction System using logistic regression and random forests with 93%+ accuracy"
    ],
    skills: ["Chatbots", "Machine Learning", "Logistic Regression", "Random Forest"],
    logo: nexusInfoLogo
  },
  {
    title: "Software Engineering Fellow",
    company: "Headstarter AI",
    location: "Long Island City, NY",
    period: "July 2024 – August 2024",
    description: [
      "Developed and deployed Pantry Tracker using Next.js, Firebase, OpenAI, and CI/CD pipelines on Vercel",
      "Created a personal analytics-integrated website with custom domain, HTML/CSS, and Google Analytics"
    ],
    skills: ["Next.js", "Firebase", "OpenAI", "CI/CD", "Vercel"],
    logo: headstarterLogo
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gradient-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey in machine learning, AI, and software engineering
          </p>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border hover:shadow-elegant transition-all duration-300 group">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {exp.logo && (
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-background/50 flex items-center justify-center p-2">
                        <img 
                          src={exp.logo} 
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">{exp.company}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <CalendarDays className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground leading-relaxed">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0 mt-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}