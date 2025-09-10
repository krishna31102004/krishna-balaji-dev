import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, MapPin } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            I'm Krishna Balaji (KB), a Machine Learning–focused software engineer passionate about building intelligent systems that deliver real-world value. My recent projects include AI-Powered Job Matcher, a platform combining FastAPI, React, and LLM embeddings to match candidates with roles; Pennywise AI, a fintech dashboard that integrates Plaid APIs and AI-powered insights for smarter financial decisions; and Charity Donation Manager, an offline-first iOS app in SwiftUI that helps users discover and support charities with location-aware features. These projects reflect my ability to work end-to-end, from ML models and APIs to secure deployments and user-friendly UIs.
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mt-6">
            I'm pursuing a B.S. in Computer Science (Honors) at Arizona State University, where I maintain a 4.0 GPA and have been recognized on the Dean's List for six consecutive semesters. My academic and project work spans machine learning, full-stack development, and applied AI research, with experience ranging from LLM fine-tuning to mobile app development. I'm especially excited about creating AI systems that combine technical depth with impact in fields like finance, health, and sustainability.
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mt-6">
            Beyond academics, I delivered a TEDx Talk on{" "}
            <a 
              href="https://www.ted.com/talks/krishna_balaji_life_as_an_introvert" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors underline"
            >
              <em>Life as an Introvert</em>
            </a>, sharing my perspective on identity and personal growth, and earned the International Award for Young People (Bronze) for leadership and service. Outside of tech, I love analyzing sports statistics and tinkering with side projects—often quirky tools that begin as experiments but end up being surprisingly useful. Looking ahead, I'm eager to collaborate on projects that bring together AI, data, and design to create scalable, meaningful systems.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Card className="bg-gradient-secondary border-border hover:shadow-elegant transition-all duration-300 w-full max-w-2xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Core Competencies</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "Java", "Swift", "C++", "SQL"].map((lang) => (
                      <Badge key={lang} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3 text-foreground">ML & AI</h4>
                  <div className="flex flex-wrap gap-2">
                    {["PyTorch", "Scikit-learn", "Hugging Face", "GPT-4", "LLMs", "NLP"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Frameworks & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "Flask", "Firebase", "SwiftUI", "Docker", "AWS"].map((tool) => (
                      <Badge key={tool} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}