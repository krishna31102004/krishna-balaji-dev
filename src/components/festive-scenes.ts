/**
 * Canvas scenes for the festive themes. One loop, one canvas; each scene
 * owns its particles and reacts to the cursor and to clicks anywhere on
 * the page (listeners are passive, the canvas never blocks input).
 */

export type SceneKind = "christmas" | "diwali" | "halloween";

type Ctx = CanvasRenderingContext2D;

type Env = {
  w: number;
  h: number;
  t: number;
  mx: number;
  my: number;
  mvx: number;
  gutter: number; // width of each side margin next to the 760px column
};

interface Scene {
  intro(env: Env): void;
  click(env: Env, x: number, y: number): void;
  frame(ctx: Ctx, env: Env): void;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

/** Random x inside a side margin when there is room, else anywhere. */
const gutterX = (env: Env, pad = 30) =>
  env.gutter > 140
    ? Math.random() > 0.5
      ? rand(pad, env.gutter - pad)
      : rand(env.w - env.gutter + pad, env.w - pad)
    : rand(pad, env.w - pad);

/* ================================================================== */
/*  Christmas                                                         */
/* ================================================================== */

type Flake = { x: number; y: number; z: number; r: number; vy: number; ph: number; rot: number; vr: number };
type Glint = { x: number; y: number; vx: number; vy: number; life: number; max: number; c: string; r: number };

function christmas(): Scene {
  let flakes: Flake[] = [];
  let glints: Glint[] = [];
  let bokeh: { x: number; y: number; r: number; c: string; ph: number }[] = [];
  let sleigh: { x: number; y: number; dir: number } | null = null;
  let nextSleigh = 240;

  const newFlake = (env: Env, top = false): Flake => {
    const z = Math.random();
    return {
      x: rand(0, env.w),
      y: top ? rand(-40, -5) : rand(0, env.h),
      z,
      r: 0.6 + z * z * 3.4,
      vy: 0.25 + z * 1.4,
      ph: rand(0, Math.PI * 2),
      rot: rand(0, Math.PI),
      vr: rand(-0.01, 0.01),
    };
  };

  const crystal = (ctx: Ctx, f: Flake) => {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.rotate(f.rot);
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -f.r * 2);
      ctx.moveTo(0, -f.r * 1.2);
      ctx.lineTo(f.r * 0.5, -f.r * 1.6);
      ctx.moveTo(0, -f.r * 1.2);
      ctx.lineTo(-f.r * 0.5, -f.r * 1.6);
    }
    ctx.stroke();
    ctx.restore();
  };

  const burst = (x: number, y: number, n = 40) => {
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2);
      const s = rand(1, 4.5);
      glints.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1, life: 0, max: rand(40, 80), c: pick(["#ffffff", "#fde68a", "#fca5a5", "#bbf7d0"]), r: rand(1, 2.4) });
    }
  };

  return {
    intro(env) {
      flakes = Array.from({ length: Math.min(260, Math.round(env.w / 5)) }, () => newFlake(env));
      bokeh = Array.from({ length: 10 }, () => ({ x: gutterX(env), y: rand(0, env.h), r: rand(18, 46), c: pick(["239,68,68", "34,197,94", "250,204,21", "96,165,250"]), ph: rand(0, 6) }));
      // A flurry rushing in from the top on entry.
      for (let i = 0; i < 160; i++) flakes.push({ ...newFlake(env, true), vy: rand(2, 5), y: rand(-env.h * 0.6, 0) });
      nextSleigh = 90;
    },
    click(_env, x, y) {
      burst(x, y);
    },
    frame(ctx, env) {
      ctx.clearRect(0, 0, env.w, env.h);

      // Soft fairy-light bokeh in the margins.
      for (const b of bokeh) {
        b.y -= 0.12;
        if (b.y < -60) b.y = env.h + 60;
        const a = 0.08 + 0.06 * Math.sin(env.t * 0.02 + b.ph);
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(${b.c},${a * 2})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Snow: depth layers, wind from cursor movement, pushed by the cursor.
      const wind = env.mvx * 0.04;
      flakes = flakes.filter((f) => f.y < env.h + 20 || f.vy <= 1.7);
      for (const f of flakes) {
        f.vy += (0.25 + f.z * 1.4 - f.vy) * 0.02;
        f.x += Math.sin(env.t * 0.012 + f.ph) * (0.2 + f.z * 0.5) + wind * (0.3 + f.z);
        f.y += f.vy;
        f.rot += f.vr;
        const dx = f.x - env.mx;
        const dy = f.y - env.my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 8000) {
          const k = (1 - d2 / 8000) * 2.2;
          const d = Math.sqrt(d2) || 1;
          f.x += (dx / d) * k;
          f.y += (dy / d) * k;
        }
        if (f.y > env.h + 10) Object.assign(f, newFlake(env, true));
        if (f.x < -10) f.x = env.w + 10;
        if (f.x > env.w + 10) f.x = -10;

        // Quieter over the reading column.
        const inColumn = Math.abs(f.x - env.w / 2) < 380;
        if (f.r > 2.8 && !inColumn) {
          crystal(ctx, f);
        } else {
          ctx.globalAlpha = (0.35 + f.z * 0.6) * (inColumn ? 0.45 : 1);
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Santa's sleigh crossing the sky every so often, trailing gold dust.
      if (--nextSleigh <= 0 && !sleigh) {
        const dir = Math.random() > 0.5 ? 1 : -1;
        sleigh = { x: dir > 0 ? -220 : env.w + 220, y: rand(env.h * 0.12, env.h * 0.3), dir };
      }
      if (sleigh) {
        sleigh.x += 2.6 * sleigh.dir;
        const y = sleigh.y + Math.sin(sleigh.x * 0.01) * 18;
        ctx.save();
        ctx.translate(sleigh.x, y);
        ctx.scale(-sleigh.dir, 1);
        ctx.font = "26px serif";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(253,230,138,0.9)";
        ctx.shadowBlur = 14;
        ctx.fillText("🦌", -120, -6);
        ctx.fillText("🦌", -84, -2);
        ctx.fillText("🛷", -36, 6);
        ctx.fillText("🎅", -30, -6);
        ctx.restore();
        for (let i = 0; i < 3; i++) {
          glints.push({ x: sleigh.x - sleigh.dir * 10, y: y + 10, vx: rand(-0.4, 0.4) - sleigh.dir * 0.6, vy: rand(0.2, 1), life: 0, max: rand(40, 70), c: "#fde68a", r: rand(0.8, 1.8) });
        }
        if (sleigh.x < -260 || sleigh.x > env.w + 260) {
          sleigh = null;
          nextSleigh = rand(900, 1500);
        }
      }

      drawGlints(ctx, (glints = glints.filter((g) => g.life < g.max)), 0.04);
    },
  };
}

function drawGlints(ctx: Ctx, gs: Glint[], gravity: number) {
  for (const g of gs) {
    g.life++;
    g.x += g.vx;
    g.y += g.vy;
    g.vx *= 0.97;
    g.vy = g.vy * 0.97 + gravity;
    const a = 1 - g.life / g.max;
    ctx.globalAlpha = a * (0.7 + 0.3 * Math.sin(g.life * 0.6));
    ctx.fillStyle = g.c;
    ctx.shadowColor = g.c;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(g.x, g.y, g.r * (0.6 + a * 0.6), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}

/* ================================================================== */
/*  Diwali                                                            */
/* ================================================================== */

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number; r: number; drag: number; g: number; glitter: boolean; split?: boolean };
type Rocket = { x: number; y: number; vx: number; vy: number; ty: number; hue: number; type: string };

function diwali(): Scene {
  let sparks: Spark[] = [];
  let rockets: Rocket[] = [];
  let embers: { x: number; y: number; vy: number; ph: number; r: number }[] = [];
  let nextLaunch = 30;
  const HUES = [45, 30, 330, 285, 190, 140, 0];

  const launch = (env: Env, x = gutterX(env), ty = rand(env.h * 0.12, env.h * 0.42)) => {
    rockets.push({ x, y: env.h + 10, vx: rand(-0.6, 0.6), vy: -rand(9, 12), ty, hue: pick(HUES), type: pick(["peony", "willow", "ring", "crossette", "peony", "palm"]) });
  };

  const explode = (r: Rocket) => {
    const n = r.type === "ring" ? 60 : r.type === "palm" ? 9 : 90;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + rand(-0.05, 0.05);
      let s = r.type === "ring" ? 4.2 : rand(1.5, 5.5);
      if (r.type === "palm") s = rand(4, 6);
      const willow = r.type === "willow" || r.type === "palm";
      sparks.push({
        x: r.x, y: r.y,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s * (r.type === "ring" ? 0.45 : 1),
        life: 0, max: willow ? rand(110, 160) : rand(60, 95),
        hue: willow ? 42 : r.hue + rand(-12, 12),
        r: willow ? 1.6 : rand(1.4, 2.2),
        drag: willow ? 0.975 : 0.955, g: willow ? 0.035 : 0.05,
        glitter: Math.random() < 0.35, split: r.type === "crossette",
      });
    }
    // Flash at the centre.
    sparks.push({ x: r.x, y: r.y, vx: 0, vy: 0, life: 0, max: 10, hue: 50, r: 28, drag: 1, g: 0, glitter: false });
  };

  return {
    intro(env) {
      embers = Array.from({ length: 70 }, () => ({ x: rand(0, env.w), y: rand(0, env.h), vy: rand(0.3, 1), ph: rand(0, 6), r: rand(0.8, 2.2) }));
      // Opening volley.
      for (let i = 0; i < 5; i++) setTimeout(() => launch(env), i * 260);
    },
    click(env, x, y) {
      rockets.push({ x, y: env.h + 10, vx: 0, vy: -Math.sqrt(2 * 0.12 * (env.h - y)) , ty: y, hue: pick(HUES), type: pick(["peony", "crossette", "ring", "willow"]) });
    },
    frame(ctx, env) {
      // Fade instead of clear, so sparks leave trails (keeps transparency).
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, env.w, env.h);
      ctx.globalCompositeOperation = "lighter";

      if (--nextLaunch <= 0) {
        launch(env);
        if (Math.random() < 0.3) launch(env);
        nextLaunch = rand(50, 110);
      }

      // Rockets with a sputtering tail.
      rockets = rockets.filter((r) => {
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.12;
        ctx.fillStyle = `hsl(${r.hue} 100% 75%)`;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();
        sparks.push({ x: r.x, y: r.y + 4, vx: rand(-0.4, 0.4), vy: rand(0.5, 1.5), life: 0, max: rand(14, 24), hue: 38, r: 1.1, drag: 0.95, g: 0.02, glitter: false });
        if (r.vy >= -1 || r.y <= r.ty) {
          explode(r);
          return false;
        }
        return true;
      });

      // Cursor sparkler.
      if (env.mx > 0) {
        for (let i = 0; i < 2; i++) {
          const a = rand(0, Math.PI * 2);
          const s = rand(0.5, 2.6);
          sparks.push({ x: env.mx, y: env.my, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: rand(10, 22), hue: 45, r: 0.9, drag: 0.92, g: 0.04, glitter: false });
        }
      }

      const born: Spark[] = [];
      sparks = sparks.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.g;
        const a = 1 - p.life / p.max;
        if (p.split && p.life === 28) {
          for (let k = 0; k < 4; k++) {
            const ang = (k / 4) * Math.PI * 2 + Math.PI / 4;
            born.push({ ...p, vx: Math.cos(ang) * 2, vy: Math.sin(ang) * 2, life: 0, max: 40, split: false, r: 1.2 });
          }
          return false;
        }
        if (p.glitter && Math.random() < 0.5) return p.life < p.max;
        ctx.globalAlpha = Math.max(0, a);
        ctx.fillStyle = `hsl(${p.hue} 100% ${55 + a * 25}%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (p.max === 10 ? a : 0.5 + a * 0.6), 0, Math.PI * 2);
        ctx.fill();
        return p.life < p.max;
      });
      sparks.push(...born);

      // Rising embers.
      for (const e of embers) {
        e.y -= e.vy;
        e.x += Math.sin(env.t * 0.02 + e.ph) * 0.3;
        if (e.y < -10) {
          e.y = env.h + 10;
          e.x = rand(0, env.w);
        }
        ctx.globalAlpha = 0.25 + 0.25 * Math.sin(env.t * 0.08 + e.ph);
        ctx.fillStyle = "hsl(36 100% 60%)";
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    },
  };
}

/* ================================================================== */
/*  Halloween                                                         */
/* ================================================================== */

type Bat = { x: number; y: number; vx: number; vy: number; s: number; ph: number; swarm: boolean; life: number };
type Ghost = { x: number; y: number; ph: number; s: number; vy: number };

function halloween(): Scene {
  let bats: Bat[] = [];
  let ghosts: Ghost[] = [];
  let fog: { x: number; y: number; r: number; vx: number; c: string }[] = [];
  let eyes: { x: number; y: number; blink: number; next: number; s: number }[] = [];
  let flash = 0;
  let bolt: { x: number; y: number }[] | null = null;
  let nextBolt = 200;
  let nextGhost = 120;

  const newBat = (env: Env): Bat => {
    const left = Math.random() > 0.5;
    return { x: left ? -40 : env.w + 40, y: rand(env.h * 0.08, env.h * 0.55), vx: (left ? 1 : -1) * rand(1, 2.2), vy: 0, s: rand(8, 15), ph: rand(0, 6), swarm: false, life: 0 };
  };

  const swarm = (x: number, y: number, n: number) => {
    for (let i = 0; i < n; i++) {
      const a = rand(-Math.PI, 0);
      const sp = rand(3, 7);
      bats.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, s: rand(6, 12), ph: rand(0, 6), swarm: true, life: 0 });
    }
  };

  const makeBolt = (env: Env) => {
    const pts = [{ x: gutterX(env, 60), y: 0 }];
    while (pts[pts.length - 1].y < env.h * rand(0.45, 0.8)) {
      const p = pts[pts.length - 1];
      pts.push({ x: p.x + rand(-40, 40), y: p.y + rand(25, 60) });
    }
    return pts;
  };

  const drawBat = (ctx: Ctx, b: Bat, t: number) => {
    const flap = Math.sin(t * 0.3 + b.ph);
    const s = b.s;
    ctx.save();
    ctx.translate(b.x, b.y + (b.swarm ? 0 : Math.sin(t * 0.05 + b.ph) * 10));
    ctx.scale(b.vx > 0 ? 1 : -1, 1);
    ctx.fillStyle = "#07040b";
    ctx.shadowColor = "rgba(251,146,60,0.55)";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-s * 0.6, -s * 0.6 * flap - 2, -s * 1.7, -s * flap);
    ctx.quadraticCurveTo(-s * 1.4, -s * 0.2, -s * 1.2, s * 0.25);
    ctx.quadraticCurveTo(-s, 0, -s * 0.75, s * 0.3);
    ctx.quadraticCurveTo(-s * 0.5, 0.1, -s * 0.2, s * 0.4);
    ctx.lineTo(s * 0.2, s * 0.4);
    ctx.quadraticCurveTo(s * 0.5, 0.1, s * 0.75, s * 0.3);
    ctx.quadraticCurveTo(s, 0, s * 1.2, s * 0.25);
    ctx.quadraticCurveTo(s * 1.4, -s * 0.2, s * 1.7, -s * flap);
    ctx.quadraticCurveTo(s * 0.6, -s * 0.6 * flap - 2, 0, 0);
    ctx.fill();
    // Head with ears.
    ctx.beginPath();
    ctx.moveTo(-s * 0.3, -s * 0.05);
    ctx.lineTo(-s * 0.22, -s * 0.45);
    ctx.lineTo(-s * 0.08, -s * 0.2);
    ctx.lineTo(s * 0.08, -s * 0.2);
    ctx.lineTo(s * 0.22, -s * 0.45);
    ctx.lineTo(s * 0.3, -s * 0.05);
    ctx.arc(0, 0, s * 0.3, 0, Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#fb923c";
    ctx.fillRect(-s * 0.15, -s * 0.12, s * 0.08, s * 0.08);
    ctx.fillRect(s * 0.07, -s * 0.12, s * 0.08, s * 0.08);
    ctx.restore();
  };

  const drawGhost = (ctx: Ctx, g: Ghost, t: number) => {
    const s = g.s;
    const sway = Math.sin(t * 0.02 + g.ph) * 20;
    ctx.save();
    ctx.translate(g.x + sway, g.y);
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = "rgba(237,233,254,0.9)";
    ctx.shadowColor = "rgba(196,181,253,0.9)";
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(0, 0, s, Math.PI, 0);
    ctx.lineTo(s, s * 1.3);
    for (let i = 0; i <= 4; i++) {
      const x = s - (i * s * 2) / 4;
      ctx.quadraticCurveTo(x - s / 4, s * (1.3 + 0.25 * Math.sin(t * 0.15 + i)), x - s / 2, s * 1.3);
    }
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 0.85;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#1e1b2e";
    ctx.beginPath();
    ctx.ellipse(-s * 0.35, -s * 0.1, s * 0.14, s * 0.22, 0, 0, Math.PI * 2);
    ctx.ellipse(s * 0.35, -s * 0.1, s * 0.14, s * 0.22, 0, 0, Math.PI * 2);
    ctx.ellipse(0, s * 0.45, s * 0.16, s * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
  };

  return {
    intro(env) {
      bats = Array.from({ length: 7 }, () => newBat(env));
      fog = Array.from({ length: 14 }, () => ({ x: rand(0, env.w), y: env.h - rand(0, 120), r: rand(120, 260), vx: rand(-0.3, 0.3), c: pick(["147,51,234", "34,197,94", "124,58,237"]) }));
      eyes = Array.from({ length: env.gutter > 160 ? 4 : 0 }, () => ({ x: gutterX(env, 50), y: rand(env.h * 0.35, env.h * 0.85), blink: 0, next: rand(60, 300), s: rand(0.8, 1.3) }));
      flash = 1;
      bolt = makeBolt(env);
      swarm(env.w / 2, env.h * 0.6, 26);
    },
    click(_env, x, y) {
      swarm(x, y, 14);
    },
    frame(ctx, env) {
      ctx.clearRect(0, 0, env.w, env.h);

      // Low fog.
      for (const f of fog) {
        f.x += f.vx;
        if (f.x < -f.r) f.x = env.w + f.r;
        if (f.x > env.w + f.r) f.x = -f.r;
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
        g.addColorStop(0, `rgba(${f.c},0.14)`);
        g.addColorStop(1, `rgba(${f.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Eyes in the dark that follow the cursor and blink.
      for (const e of eyes) {
        if (--e.next <= 0) {
          e.blink = 8;
          e.next = rand(120, 400);
        }
        const open = e.blink > 0 ? Math.abs(e.blink-- - 4) / 4 : 1;
        const ang = Math.atan2(env.my - e.y, env.mx - e.x);
        for (const side of [-1, 1]) {
          const cx = e.x + side * 11 * e.s;
          ctx.fillStyle = "rgba(250,204,21,0.9)";
          ctx.shadowColor = "rgba(250,204,21,0.9)";
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.ellipse(cx, e.y, 6 * e.s, 4 * e.s * open, side * 0.15, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#000";
          ctx.beginPath();
          ctx.ellipse(cx + Math.cos(ang) * 2.5, e.y + Math.sin(ang) * 1.5 * open, 1.4 * e.s, 3.4 * e.s * open, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Ghosts drifting up through the margins.
      if (--nextGhost <= 0) {
        ghosts.push({ x: gutterX(env, 60), y: env.h + 60, ph: rand(0, 6), s: rand(16, 26), vy: rand(0.5, 1) });
        nextGhost = rand(260, 520);
      }
      ghosts = ghosts.filter((g) => {
        g.y -= g.vy;
        drawGhost(ctx, g, env.t);
        return g.y > -80;
      });

      // Bats.
      bats = bats.filter((b) => {
        b.life++;
        b.x += b.vx;
        b.y += b.vy;
        if (b.swarm) {
          b.vy += 0.02;
          b.vx *= 0.995;
        }
        drawBat(ctx, b, env.t);
        const out = b.x < -80 || b.x > env.w + 80 || b.y < -80;
        if (out && !b.swarm) Object.assign(b, newBat(env));
        return !(out && b.swarm) && b.life < 900;
      });

      // Lightning.
      if (--nextBolt <= 0) {
        flash = 1;
        bolt = makeBolt(env);
        nextBolt = rand(600, 1100);
      }
      if (flash > 0) {
        ctx.fillStyle = `rgba(216,180,254,${flash * 0.22})`;
        ctx.fillRect(0, 0, env.w, env.h);
        if (bolt) {
          ctx.strokeStyle = `rgba(255,255,255,${flash})`;
          ctx.shadowColor = "rgba(196,181,253,1)";
          ctx.shadowBlur = 20;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          bolt.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
        // Double-strike flicker, then fade.
        flash = flash > 0.6 && Math.random() < 0.3 ? 0.3 : flash - 0.05;
      }
    },
  };
}

/* ================================================================== */
/*  Runner                                                            */
/* ================================================================== */

export function runScene(canvas: HTMLCanvasElement, kind: SceneKind) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = kind === "christmas" ? christmas() : kind === "diwali" ? diwali() : halloween();
  const env: Env = { w: 0, h: 0, t: 0, mx: -9999, my: -9999, mvx: 0, gutter: 0 };
  let raf = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    env.w = window.innerWidth;
    env.h = window.innerHeight;
    env.gutter = Math.max(0, (env.w - 760) / 2);
    canvas.width = env.w * dpr;
    canvas.height = env.h * dpr;
    canvas.style.width = `${env.w}px`;
    canvas.style.height = `${env.h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const onMove = (e: PointerEvent) => {
    env.mvx = env.mvx * 0.8 + (e.clientX - (env.mx < 0 ? e.clientX : env.mx)) * 0.2;
    env.mx = e.clientX;
    env.my = e.clientY;
  };
  const onLeave = () => {
    env.mx = -9999;
    env.my = -9999;
  };
  const onDown = (e: PointerEvent) => scene.click(env, e.clientX, e.clientY);

  const loop = () => {
    env.t++;
    env.mvx *= 0.95;
    scene.frame(ctx, env);
    raf = requestAnimationFrame(loop);
  };

  resize();
  scene.intro(env);
  if (reduced) scene.frame(ctx, env);
  else loop();

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  document.addEventListener("pointerleave", onLeave);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    document.removeEventListener("pointerleave", onLeave);
  };
}
