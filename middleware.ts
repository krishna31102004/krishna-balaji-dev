/**
 * Vercel Edge Middleware: crawlers don't run the SPA, so inject per-page
 * title / description / Open Graph tags into index.html for each route.
 */
export const config = {
  matcher: ["/", "/projects", "/experience", "/contact", "/experiments", "/experiments/:path*"],
};

const PAGES: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Krishna Balaji", subtitle: "Software engineer · backend systems, ML pipelines & reliable AI agents" },
  "/projects": { title: "Projects", subtitle: "BrowserProof, Glassbox SRE, ATLAS, FPL research and more" },
  "/experience": { title: "Experience", subtitle: "RailTEC · Circle.ooo · Arizona State University · Quantiphi" },
  "/contact": { title: "Get in touch", subtitle: "Open to software engineering internships" },
  "/experiments": { title: "Experiments", subtitle: "Small interactive things built for fun" },
  "/experiments/memory-box": { title: "Memory Box", subtitle: "A pinboard of photos and moments, built for fun" },
  "/experiments/vending-machine": { title: "Vending Machine", subtitle: "An interactive vending machine, built for fun" },
  "/experiments/404": { title: "404 Sign", subtitle: "A neon 404 sign you can poke, drag and swing" },
};

const NOT_FOUND = { title: "Page not found", subtitle: "That page doesn't exist. Head back to the home page." };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export default async function middleware(req: Request) {
  const url = new URL(req.url);
  // Unknown paths under /experiments/ are 404s; the matcher only lists known top-level routes.
  const page = PAGES[url.pathname] ?? (url.pathname.startsWith("/experiments/") ? NOT_FOUND : PAGES["/"]);

  const res = await fetch(new URL("/index.html", url));
  const html = await res.text();

  const title = page.title === "Krishna Balaji" ? "Krishna Balaji — Software Engineer" : `${page.title} — Krishna Balaji`;
  const image = `${url.origin}/api/og?title=${encodeURIComponent(page.title)}&subtitle=${encodeURIComponent(page.subtitle)}`;

  const tags = `
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${esc(url.origin + url.pathname)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(page.subtitle)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(page.subtitle)}" />
    <meta name="twitter:image" content="${esc(image)}" />`;

  const out = html
    .replace(/\s*<meta (?:property="og:|name="twitter:)[^>]*>/g, "")
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>${tags}`);

  return new Response(out, {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate" },
  });
}
