import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a great conversation about technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Get In Touch</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you're interested in collaborating on a project, discussing opportunities, 
              or just want to connect, I'd love to hear from you. Let's build something amazing together!
            </p>
            
            <div className="space-y-4">
              <a href="mailto:krishna311004@gmail.com" 
                 className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-glow transition-all duration-300 group">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Email</h4>
                  <p className="text-muted-foreground">krishna311004@gmail.com</p>
                </div>
              </a>
              
              <a href="tel:+14802341166" 
                 className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-glow transition-all duration-300 group">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Phone</h4>
                  <p className="text-muted-foreground">(480) 234-1166</p>
                </div>
              </a>
              
            </div>
          </div>
          
          <Card className="bg-gradient-secondary border-border">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Connect With Me</h3>
              
              <div className="space-y-4 mb-8">
                <a href="https://github.com/krishna31102004" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group">
                  <Github className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div>
                    <h4 className="font-medium text-foreground">GitHub</h4>
                    <p className="text-sm text-muted-foreground">Check out my code and projects</p>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/krishna-balaji-53785a257" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group">
                  <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div>
                    <h4 className="font-medium text-foreground">LinkedIn</h4>
                    <p className="text-sm text-muted-foreground">Let's connect professionally</p>
                  </div>
                </a>
              </div>
              
              <a href="mailto:krishna311004@gmail.com" className="w-full">
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
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