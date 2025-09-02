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
            I'm Krishna Balaji (KB), an ML-focused software engineer who loves turning ideas into intelligent systems that actually ship. I build end-to-end: training/evaluating models, serving robust APIs with FastAPI/Flask, and crafting clean UIs in React/SwiftUI. Recent work includes an AI-Powered Job Matcher, a Fake News Detection API (DistilBERT), and an iOS Charity Donation Manager. I'm pursuing a B.S. in Computer Science (Honors) at Arizona State University with a 4.0 GPA, and I'm seeking roles in <strong>Machine Learning Engineering / Applied AI / Full-Stack</strong> where I can own data, models, infra, and UX.
          </p>
          <div className="mt-6 max-w-4xl mx-auto">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Core:</span> Python, FastAPI/Flask, PyTorch, scikit-learn, Docker · 
              <span className="font-medium text-foreground">NLP/Embeddings:</span> DistilBERT, Sentence-Transformers, OpenAI · 
              <span className="font-medium text-foreground">Frontend:</span> React + Tailwind, SwiftUI · 
              <span className="font-medium text-foreground">DevOps:</span> Vercel, Render, GitHub Actions, Postgres/Firebase
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">My Journey</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I'm currently pursuing my <strong>B.S. in Computer Science (Honors)</strong> at <strong>Arizona State University</strong>, 
              maintaining a perfect <strong>4.0 GPA</strong> and earning a place on the <strong>Dean's List for 6 consecutive semesters</strong>. 
              My passion lies in building intelligent systems that blend AI, code, and purpose to solve real-world problems.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              With hands-on experience in <strong>machine learning, full-stack development, and AI research</strong>, 
              I've worked on projects ranging from <strong>LLM fine-tuning</strong> to <strong>mobile app development</strong>. 
              I love exploring the intersection of technology and impact.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Beyond academics, I delivered a <strong>TEDx Talk</strong> on{" "}
              <a 
                href="https://www.ted.com/talks/krishna_balaji_life_as_an_introvert" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                <em>Life as an Introvert</em>
              </a>, sharing my perspective on identity and personal growth. I'm also a recipient of the{" "}
              <strong>International Award for Young People (IAYP) – Bronze Award</strong>, which recognizes global leadership, resilience, and service.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed italic">
              Outside of tech, I enjoy <strong>analyzing cricket statistics</strong> and <strong>building quirky side tools</strong> that no one asks for—but everyone ends up using.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Education</h4>
                  <p className="text-sm text-muted-foreground">B.S. Computer Science (Hons), ASU</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Achievement</h4>
                  <p className="text-sm text-muted-foreground">4.0 GPA, Dean's List x6</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Location</h4>
                  <p className="text-sm text-muted-foreground">Tempe, Arizona</p>
                </div>
              </div>
            </div>
          </div>
          
          <Card className="bg-gradient-secondary border-border hover:shadow-elegant transition-all duration-300">
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