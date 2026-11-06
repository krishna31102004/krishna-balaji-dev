import { VelocityMarquee } from "@/components/fx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { Icon } from "@iconify/react";

const CATEGORY_ICONS: Record<string, string> = {
  All: "lucide:layers",
  Languages: "lucide:code-2",
  Frontend: "lucide:layout",
  Backend: "lucide:server",
  Databases: "lucide:database",
  "DevOps & Cloud": "lucide:cloud",
  "AI": "lucide:sparkles",
};

const SKILL_ICONS: Record<string, string> = {
  Python: "logos:python",
  Java: "logos:java",
  "C++": "logos:c-plusplus",
  JavaScript: "logos:javascript",
  TypeScript: "logos:typescript-icon",
  SQL: "lucide:table",

  React: "logos:react",
  "Next.js": "logos:nextjs-icon",
  "HTML/CSS": "logos:html-5",

  "Node.js": "logos:nodejs-icon",
  "Express.js": "logos:express",
  FastAPI: "logos:fastapi-icon",
  Flask: "simple-icons:flask",
  "REST APIs": "lucide:braces",
  Playwright: "logos:playwright",

  PostgreSQL: "logos:postgresql",
  MongoDB: "logos:mongodb-icon",
  Redis: "logos:redis",
  pgvector: "lucide:database-zap",

  Docker: "logos:docker-icon",
  Linux: "logos:linux-tux",
  AWS: "logos:aws",
  GCP: "logos:google-cloud",
  Git: "logos:git-icon",
  "GitHub Actions": "logos:github-actions",

  LangChain: "simple-icons:langchain",
  LangGraph: "lucide:workflow",
  Pandas: "logos:pandas-icon",
  NumPy: "logos:numpy",
  "scikit-learn": "simple-icons:scikitlearn",
  XGBoost: "lucide:git-branch",
  LightGBM: "lucide:zap",
  Polars: "simple-icons:polars",
  PuLP: "lucide:sigma",
};

const skillCategories: Record<string, string[]> = {
  Languages: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL"],

  Frontend: ["React", "Next.js", "HTML/CSS"],

  Backend: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs", "Playwright"],

  Databases: ["PostgreSQL", "MongoDB", "Redis", "pgvector"],

  "DevOps & Cloud": ["Docker", "Linux", "AWS", "GCP", "Git", "GitHub Actions"],

  AI: ["LangChain", "LangGraph", "Pandas", "NumPy", "scikit-learn", "XGBoost", "LightGBM", "Polars", "PuLP"],
};

export function TechStack() {
  const [activeCategory, setActiveCategory] =
    useState<string>("All");

  if (!site.skills.length) return null;

  const categories = [
    "All",
    "Languages",
    "Frontend",
    "Backend",
    "Databases",
    "DevOps & Cloud",
    "AI",
  ];

  const filteredSkills =
    activeCategory === "All"
      ? site.skills
      : site.skills.filter((skill) =>
          skillCategories[activeCategory]?.includes(skill)
        );

  return (
    <div id="skills">
      <SectionHeader
        title="Tech Stack"
        aside={
          <span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">
            ( select tab to filter )
          </span>
        }
      />

      <Shell className="border-b border-[var(--line)] py-2">
        <VelocityMarquee items={site.skills.slice(0, Math.ceil(site.skills.length / 2))} />
        <VelocityMarquee items={site.skills.slice(Math.ceil(site.skills.length / 2))} reverse />
      </Shell>

      <Shell className="px-6 py-6 sm:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1">
          {categories.map((cat) => {
            const iconName =
              CATEGORY_ICONS[cat] || "lucide:layers";

            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium cursor-pointer"
              >
                {/* Sliding Active Pill */}
                {isActive && (
                  <motion.div
                    layoutId="active-category-pill"
                    className="absolute inset-0 rounded-md bg-[var(--fg)] shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}

                {/* Content */}
                <span
                  className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-[var(--bg)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  <Icon
                    icon={iconName}
                    width={14}
                    height={14}
                    className="size-3.5"
                  />

                  {cat}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skill Items Grid */}
        <motion.div
          layout
          className="mt-6 flex flex-wrap gap-2.5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const iconName =
                SKILL_ICONS[skill] || "lucide:code-2";

              return (
                <motion.span
                  key={skill}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="
                    flex
                    cursor-default
                    items-center
                    gap-2
                    rounded-md
                    border
                    border-[var(--line)]
                    bg-[var(--card)]
                    px-3
                    py-1.5
                    font-mono
                    text-[12px]
                    text-[var(--muted)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-[var(--fg)]
                    hover:bg-[var(--fg)]
                    hover:text-[var(--bg)]
                    shadow-xs
                    group
                  "
                >
                  <Icon
                    icon={iconName}
                    width={16}
                    height={16}
                    className="
                      size-4
                      shrink-0
                      transition-colors
                      group-hover:filter
                      group-hover:brightness-110
                    "
                  />

                  {skill}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Shell>
    </div>
  );
}

export default TechStack;