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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding">
      {/* Subtle aurora background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, hsl(var(--brand-1) / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, hsl(var(--brand-2) / 0.1) 0%, transparent 50%),
            hsl(var(--bg-0))
          `
        }}
      />
      
      {/* Floating elements with micro-motion */}
      <ParallaxSection speed={0.3} className="absolute top-20 left-10">
        <div 
          className="w-4 h-4 rounded-full opacity-60"
          style={{ 
            background: 'hsl(var(--brand-1))',
            animation: 'float 18s ease-in-out infinite'
          }} 
        />
      </ParallaxSection>
      <ParallaxSection speed={0.5} className="absolute top-40 right-20">
        <div 
          className="w-6 h-6 rounded-full"
          style={{ 
            background: 'hsl(var(--brand-1) / 0.4)',
            animation: 'float 20s ease-in-out infinite',
            animationDelay: '1s'
          }} 
        />
      </ParallaxSection>
      <ParallaxSection speed={0.2} className="absolute bottom-40 left-20">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ 
            background: 'hsl(var(--brand-2) / 0.6)',
            animation: 'float 22s ease-in-out infinite',
            animationDelay: '2s'
          }} 
        />
      </ParallaxSection>
      
      <div className="container mx-auto container-spacing relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border" 
               style={{ 
                 backgroundColor: 'hsl(var(--bg-1))',
                 borderColor: 'rgba(255, 255, 255, 0.06)'
               }}>
            <span style={{ color: 'hsl(var(--brand-1))' }} className="font-medium">👋 Hello, I'm</span>
          </div>
          
          <h1 className="font-bold mb-6 leading-tight"
              style={{ 
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            <span className="inline-block min-h-[1.2em]">
              {currentText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
             style={{ color: 'hsl(var(--text-1))' }}>
            Machine Learning-focused software engineer passionate about building intelligent systems that deliver real-world value. 
            Currently pursuing B.S. Computer Science (Honors) at ASU with a 4.0 GPA, creating AI-powered solutions from LLM fine-tuning to full-stack applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="mailto:krishna311004@gmail.com">
              <Button 
                size="lg" 
                variant="gradient"
                style={{ 
                  background: 'linear-gradient(90deg, #7C5CFF, #00E5FF)'
                }}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </a>
            <Button 
              asChild 
              variant="gradient-outline" 
              size="lg"
            >
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
               className="p-3 rounded-full border transition-all duration-200 group hover:scale-105"
               style={{ 
                 backgroundColor: 'hsl(var(--bg-1))',
                 borderColor: 'rgba(255, 255, 255, 0.06)'
               }}>
              <Github className="h-6 w-6 transition-colors group-hover:scale-105"
                      style={{ 
                        color: 'hsl(var(--text-2))',
                        ['--hover-color' as any]: 'hsl(var(--brand-1))'
                      }} 
                      onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--brand-1))'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--text-2))'}
              />
            </a>
            <a href="https://linkedin.com/in/krishna-balaji-53785a257" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-full border transition-all duration-200 group hover:scale-105"
               style={{ 
                 backgroundColor: 'hsl(var(--bg-1))',
                 borderColor: 'rgba(255, 255, 255, 0.06)'
               }}>
              <Linkedin className="h-6 w-6 transition-colors group-hover:scale-105"
                        style={{ 
                          color: 'hsl(var(--text-2))',
                          ['--hover-color' as any]: 'hsl(var(--brand-1))'
                        }} 
                        onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--brand-1))'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--text-2))'}
              />
            </a>
            <a href="mailto:krishna311004@gmail.com" 
               className="p-3 rounded-full border transition-all duration-200 group hover:scale-105"
               style={{ 
                 backgroundColor: 'hsl(var(--bg-1))',
                 borderColor: 'rgba(255, 255, 255, 0.06)'
               }}>
              <Mail className="h-6 w-6 transition-colors group-hover:scale-105"
                    style={{ 
                      color: 'hsl(var(--text-2))',
                      ['--hover-color' as any]: 'hsl(var(--brand-1))'
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--brand-1))'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--text-2))'}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
