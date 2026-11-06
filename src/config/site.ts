
export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  // Looping background video for the cover (mp4 or HLS .m3u8).
  video?: string;
  // "research" projects get a paper-style cover instead of an app window.
  kind?: "app" | "research";
  categories?: ("Frontend" | "Backend" | "Fullstack")[];
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb: string;
  url?: string;
};

export type FreelanceProject = {
  title: string;
  category: string;
  description: string;
  overview: string;
  responsibilities: string[];
  technologies: string[];
  fullStack: string[];
};

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export type OpenSourceContribution = {
  title: string;
  repo: string;
  prNumber: number;
  url: string;
  status: "Merged";
  description: string;
  technologies: string[];
};

export const site = {
  // =========================================================
  // PERSONAL INFORMATION
  // =========================================================

  name: "Krishna Balaji",

  firstName: "Krishna",

  url: "https://krishnabalaji.dev",

  quote: {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },

  profileImages: [
    "/profile.webp",
    "/profile2.webp",
  ],

  bannerImage: "/social-banner.gif",

  socialBannerImage: "/social-banner.gif",

  initials: "KB",

  role: "Software Engineer",

  location: "Champaign, IL",

  timezone: "America/Chicago",

  email: "krishna311004@gmail.com",

  // FormSubmit alias for the contact form (hides the raw address).
  formEndpoint: "https://formsubmit.co/ajax/2b1bd3f1467b7b0ec1f80a1f013c30d7",

  greeting: "Hey, I'm Krishna",

  tagline:
    "I build backend systems, ML pipelines, and AI agents that hold up in production.",

  // =========================================================
  // ABOUT
  // =========================================================

  about: [
    "I'm Krishna Balaji, a software engineer working across backend systems, machine learning, and AI agents. I'm starting my Master of Computer Science at the University of Illinois Urbana-Champaign after finishing a B.S. in Computer Science (Honors) at Arizona State University with a 4.00 GPA.",

    "I work mostly with Python, TypeScript, FastAPI, Node.js, PostgreSQL, Redis, and LangGraph, and I deploy on AWS, GCP, and Docker. I've shipped 41 REST endpoints for a sponsorship marketplace at Circle.ooo, built ML pipelines over 11M+ Fantasy Premier League records at ASU, and cut claim review time by 80% at Quantiphi.",

    "Lately I've been focused on making AI agents reliable: testing browser agents against real-world faults, and building incident-response agents that find the commit that broke production.",
  ],

  tldr: [
    "MCS @ UIUC, B.S. CS @ ASU (4.00).",
    "Building reliable AI agents.",
    "Shipping ML pipelines to production.",
    "Learning distributed systems.",
  ],

  // =========================================================
  // CURRENT STATUS
  // =========================================================

  status: {
    available: true,

    availableText: "open to software engineering internships",

    nowLearning:
      "Distributed Systems • Database Systems • Applied ML",

    nowBuilding:
      "Reliability tooling for AI agents",

    nowListening:
      "focus playlists",
  },

  // Calm first; the player starts on track one.
  playlist: [
    { title: "Sunflower", artist: "Post Malone, Swae Lee", src: "/assets/music/sunflower.mp3" },
    { title: "Night Changes", artist: "One Direction", src: "/assets/music/nightchanges.mp3" },
    { title: "Mountains", artist: "", src: "/assets/music/mountains.mp3" },
    { title: "Love Me", artist: "", src: "/assets/music/loveme.mp3" },
    { title: "Get Lucky", artist: "Daft Punk", src: "/assets/music/getLucky.mp3" },
    { title: "Blinding Lights", artist: "The Weeknd", src: "/assets/music/blindingLights.mp3" },
    { title: "The Less I Know the Better", artist: "Tame Impala", src: "/assets/music/TLITB.mp3" },
    { title: "DtMF", artist: "Bad Bunny", src: "/assets/music/dtmf.mp3" },
    { title: "Billie Jean", artist: "Michael Jackson", src: "/assets/music/billieJean.mp3" },
    { title: "Masakali", artist: "", src: "/assets/music/masakali.mp3" },
    { title: "Raghunath", artist: "", src: "/assets/music/raghunath.mp3" },
    { title: "MC Sher", artist: "", src: "/assets/music/mcsher.mp3" },
    { title: "Raftaar", artist: "", src: "/assets/music/raftaar.mp3" },
    { title: "Spider-Man", artist: "", src: "/assets/music/spiderMan.mp3" },
  ],

  // =========================================================
  // SOCIAL LINKS
  // =========================================================

  socials: {
    github:
      "https://github.com/krishna31102004",

    twitter:
      "",

    linkedin:
      "https://www.linkedin.com/in/krishnabalaji",

    email:
      "mailto:krishna311004@gmail.com",

    resume:
      "/resume.pdf",

    discord:
      "",

    medium:
      "",
  },

  // =========================================================
  // EXPERIENCE
  // =========================================================

  experience: [
    {
      company: "Circle.ooo",
      role: "Software Engineering Intern",
      period: "Sep 2025 – Apr 2026",
      blurb:
        "Implemented 41 REST API endpoints across 9 Node.js/Express route modules for a TypeScript sponsorship platform, covering marketplace, payment, and real-time messaging workflows. Designed a recommendation engine that scores host–sponsor compatibility across 6 weighted factors (industry overlap, budget fit, audience type) and surfaces ranked matches on both dashboards. Engineered sponsorship workflows across 9 relational tables for proposals, deadlines, messaging, and Stripe checkout.",
      url: "https://circle.ooo/",
    },
    {
      company: "Arizona State University",
      role: "Research Software Engineer Intern",
      period: "Sep 2025 – Apr 2026",
      blurb:
        "Engineered a Python ML pipeline over 106,881 player-gameweek observations across four Premier League seasons, using XGBoost and LightGBM with walk-forward validation for a 0.70 mean Spearman correlation. Validated a rank-based scoring signal across 11M+ Fantasy Premier League team selections that beat the crowd baseline by 0.96 points per gameweek. Built a PuLP mixed-integer optimizer for team selection that ranked in the top 0.9% on a blind 2024–25 holdout.",
      url: "https://www.asu.edu/",
    },
    {
      company: "Quantiphi",
      role: "Machine Learning Engineer Intern",
      period: "May 2025 – Aug 2025",
      blurb:
        "Developed Python ETL pipelines with Pydantic validation processing 50,000+ insurance claims a month, cutting manual review time by 80% through automated field extraction and anomaly flagging. Built document-extraction microservices on Gemini 1.5 Pro with structured outputs and confidence thresholding, raising accuracy from 72% to 90% across 10,000+ claims. Deployed them on GCP, helping cut claim approval cycle time by 25%.",
      url: "https://quantiphi.com/",
    },
  ] as Job[],

  // =========================================================
  // FREELANCE PROJECTS
  // =========================================================

  freelanceProjects: [] as FreelanceProject[],

  // =========================================================
  // PROJECTS
  // =========================================================

  projects: [
    {
      title: "BrowserProof",

      blurb:
        "A reliability testing platform for AI browser agents that injects 10 browser and network fault types and checks agents recover without taking the wrong external action.",

      story:
        "BrowserProof stress-tests browser agents against the failures they actually meet in the wild: ambiguous commits, stale DOM state, session expiry, and lost responses, across 10 browser and network fault types.\n\nEvery agent action is traced through its network requests down to the backend commit, so the platform can tell whether an agent recovered cleanly or quietly did something it shouldn't have, like submitting an order twice. Across 36 controlled scenarios it detected 90% of seeded failures.\n\nFailures don't stay one-off: each one is converted into a reproducible CI regression test, so a fixed agent stays fixed.",

      stack: [
        "Python",
        "Playwright",
        "TypeScript",
        "FastAPI",
        "PostgreSQL",
        "Docker",
        "GitHub Actions",
      ],

      year: "2026",

      links: {
        source: "https://github.com/krishna31102004/browser-proof",
      },

      featured: true,

      image: "/project-images/browserproof.webp",

      video: "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8",

      categories: ["Backend", "Fullstack"],
    },

    {
      title: "Glassbox SRE",

      blurb:
        "An autonomous incident-response agent that turns Prometheus alerts into Slack briefs naming the likely bad commit, the runbook, and the blast radius.",

      story:
        "Glassbox SRE takes a Prometheus alert and runs parallel LangGraph workflows for commit correlation, runbook retrieval, and impact analysis. A FastAPI service coordinates the work over Redis, stores results in PostgreSQL, and posts an incident brief to Slack.\n\nTo measure it honestly I built a replayable 15-scenario benchmark with same-service distractors, commits that look guilty but aren't. Glassbox picks the right commit first 86.7% of the time, versus 13.3% for deterministic heuristics, with 100% accuracy on runbook and impact classification.",

      stack: [
        "Python",
        "FastAPI",
        "LangGraph",
        "Redis",
        "PostgreSQL",
        "Prometheus",
        "Slack API",
        "Docker",
      ],

      year: "2026",

      links: {
        live: "https://ai-sre-new.vercel.app",
        source: "https://github.com/krishna31102004/ai-sre-new",
      },

      featured: true,

      image: "/project-images/glassbox-sre.webp",

      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_064556_051587f1-74a1-4336-8c05-4dde3594ed05.mp4",

      categories: ["Backend", "Fullstack"],
    },

    {
      title: "ATLAS",

      blurb:
        "A high-performance analytics engine for factor analytics and regime detection across 4,000+ stock tickers, with sub-200ms P99 latency.",

      story:
        "ATLAS serves factor analytics and market regime detection over 10-year windows for 4,000+ tickers. Async FastAPI endpoints with Redis caching keep P99 latency under 200ms, against a 1.4s Pandas baseline.\n\nUnderneath, Polars and Parquet ingestion pipelines handle 15M+ price data points with fault handling and market-aware caching, cutting backtest query time by 80% and making rolling cross-sectional regressions practical.",

      stack: [
        "Python",
        "FastAPI",
        "Redis",
        "Polars",
        "Parquet",
        "Pandas",
        "NumPy",
      ],

      year: "2026",

      links: {},

      featured: true,

      image: "/project-images/atlas.webp",

      video: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e71aea27-a808-4ae3-8231-a469d49285d4.mp4",

      categories: ["Backend"],
    },

    {
      title: "FPL Research Engine",

      blurb:
        "ML and optimization research on Fantasy Premier League: gradient-boosted forecasts plus a MILP team picker that ranked in the top 0.9% on a blind season.",

      story:
        "Built at Arizona State University. A Python pipeline processes 106,881 player-gameweek observations across four Premier League seasons, training XGBoost and LightGBM models with walk-forward validation to reach a 0.70 mean Spearman correlation.\n\nA rank-based scoring signal, validated across 11M+ historical team selections and four out-of-sample seasons, beats the crowd baseline by 0.96 points per gameweek. A PuLP mixed-integer program then picks the squad under budget and position constraints, finishing in the top 0.9% on a blind 2024–25 holdout.",

      stack: [
        "Python",
        "XGBoost",
        "LightGBM",
        "PuLP",
        "Pandas",
        "scikit-learn",
      ],

      year: "2026",

      links: {
        source: "https://github.com/krishna31102004/fpl-thesis",
      },

      featured: true,

      image: "/project-images/fpl.webp",

      kind: "research",

      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260723_145606_ab143199-b593-4941-bb1b-9afca215416b.mp4",

      categories: ["Backend"],
    },

    {
      title: "Pennywise AI",

      blurb:
        "A personal finance tracker that links Plaid accounts, syncs transactions, and surfaces runway, burn, and AI insights with natural-language questions.",

      story:
        "Pennywise AI is a production-ready Next.js app that links Plaid Sandbox accounts, securely syncs transactions and balances, and shows KPIs like runway, burn, and month-to-date spend with interactive charts.\n\nIt includes per-visitor sessions, a resilient refresh pipeline with optional webhooks, encrypted Plaid tokens, a natural-language \"Ask\" feature, AI insights, and idempotent six-month demo seeding. Deployed on Vercel.",

      stack: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Plaid API",
        "OpenAI API",
        "Vercel",
      ],

      year: "2025",

      links: {
        live: "https://pennywise-ai.vercel.app",
        source: "https://github.com/krishna31102004/pennywise-ai",
      },

      featured: false,

      image: "/project-images/pennywise-ai.webp",

      categories: ["Fullstack", "Frontend"],
    },

    {
      title: "AI Job Matcher",

      blurb:
        "Upload a resume and get ranked job matches with an explanation of why each role fits.",

      story:
        "AI Job Matcher parses a resume, embeds it, and ranks job listings by semantic fit, showing the reasoning behind each match so candidates know where they stand.",

      stack: [
        "React",
        "Python",
        "FastAPI",
        "OpenAI API",
        "Vercel",
      ],

      year: "2025",

      links: {
        live: "https://ai-job-matcher-beige.vercel.app",
        source: "https://github.com/krishna31102004/ai-job-matcher",
      },

      featured: false,

      image: "/project-images/ai-job-matcher.webp",

      categories: ["Fullstack", "Frontend"],
    },

    {
      title: "Charity Donation Manager",

      blurb:
        "A donation app with real-time location tracking and API-based charity recommendations.",

      story:
        "A donation app with real-time location tracking and API-based charity recommendations, with Firebase authentication and live data sync for the backend.",

      stack: [
        "JavaScript",
        "Firebase",
        "REST APIs",
      ],

      year: "2024",

      links: {
        source: "https://github.com/krishna31102004/charity-donation-manager",
      },

      featured: false,

      image: "/project-images/charity-donation-manager.webp",

      categories: ["Fullstack"],
    },
  ] as Project[],

  // =========================================================
  // SKILLS
  // =========================================================

  skills: [
    // Languages
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "TypeScript",
    "SQL",

    // Frontend
    "React",
    "Next.js",
    "HTML/CSS",

    // Backend
    "Node.js",
    "Express.js",
    "FastAPI",
    "Flask",
    "REST APIs",
    "Playwright",

    // Database
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "pgvector",

    // DevOps / Cloud
    "Docker",
    "Linux",
    "AWS",
    "GCP",
    "Git",
    "GitHub Actions",

    // AI / ML
    "LangChain",
    "LangGraph",
    "Pandas",
    "NumPy",
    "scikit-learn",
    "XGBoost",
    "LightGBM",
    "Polars",
    "PuLP",
  ],

  // =========================================================
  // WRITING
  // =========================================================

  writing: [] as Post[],

  // =========================================================
  // OPEN SOURCE
  // =========================================================

  openSourceContributions: [] as OpenSourceContribution[],

  // =========================================================
  // GITHUB
  // =========================================================

  github: {
    username: "krishna31102004",

    contributionsLastYear: "500+",
  },

  // =========================================================
  // FOOTER
  // =========================================================

  footerNote: "Built by Krishna Balaji",
} as const;

export type Site = typeof site;
