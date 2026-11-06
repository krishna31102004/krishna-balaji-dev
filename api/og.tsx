import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

/**
 * Social preview image: /api/og?title=Projects&subtitle=...
 * 1200x630, matches the site's dark look with a dot grid and accent glow.
 */
export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Krishna Balaji").slice(0, 60);
  const subtitle = (
    searchParams.get("subtitle") ||
    "Software engineer · backend systems, ML pipelines & reliable AI agents"
  ).slice(0, 120);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(37,71,232,0.45), transparent 45%), radial-gradient(rgba(255,255,255,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "100% 100%, 28px 28px",
          color: "#f5f5f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#2547e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            KB
          </div>
          <div style={{ fontSize: 26, color: "#a1a1aa" }}>krishnabalaji.dev</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 32, color: "#a1a1aa", maxWidth: 980 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", gap: 12, fontSize: 22, color: "#63636b" }}>
          <span>MCS @ UIUC</span>
          <span>·</span>
          <span>B.S. CS @ ASU</span>
          <span>·</span>
          <span style={{ color: "#60a5fa" }}>open to SWE internships</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
