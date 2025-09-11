import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import ParallaxSection from "@/components/ui/parallax-section";

export default function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    "Krishna",
    "an ML Enthusiast", 
    "a Full-Stack Developer",
    "a Problem Solver",
    "a CS Student @ ASU"
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(current.slice(0, currentText.length + 1));
        
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Floating elements */}
      <ParallaxSection speed={0.3} className="absolute top-20 left-10">
        <div className="w-4 h-4 bg-primary rounded-full animate-float opacity-60" />
      </ParallaxSection>
      <ParallaxSection speed={0.5} className="absolute top-40 right-20">
        <div className="w-6 h-6 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </ParallaxSection>
      <ParallaxSection speed={0.2} className="absolute bottom-40 left-20">
        <div className="w-3 h-3 bg-primary-glow rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </ParallaxSection>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-card border border-border rounded-full">
            <span className="text-primary font-medium">👋 Hello, I'm</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-glow">
            <span className="inline-block min-h-[1.2em]">
              {currentText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Machine Learning-focused software engineer passionate about building intelligent systems that deliver real-world value. 
            Currently pursuing B.S. Computer Science (Honors) at ASU with a 4.0 GPA, creating AI-powered solutions from LLM fine-tuning to full-stack applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="mailto:krishna311004@gmail.com">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </a>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open resume (PDF) in a new tab"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Resume
              </a>
            </Button>
          </div>
          
          <div className="flex justify-center gap-6">
            <a href="https://github.com/krishna31102004" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-full bg-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300 group">
              <Github className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a href="https://linkedin.com/in/krishna-balaji-53785a257" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-full bg-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300 group">
              <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a href="mailto:krishna311004@gmail.com" 
               className="p-3 rounded-full bg-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300 group">
              <Mail className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
