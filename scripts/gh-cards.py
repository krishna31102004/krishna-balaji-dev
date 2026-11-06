"""Generate the monochrome SVG cards used on the GitHub profile README.

Outputs to public/gh/. Fonts and the portrait are inlined as data URIs because
GitHub serves README images through a proxy that blocks external loads.
"""
import base64
import os
import io
from html import escape
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
import os
TOKYO = os.environ.get("THEME") == "tokyo"
OUT = ROOT / "public" / "gh" / ("t" if TOKYO else "")
OUT.mkdir(parents=True, exist_ok=True)

BG, FG, MUTED, SOFT, LINE = ("#1a1b27", "#70a5fd", "#a9b1d6", "#565f89", "#2a2e42") if os.environ.get("THEME") == "tokyo" else ("#0a0a0a", "#fafafa", "#a1a1aa", "#52525b", "#1f1f23")
MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"


def font(name, family, weight, style="normal"):
    data = base64.b64encode((ROOT / f"public/fonts/amiamie/otf/{name}.otf").read_bytes()).decode()
    return (f"@font-face{{font-family:'{family}';font-weight:{weight};font-style:{style};"
            f"src:url(data:font/otf;base64,{data}) format('opentype');}}")


FONTS = {
    "regular": font("Amiamie-Regular", "Ami", 400),
    "black": font("Amiamie-Black", "Ami", 900),
    "italic": font("Amiamie-LightItalic", "Ami", 300, "italic"),
}


def svg(w, h, body, fonts=("regular",), extra_css=""):
    css = "".join(FONTS[f] for f in fonts)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none">
<style>{css}
.sans{{font-family:'Ami',ui-sans-serif,-apple-system,Helvetica,sans-serif}}
.mono{{font-family:{MONO}}}
{extra_css}</style>
<defs>
  <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="{FG}" fill-opacity=".07"/></pattern>
  <radialGradient id="glow" cx="30%" cy="0%" r="90%"><stop offset="0" stop-color="{FG}" stop-opacity=".07"/><stop offset="1" stop-color="{FG}" stop-opacity="0"/></radialGradient>
</defs>
<rect x=".5" y=".5" width="{w-1}" height="{h-1}" rx="18" fill="{BG}" stroke="{LINE}"/>
<rect x=".5" y=".5" width="{w-1}" height="{h-1}" rx="18" fill="url(#dots)"/>
<rect x=".5" y=".5" width="{w-1}" height="{h-1}" rx="18" fill="url(#glow)"/>
{body}
</svg>"""


def wrap(text, width):
    lines, cur = [], ""
    for word in text.split():
        if len(cur) + len(word) + 1 > width:
            lines.append(cur)
            cur = word
        else:
            cur = f"{cur} {word}".strip()
    return lines + [cur]


def chips(items, x, y, max_w):
    out, cx = [], x
    for it in items:
        w = len(it) * 7.2 + 20
        if cx + w > x + max_w:
            break
        out.append(f'<rect x="{cx}" y="{y}" width="{w}" height="24" rx="12" fill="{FG}" fill-opacity=".04" stroke="{LINE}"/>'
                   f'<text x="{cx + w / 2}" y="{y + 16}" text-anchor="middle" class="mono" font-size="11.5" fill="{MUTED}">{escape(it)}</text>')
        cx += w + 8
    return "".join(out)


# ---------------------------------------------------------------- header
img = Image.open(ROOT / "public/profile.webp").convert("L").convert("RGB")
img = img.crop((img.width * 0.12, 0, img.width * 0.88, img.height * 0.92))
img.thumbnail((520, 520))
buf = io.BytesIO()
img.save(buf, "JPEG", quality=82)
portrait = base64.b64encode(buf.getvalue()).decode()
pw, ph = img.size
scale = 380 / ph
pw, ph = pw * scale, 380

W, H = 1200, 440
header = svg(W, H, f"""
<defs>
  <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="{BG}"/><stop offset=".35" stop-color="{BG}" stop-opacity="0"/></linearGradient>
  <linearGradient id="fadeb" y1="0" y2="1" x1="0" x2="0"><stop offset=".7" stop-color="{BG}" stop-opacity="0"/><stop offset="1" stop-color="{BG}"/></linearGradient>
  <clipPath id="clip"><rect x=".5" y=".5" width="{W-1}" height="{H-1}" rx="18"/></clipPath>
</defs>
<g clip-path="url(#clip)">
  <image class="por" href="data:image/jpeg;base64,{portrait}" x="{W - pw - 20}" y="{H - ph}" width="{pw}" height="{ph}"/>
  <rect x="{W - pw - 20}" y="0" width="{pw + 20}" height="{H}" fill="url(#fade)"/>
  <rect x="{W - pw - 20}" y="0" width="{pw + 20}" height="{H}" fill="url(#fadeb)"/>
</g>
<g class="up" style="animation-delay:.05s">
  <text x="64" y="86" class="mono" font-size="13" letter-spacing="2" fill="{SOFT}">~/KRISHNA — SOFTWARE ENGINEER</text>
</g>
<g class="up" style="animation-delay:.2s">
  <text x="60" y="190" class="sans" font-weight="900" font-size="92" letter-spacing="-3" fill="{FG}">Krishna</text>
  <text x="60" y="280" class="sans" font-weight="900" font-size="92" letter-spacing="-3" fill="{FG}">Balaji<tspan fill="{SOFT}">.</tspan></text>
</g>
<g class="up" style="animation-delay:.4s">
  <text x="64" y="330" class="sans" font-style="italic" font-weight="300" font-size="22" fill="{MUTED}">I build backend systems, ML pipelines and AI agents</text>
  <text x="64" y="358" class="sans" font-style="italic" font-weight="300" font-size="22" fill="{MUTED}">that hold up in production.</text>
</g>
<g class="up" style="animation-delay:.6s">
  <circle class="pulse" cx="70" cy="395" r="4" fill="{FG}"/>
  <text x="84" y="400" class="mono" font-size="12.5" fill="{SOFT}">CHAMPAIGN, IL  ·  MCS @ UIUC  ·  B.S. CS @ ASU</text>
</g>
""", fonts=("black", "italic"), extra_css=f"""
.up{{opacity:0;animation:up .9s cubic-bezier(.2,.7,.2,1) forwards}}
@keyframes up{{from{{opacity:0;transform:translateY(14px)}}to{{opacity:1;transform:none}}}}
.por{{mix-blend-mode:lighten;opacity:0;animation:fade 1.6s .3s ease forwards}}
@keyframes fade{{to{{opacity:.95}}}}
.pulse{{animation:p 2.4s ease-in-out infinite}}
@keyframes p{{50%{{opacity:.2}}}}
""")
(OUT / "header.svg").write_text(header)

# ---------------------------------------------------------------- section titles
def section(num, title, w=1200):
    body = (f'<text x="0" y="34" class="mono" font-size="13" letter-spacing="2" fill="{SOFT}">{num}</text>'
            f'<text x="44" y="36" class="sans" font-weight="900" font-size="30" letter-spacing="-.5" fill="{FG}">{escape(title)}</text>'
            f'<line x1="{60 + len(title) * 17}" y1="26" x2="{w}" y2="26" stroke="{LINE}"/>')
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="52" viewBox="0 0 {w} 52"><style>{FONTS['black']}
.sans{{font-family:'Ami',ui-sans-serif,-apple-system,Helvetica,sans-serif}}.mono{{font-family:{MONO}}}</style>{body}</svg>"""


for i, t in enumerate(["About", "Selected work", "Experience", "Toolbox", "Activity"], 1):
    (OUT / f"s{i}.svg").write_text(section(f"0{i}", t))

# ---------------------------------------------------------------- about
about_lines = [
    ("role", "Software Engineer"),
    ("now", "MCS @ University of Illinois Urbana-Champaign"),
    ("before", "B.S. Computer Science @ Arizona State — 4.00 GPA"),
    ("focus", "backend systems · ML pipelines · AI agents"),
    ("open to", "SWE / ML engineering roles, 2026"),
    ("off-hours", "Fantasy Premier League, treated as a research problem"),
]
rows = "".join(
    f'<text x="48" y="{78 + i * 40}" class="mono" font-size="13" letter-spacing="1" fill="{SOFT}">{k.upper()}</text>'
    f'<text x="200" y="{78 + i * 40}" class="sans" font-size="19" fill="{FG}">{escape(v)}</text>'
    f'<line x1="48" y1="{92 + i * 40}" x2="1152" y2="{92 + i * 40}" stroke="{LINE}"/>'
    for i, (k, v) in enumerate(about_lines))
(OUT / "about.svg").write_text(svg(1200, 330, rows))

# ---------------------------------------------------------------- projects
projects = [
    ("BrowserProof", "2026", "Reliability testing for AI browser agents. Injects 10 browser and network fault types and checks agents recover without taking the wrong external action.", ["Python", "Playwright", "TypeScript", "FastAPI", "Postgres"]),
    ("Glassbox SRE", "2026", "Autonomous incident-response agent that turns Prometheus alerts into Slack briefs naming the likely bad commit, the runbook and the blast radius.", ["Python", "LangGraph", "FastAPI", "Redis", "Prometheus"]),
    ("ATLAS", "2026", "High-performance analytics engine for factor analytics and regime detection across 4,000+ tickers, with sub-200ms P99 latency.", ["Python", "FastAPI", "Redis", "Polars", "Parquet"]),
    ("FPL Research", "2026", "Research paper. Gradient-boosted forecasts plus a MILP team picker that ranked in the top 0.9% on a blind 2024–25 season.", ["XGBoost", "LightGBM", "PuLP", "scikit-learn"]),
]
for i, (title, year, blurb, stack) in enumerate(projects, 1):
    lines = "".join(f'<text x="36" y="{132 + j * 24}" class="sans" font-size="16" fill="{MUTED}">{escape(l)}</text>'
                    for j, l in enumerate(wrap(blurb, 58)))
    body = (f'<text x="36" y="52" class="mono" font-size="12" letter-spacing="2" fill="{SOFT}">0{i} / {year}</text>'
            f'<text x="550" y="52" text-anchor="end" class="mono" font-size="16" fill="{SOFT}">↗</text>'
            f'<text x="36" y="96" class="sans" font-weight="900" font-size="32" letter-spacing="-.8" fill="{FG}">{escape(title)}</text>'
            + lines + chips(stack, 36, 236, 520))
    (OUT / f"p{i}.svg").write_text(svg(586, 290, body, fonts=("regular", "black")))

# ---------------------------------------------------------------- experience
jobs = [
    ("Circle.ooo", "Software Engineering Intern", "Sep 2025 — Apr 2026", "41 REST endpoints, sponsor recommendation engine, Stripe flows"),
    ("Arizona State University", "Research Software Engineer Intern", "Sep 2025 — Apr 2026", "ML pipeline on 106k observations, top 0.9% MILP optimizer"),
    ("Quantiphi", "Machine Learning Engineer Intern", "May 2025 — Aug 2025", "Gemini extraction on 50k claims/mo, accuracy 72% → 90%"),
]
rows = ""
for i, (co, role, when, note) in enumerate(jobs):
    y = 56 + i * 96
    rows += (f'<circle cx="56" cy="{y + 2}" r="5" fill="{BG}" stroke="{FG}" stroke-width="1.5"/>'
             f'<text x="84" y="{y + 8}" class="sans" font-weight="900" font-size="22" fill="{FG}">{escape(co)}</text>'
             f'<text x="1152" y="{y + 8}" text-anchor="end" class="mono" font-size="12.5" fill="{SOFT}">{when.upper()}</text>'
             f'<text x="84" y="{y + 36}" class="sans" font-size="16" fill="{MUTED}">{escape(role)}</text>'
             f'<text x="84" y="{y + 60}" class="mono" font-size="12.5" fill="{SOFT}">{escape(note)}</text>')
rows = f'<line x1="56" y1="58" x2="56" y2="250" stroke="{LINE}" stroke-width="1.5"/>' + rows
(OUT / "experience.svg").write_text(svg(1200, 330, rows, fonts=("regular", "black")))

# ---------------------------------------------------------------- toolbox
groups = [
    ("LANGUAGES", ["Python", "TypeScript", "Java", "C++", "Swift", "SQL"]),
    ("BACKEND", ["FastAPI", "Node.js", "Express", "Next.js", "React", "LangGraph"]),
    ("DATA / ML", ["PyTorch", "XGBoost", "LightGBM", "scikit-learn", "Polars", "PuLP"]),
    ("INFRA", ["Postgres", "Redis", "Docker", "GCP", "AWS", "Prometheus", "Vercel"]),
]
rows = "".join(
    f'<text x="48" y="{70 + i * 52}" class="mono" font-size="12.5" letter-spacing="2" fill="{SOFT}">{g}</text>'
    + chips(items, 220, 52 + i * 52, 930)
    for i, (g, items) in enumerate(groups))
(OUT / "toolbox.svg").write_text(svg(1200, 260, rows))

# ---------------------------------------------------------------- footer
foot = (f'<text x="600" y="78" text-anchor="middle" class="sans" font-style="italic" font-weight="300" font-size="26" fill="{MUTED}">Thanks for stopping by.</text>'
        f'<text x="600" y="116" text-anchor="middle" class="mono" font-size="13" letter-spacing="2" fill="{SOFT}">KRISHNABALAJI.DEV  ·  KRISHNA311004@GMAIL.COM</text>')
(OUT / "footer.svg").write_text(svg(1200, 170, foot, fonts=("italic",)))

print("wrote", sorted(p.name for p in OUT.iterdir()))
