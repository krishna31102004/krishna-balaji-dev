import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Portfolio context data
const portfolioContext = {
  "about": "Krishna Balaji (KB) — ML-focused software engineer. Ships end-to-end: data → models → FastAPI/Flask → React/SwiftUI. B.S. CS (Honors), ASU, 4.0 GPA.",
  "resume": "/Krishna_Balaji_Resume.pdf",
  "contact": "mailto:krishna311004@gmail.com",
  "projects": [
    {
      "name": "AI-Powered Job Matcher",
      "links": { "code":"https://github.com/krishna31102004/ai-job-matcher", "demo":"https://ai-job-matcher-beige.vercel.app" },
      "outcome": "<300ms API latency; switchable embeddings; FastAPI+React"
    },
    {
      "name": "Fake News Detection API",
      "links": { "code":"https://github.com/krishna31102004/fake-news-detection" },
      "outcome": "DistilBERT; 99%+ reported accuracy"
    },
    {
      "name": "Charity Donation Manager (iOS)",
      "links": { "code":"https://github.com/krishna31102004/charity-donation-manager" },
      "outcome": "SwiftUI; favorites, map discovery, dummy payments"
    }
  ]
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!openAIApiKey) {
      console.error('OPENAI_API_KEY not found in environment');
      return new Response(
        JSON.stringify({ reply: "Error. You can email me at mailto:krishna311004@gmail.com" }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const contextString = `
PORTFOLIO CONTEXT:
About: ${portfolioContext.about}
Resume: ${portfolioContext.resume}
Contact: ${portfolioContext.contact}
Projects:
${portfolioContext.projects.map(p => 
  `• ${p.name}: ${p.outcome}. Code: ${p.links.code}${p.links.demo ? `, Demo: ${p.links.demo}` : ""}`
).join('\n')}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are Ask KB, the assistant for krishnabalaji.dev. Be concise, recruiter-friendly, and only use the provided context. If unsure, say you don't know and offer mailto:krishna311004@gmail.com.

${contextString}`
          },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, await response.text());
      return new Response(
        JSON.stringify({ reply: "Error. You can email me at mailto:krishna311004@gmail.com" }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    console.log('Successfully generated response for message:', message);

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ask-kb function:', error);
    return new Response(
      JSON.stringify({ reply: "Error. You can email me at mailto:krishna311004@gmail.com" }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});