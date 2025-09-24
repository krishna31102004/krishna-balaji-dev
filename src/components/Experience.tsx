import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import quantiphiLogo from "@/assets/quantiphi-logo.png";

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "Circle.ooo",
    location: "Remote – Houston, TX",
    period: "Aug 2025 – Present",
    description: [
      "Engineered **AI-driven event registration agents** that automated multi-account workflows into a **single-tap system**.",
      "Integrated and tested **LLM-based tools** in production, improving task execution with higher **accuracy** and **scalability**."
    ],
    skills: ["Next.js", "AI Agents", "LLMs", "Automation", "Workflow Systems", "Event Tech"],
    logo: null
  },
  {
    title: "Applied ML Research Intern",
    company: "Arizona State University",
    location: "Tempe, AZ",
    period: "Aug 2025 – Present",
    description: [
      "Built supervised **ML pipelines** using **FPL APIs** and football datasets to predict player points.",
      "Implemented **Random Forest, XGBoost, and Neural Networks**; optimized with **MAE** and **R²**; applied **SHAP** for explainability."
    ],
    skills: ["Python", "scikit-learn", "XGBoost", "Neural Networks", "Pandas", "APIs", "SHAP", "Model Evaluation"],
    logo: null
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Quantiphi",
    location: "Mumbai, India",
    period: "May 2025 – Aug 2025",
    description: [
      "Automated data processing with **Python pipelines**, cleaning and mapping claim outputs to a structured schema; **reduced manual review time by 80%**.",
      "Optimized **LLM prompt engineering** to extract structured fields from unstructured insurance claims, **improving overall accuracy** across diverse formats."
    ],
    skills: ["LLMs", "Prompt Engineering", "Python", "Data Processing", "Schema Mapping", "Insurance"],
    logo: quantiphiLogo
  }
];

export default function Experience() {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

  const toggleExpanded = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderDescription = (description: string) => {
    // Convert **text** to bold formatting
    return description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

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
            <Card 
              key={index} 
              className="relative bg-card/80 backdrop-blur-sm border-l-4 border-l-primary hover:border-l-accent transition-all duration-300 group overflow-hidden hover:shadow-[0_8px_32px_rgba(124,92,255,0.12)]"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              <CardHeader className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {exp.logo ? (
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-background/50 flex items-center justify-center p-2 border border-primary/20">
                        <img 
                          src={exp.logo} 
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {exp.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground/80 text-sm">{exp.company}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 lg:text-right">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                      <CalendarDays className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium text-primary">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                      <MapPin className="h-3 w-3 text-accent" />
                      <span className="text-xs font-medium text-accent">{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="mb-6">
                  <ul className="space-y-3">
                    {exp.description.slice(0, expandedCards[index] ? exp.description.length : 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground leading-relaxed text-sm">
                        <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full mt-2 flex-shrink-0" />
                        <span 
                          dangerouslySetInnerHTML={{ __html: renderDescription(item) }}
                          className="[&>strong]:text-foreground [&>strong]:font-semibold"
                        />
                      </li>
                    ))}
                  </ul>
                  
                  {exp.description.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(index)}
                      className="mt-3 h-auto p-2 text-xs text-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                    >
                      {expandedCards[index] ? (
                        <>
                          <ChevronUp className="w-3 h-3 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3 mr-1" />
                          Show More
                        </>
                      )}
                    </Button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20 text-xs px-2 py-1 rounded-full font-medium hover:scale-105 transition-transform duration-200"
                    >
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