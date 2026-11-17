import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function Experience({ isDetailed }: { isDetailed?: boolean }) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const isExperiencePage =
    isDetailed ?? location.pathname.startsWith("/experience");

  if (!site.experience.length) return null;

  const lastIndex = site.experience.length - 1;

  return (
    <div id="experience">
      <SectionHeader title="Experience" />

      <Shell>
        <ol aria-label="Work experience" className="px-6 py-7 sm:px-8 sm:py-8">
          {site.experience.map((job, i) => {
            const isFirst = i === 0;
            const isLast = i === lastIndex;

            return (
              <motion.li
                key={`${job.company}-${job.role}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="grid grid-cols-[13px_minmax(0,1fr)] gap-x-4 sm:gap-x-5"
              >
                <div aria-hidden="true" className="relative">
                  {lastIndex > 0 && (
                    <span
                      className={`absolute left-[6px] w-px bg-[var(--line)] ${
                        isFirst ? "top-3" : "top-0"
                      } ${isLast ? "h-3" : "bottom-0"}`}
                    />
                  )}
                  <span
                    className={`relative mt-[5px] block size-[13px] rounded-full border-[1.5px] ${
                      job.current
                        ? "experience-dot-current border-[var(--neon-color)] bg-[var(--neon-color)]"
                        : "border-[var(--soft)] bg-[var(--bg)]"
                    }`}
                  />
                </div>

                <div
                  className={`min-w-0 sm:flex sm:items-baseline sm:justify-between sm:gap-4 ${
                    isLast ? "" : "pb-7 sm:pb-8"
                  }`}
                >
                  <div className="min-w-0">
                    <h3 className="text-[15.5px] font-semibold leading-[23px] text-[var(--fg)]">
                      {job.role}
                    </h3>
                    <p className="mt-0.5 text-[13.5px] leading-snug text-[var(--muted)]">
                      {job.url ? (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/co inline-flex items-center gap-1 transition-colors duration-200 hover:text-[var(--fg)]"
                        >
                          {job.company}
                          <ArrowUpRight className="size-3 text-[var(--soft)] transition-transform duration-200 group-hover/co:-translate-y-0.5 group-hover/co:translate-x-0.5" />
                        </a>
                      ) : (
                        job.company
                      )}
                    </p>
                  </div>

                  <p className="mt-1.5 shrink-0 whitespace-nowrap font-mono text-[11px] text-[var(--soft)] sm:mt-0">
                    {job.period}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* =====================================================
            FREELANCE PROJECTS
            Only appears if you add actual freelance projects
            to site.ts.
        ====================================================== */}

        {site.freelanceProjects &&
          site.freelanceProjects.length > 0 && (
            <motion.div
              id="freelance"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-50px",
              }}
              transition={{
                duration: 0.4,
              }}
              className="border-t border-[var(--line)] px-6 py-7 sm:px-8"
            >
              <div className="mb-5">
                <h3 className="font-serif text-[20px] font-normal tracking-wide text-[var(--fg)] sm:text-[22px]">
                  Selected Freelance Work
                </h3>

                <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">
                  Real-world products and systems built for
                  clients and external engagements.
                </p>
              </div>

              <div
                className={
                  isExperiencePage
                    ? "flex flex-col gap-5 sm:gap-6"
                    : "grid grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2"
                }
              >
                {site.freelanceProjects.map(
                  (project) => (
                    <div
                      key={project.title}
                      className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 transition-all duration-300 hover:border-[var(--soft)] hover:shadow-md sm:p-6"
                    >
                      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                        <h3 className="text-[16.5px] font-semibold tracking-wide text-[var(--fg)] sm:text-[17.5px]">
                          {project.title}
                        </h3>

                        <span className="shrink-0 font-mono text-xs text-[var(--soft)]">
                          {project.category}
                        </span>
                      </div>

                      <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--muted)]">
                        {project.description}
                      </p>

                      <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                        {project.overview}
                      </p>

                      <div className="mt-3.5">
                        <span className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[var(--soft)]">
                          Key Responsibilities &
                          Deliverables
                        </span>

                        <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-[12.5px] text-[var(--muted)] sm:grid-cols-2">
                          {project.responsibilities.map(
                            (responsibility, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="mt-1 leading-none text-[var(--soft)]">
                                  •
                                </span>

                                <span>
                                  {responsibility}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--line)]/50 pt-3.5">
                        {project.technologies.map(
                          (technology) => (
                            <span
                              key={technology}
                              className="rounded border border-[var(--line)]/30 bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)]"
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          )}
      </Shell>
    </div>
  );
}

