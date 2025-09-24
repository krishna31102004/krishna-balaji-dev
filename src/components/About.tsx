import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, MapPin } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto container-spacing">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-6"
              style={{ 
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            About Me
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--text-1))' }}>
              I'm Krishna Balaji (KB), a <strong style={{ color: 'hsl(var(--brand-1))' }}>Machine Learning–focused</strong> software engineer passionate about building intelligent systems that deliver real-world value. My recent projects include <strong>AI-Powered Job Matcher</strong>, a platform combining FastAPI, React, and LLM embeddings to match candidates with roles; <strong>Pennywise AI</strong>, a <strong style={{ color: 'hsl(var(--brand-2))' }}>fintech</strong> dashboard that integrates Plaid APIs and AI-powered insights for smarter financial decisions; and <strong>Charity Donation Manager</strong>, an offline-first iOS app in <strong>SwiftUI</strong> that helps users discover charities with location-aware features.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--text-1))' }}>
              I'm pursuing a B.S. in Computer Science (Honors) at Arizona State University, where I maintain a <strong style={{ color: 'hsl(var(--brand-1))' }}>4.0 GPA</strong> and have been recognized on the Dean's List for six consecutive semesters. My work spans <strong>machine learning</strong>, full-stack development, and applied AI research, with experience ranging from <strong style={{ color: 'hsl(var(--brand-2))' }}>LLM</strong> fine-tuning to mobile app development.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--text-1))' }}>
              Beyond academics, I delivered a <strong style={{ color: 'hsl(var(--brand-1))' }}>TEDx Talk</strong> on{" "}
              <a 
                href="https://www.ted.com/talks/krishna_balaji_life_as_an_introvert" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline transition-colors hover:opacity-80 focus:opacity-80"
                style={{ color: 'hsl(var(--brand-1))' }}
              >
                <em>Life as an Introvert</em>
              </a>, and earned the International Award for Young People (Bronze). I love analyzing <strong style={{ color: 'hsl(var(--brand-2))' }}>FPL analytics</strong> and tinkering with side projects that often turn into surprisingly useful tools.
            </p>
          </div>
        </div>
        
        {/* Beyond Tech Section */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <Card className="experience-card text-center p-6">
            <div className="mb-4">
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'hsl(var(--brand-1) / 0.15)' }}>
                <span className="text-2xl">🎤</span>
              </div>
            </div>
            <h4 className="font-semibold mb-2" style={{ color: 'hsl(var(--text-1))' }}>TEDx Speaker</h4>
            <p className="text-sm" style={{ color: 'hsl(var(--text-2))' }}>
              Delivered a talk on identity and personal growth
            </p>
          </Card>
          
          <Card className="experience-card text-center p-6">
            <div className="mb-4">
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'hsl(var(--brand-2) / 0.15)' }}>
                <span className="text-2xl">⚽</span>
              </div>
            </div>
            <h4 className="font-semibold mb-2" style={{ color: 'hsl(var(--text-1))' }}>Sports Analytics</h4>
            <p className="text-sm" style={{ color: 'hsl(var(--text-2))' }}>
              FPL data analysis and predictive modeling
            </p>
          </Card>
          
          <Card className="experience-card text-center p-6">
            <div className="mb-4">
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'hsl(var(--brand-1) / 0.15)' }}>
                <span className="text-2xl">🏆</span>
              </div>
            </div>
            <h4 className="font-semibold mb-2" style={{ color: 'hsl(var(--text-1))' }}>Award Winner</h4>
            <p className="text-sm" style={{ color: 'hsl(var(--text-2))' }}>
              International Award for Young People (Bronze)
            </p>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <Card className="experience-card w-full max-w-2xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6" style={{ color: 'hsl(var(--text-1))' }}>Core Competencies</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3" style={{ color: 'hsl(var(--text-1))' }}>Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "Java", "Swift", "C++", "SQL"].map((lang) => (
                      <Badge key={lang} className="skill-tag">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3" style={{ color: 'hsl(var(--text-1))' }}>ML & AI</h4>
                  <div className="flex flex-wrap gap-2">
                    {["PyTorch", "Scikit-learn", "Hugging Face", "GPT-4", "LLMs", "NLP"].map((skill) => (
                      <Badge key={skill} className="skill-tag">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3" style={{ color: 'hsl(var(--text-1))' }}>Frameworks & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "Flask", "Firebase", "SwiftUI", "Docker", "AWS"].map((tool) => (
                      <Badge key={tool} className="skill-tag">
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