import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'hsl(var(--bg-0))' }}>
      <div className="container mx-auto container-spacing">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-6"
              style={{ 
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            Let's Connect
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'hsl(var(--text-1))' }}>
            I'm always open to discussing new opportunities, collaborations, or just having a great conversation about technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6" style={{ color: 'hsl(var(--text-1))' }}>Get In Touch</h3>
            <p className="mb-8 leading-relaxed" style={{ color: 'hsl(var(--text-1))' }}>
              Whether you're interested in collaborating on a project, discussing opportunities, 
              or just want to connect, I'd love to hear from you. Let's build something amazing together!
            </p>
            
            <div className="space-y-4">
              <a href="mailto:krishna311004@gmail.com" 
                 className="flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 group hover:scale-[1.02]"
                 style={{ 
                   backgroundColor: 'hsl(var(--bg-1))',
                   borderColor: 'rgba(255, 255, 255, 0.06)'
                 }}>
                <div className="p-3 rounded-lg transition-colors"
                     style={{ 
                       backgroundColor: 'hsl(var(--brand-1) / 0.15)',
                       ['--group-hover-bg' as any]: 'hsl(var(--brand-1) / 0.25)'
                     }}>
                  <Mail className="h-6 w-6" style={{ color: 'hsl(var(--brand-1))' }} />
                </div>
                <div>
                  <h4 className="font-medium" style={{ color: 'hsl(var(--text-1))' }}>Email</h4>
                  <p style={{ color: 'hsl(var(--text-2))' }}>krishna311004@gmail.com</p>
                </div>
              </a>
              
              <a href="tel:+14802341166" 
                 className="flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 group hover:scale-[1.02]"
                 style={{ 
                   backgroundColor: 'hsl(var(--bg-1))',
                   borderColor: 'rgba(255, 255, 255, 0.06)'
                 }}>
                <div className="p-3 rounded-lg transition-colors"
                     style={{ 
                       backgroundColor: 'hsl(var(--brand-2) / 0.15)',
                       ['--group-hover-bg' as any]: 'hsl(var(--brand-2) / 0.25)'
                     }}>
                  <Phone className="h-6 w-6" style={{ color: 'hsl(var(--brand-2))' }} />
                </div>
                <div>
                  <h4 className="font-medium" style={{ color: 'hsl(var(--text-1))' }}>Phone</h4>
                  <p style={{ color: 'hsl(var(--text-2))' }}>(480) 234-1166</p>
                </div>
              </a>
            </div>
          </div>
          
          <Card className="experience-card">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6" style={{ color: 'hsl(var(--text-1))' }}>Connect With Me</h3>
              
              <div className="space-y-4 mb-8">
                <a href="https://github.com/krishna31102004" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-4 p-4 rounded-lg transition-colors group"
                   style={{ ['--hover-bg' as any]: 'hsl(var(--brand-1) / 0.05)' }}>
                  <Github className="h-6 w-6 transition-colors" 
                          style={{ 
                            color: 'hsl(var(--text-2))',
                            ['--hover-color' as any]: 'hsl(var(--brand-1))'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--brand-1))'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--text-2))'}
                  />
                  <div>
                    <h4 className="font-medium" style={{ color: 'hsl(var(--text-1))' }}>GitHub</h4>
                    <p className="text-sm" style={{ color: 'hsl(var(--text-2))' }}>Check out my code and projects</p>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/krishna-balaji-53785a257" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-4 p-4 rounded-lg transition-colors group"
                   style={{ ['--hover-bg' as any]: 'hsl(var(--brand-1) / 0.05)' }}>
                  <Linkedin className="h-6 w-6 transition-colors" 
                            style={{ 
                              color: 'hsl(var(--text-2))',
                              ['--hover-color' as any]: 'hsl(var(--brand-1))'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--brand-1))'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--text-2))'}
                  />
                  <div>
                    <h4 className="font-medium" style={{ color: 'hsl(var(--text-1))' }}>LinkedIn</h4>
                    <p className="text-sm" style={{ color: 'hsl(var(--text-2))' }}>Let's connect professionally</p>
                  </div>
                </a>
              </div>
              
              <a href="mailto:krishna311004@gmail.com" className="w-full">
                <Button 
                  variant="gradient"
                  className="w-full"
                  style={{ 
                    background: 'linear-gradient(90deg, #7C5CFF, #00E5FF)'
                  }}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}