export const config = { runtime: "edge" };

/** Rough visitor location from Vercel's edge headers (no third party). */
export default function handler(req: Request) {
  const h = req.headers;
  const num = (k: string) => {
    const v = parseFloat(h.get(k) || "");
    // Round to ~10km so we never store a precise location.
    return Number.isFinite(v) ? Math.round(v * 10) / 10 : null;
  };
  return Response.json(
    {
      lat: num("x-vercel-ip-latitude"),
      lng: num("x-vercel-ip-longitude"),
      country: h.get("x-vercel-ip-country") || null,
      city: decodeURIComponent(h.get("x-vercel-ip-city") || "") || null,
    },
    { headers: { "cache-control": "no-store" } }
  );
}
