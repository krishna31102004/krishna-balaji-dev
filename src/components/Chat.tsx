"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "bot"; text: string };

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Message[]>([
    { role: "bot", text: "Hi, I'm Ask KB. Want my resume, top projects, or contact info?" }
  ]);
  const [loading, setLoading] = useState(false);

  const getAIResponse = async (message: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('ask-kb', {
        body: { message }
      });

      if (error) {
        console.error('Supabase function error:', error);
        return "Error. You can email me at mailto:krishna311004@gmail.com";
      }

      return data?.reply || "Error. You can email me at mailto:krishna311004@gmail.com";
    } catch (error) {
      console.error('Error calling ask-kb function:', error);
      return "Error. You can email me at mailto:krishna311004@gmail.com";
    }
  };

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    
    setMsgs(m => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await getAIResponse(q);
      setMsgs(m => [...m, { role: "bot", text: response }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMsgs(m => [...m, { role: "bot", text: "Error. You can email me at mailto:krishna311004@gmail.com" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 rounded-full w-12 h-12 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
        aria-label="Open chat"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>

      {open && (
        <Card className="fixed bottom-20 right-5 z-50 w-80 max-h-[70vh] bg-background border shadow-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 font-semibold border-b bg-muted/50">
            Ask KB
          </div>
          
          <div className="p-3 space-y-3 overflow-auto flex-1">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span 
                  className={
                    m.role === "user" 
                      ? "inline-block bg-primary text-primary-foreground px-3 py-2 rounded-xl max-w-[85%]" 
                      : "inline-block bg-muted px-3 py-2 rounded-xl max-w-[85%] whitespace-pre-line"
                  }
                >
                  {m.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <span className="inline-block bg-muted px-3 py-2 rounded-xl">
                  Typing...
                </span>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about resume, projects..."
              className="flex-1"
              aria-label="Chat input"
            />
            <Button onClick={send} size="sm">
              Send
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}