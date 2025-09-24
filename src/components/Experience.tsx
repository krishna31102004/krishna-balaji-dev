import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import quantiphiLogo from "@/assets/quantiphi-logo.png";
import circleOooLogo from "@/assets/Circle-ooo-image.png";
import barrettLogo from "@/assets/barrett-honors-college.jpeg";

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
    logo: circleOooLogo
  },
  {
    title: "Applied ML Research Intern",
    company: "Arizona State University (Barrett, The Honors College)",
    location: "Tempe, AZ",
    period: "Aug 2025 – Present",
    description: [
      "Built supervised **ML pipelines** using **FPL APIs** and football datasets to predict player points.",
      "Implemented **Random Forest, XGBoost, and Neural Networks**; optimized with **MAE** and **R²**; applied **SHAP** for explainability."
    ],
    skills: ["Python", "scikit-learn", "XGBoost", "Neural Networks", "Pandas", "APIs", "SHAP", "Model Evaluation"],
    logo: barrettLogo
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
              className="experience-card group"
            >
              <CardHeader className="relative z-10 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-background/20 backdrop-blur-sm flex items-center justify-center p-2 border border-white/10 group-hover:scale-105 transition-transform duration-200">
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg md:text-xl font-semibold mb-1" style={{ color: 'hsl(var(--text-1))' }}>
                        {exp.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" style={{ color: 'hsl(var(--brand-1))' }} />
                        <span className="font-medium text-sm" style={{ color: 'hsl(var(--text-2))' }}>{exp.company}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 lg:text-right">
                    <div className="info-pill">
                      <CalendarDays className="h-3 w-3" style={{ color: 'hsl(var(--brand-1))' }} />
                      <span className="text-xs font-medium">{exp.period}</span>
                    </div>
                    <div className="info-pill">
                      <MapPin className="h-3 w-3" style={{ color: 'hsl(var(--brand-2))' }} />
                      <span className="text-xs font-medium">{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10 px-6 pb-6">
                <div className="mb-6">
                  <ul className="space-y-3 experience-bullets">
                    {exp.description.slice(0, expandedCards[index] ? exp.description.length : 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 leading-relaxed text-sm">
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-transform duration-200" 
                          style={{ 
                            background: 'var(--gradient-primary)',
                            animation: `pulse ${2 + idx * 0.3}s ease-in-out infinite`
                          }}
                        />
                        <span 
                          dangerouslySetInnerHTML={{ __html: renderDescription(item) }}
                          className="[&>strong]:font-semibold"
                          style={{ 
                            color: 'hsl(var(--text-1))',
                            ['--strong-color' as any]: 'hsl(var(--text-1))'
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                  
                  {exp.description.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(index)}
                      className="mt-3 h-auto p-2 text-xs hover:scale-105 transition-all duration-150"
                      style={{ 
                        color: 'hsl(var(--brand-1))',
                        ['--hover-bg' as any]: 'hsl(var(--brand-1) / 0.1)'
                      }}
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
                
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skill} 
                      className="skill-tag"
                      style={{
                        transitionDelay: `${skillIndex * 30}ms`
                      }}
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