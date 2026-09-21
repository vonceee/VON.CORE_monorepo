import React from "react";
import { TrendingDown, Cpu, ArrowUpRight } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  metricBadge: {
    label: string;
    value: string;
    icon: React.ReactNode;
    colorClass: string;
  };
  summary: string;
  deliverables: string[];
  techStack: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Front-End Web Developer Intern",
    company: "Perksmania Marketing Corp",
    period: "Mar 2026 – May 2026",
    type: "Internship",
    metricBadge: {
      label: "SYSTEMS",
      value: "15+ UI Components",
      icon: <Cpu size={14} />,
      colorClass: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    },
    summary:
      "Engineered modular frontend architecture and reusable UI component systems across customer-facing web platforms, eliminating redundant styling and ensuring quality user interaction.",
    deliverables: [
      "Architected and maintained 15+ production-grade React components using strict TypeScript typings and clean props contracts.",
      "Standardized design tokens with Tailwind CSS, eliminating visual inconsistencies across viewport breakpoints.",
      "Collaborated with product teams to streamline component consumption and accelerate feature rollout.",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Design Systems", "Git"],
  },
  {
    role: "Full-Stack Web Developer Intern",
    company: "Hytec Power Inc.",
    period: "Nov 2025 – Feb 2026",
    type: "Internship",
    metricBadge: {
      label: "OPTIMIZATION",
      value: "~30% Query Latency Cut",
      icon: <TrendingDown size={14} />,
      colorClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    },
    summary:
      "Engineered scalable RESTful API endpoints and optimized relational database performance for internal business management systems and client portals.",
    deliverables: [
      "Audited relational queries and restructured Eloquent ORM queries to slash endpoint latency by ~30%.",
      "Developed secure, strictly validated RESTful API endpoints in Laravel with centralized exception handling and request sanitization.",
      "Collaborated with senior engineers on database schema migrations, relational integrity, and automated data pipelines.",
    ],
    techStack: ["Laravel", "PHP", "MySQL", "REST APIs", "Eloquent ORM", "MVC"],
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <section
      id="EXPERIENCE"
      className="snap-section min-h-screen w-full flex items-center justify-center relative overflow-hidden px-6 sm:px-10 lg:px-16 py-16 sm:py-24"
    >
      <div className="w-full max-w-5xl xl:max-w-6xl flex flex-col justify-center">
        {/* Section Indicator in Brittany Chiang Line Accent Style */}
        <div className="flex items-center gap-4 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-cyan-400 mb-6 sm:mb-8">
          <span className="w-12 sm:w-16 h-px bg-cyan-400 inline-block" />
          <span>EXPERIENCE</span>
        </div>

        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
            WORK <span className="text-cyan-400">EXPERIENCE</span>
          </h2>
        </div>

        {/* Brittany Chiang Style Hover Rows List */}
        <div className="group/list space-y-4 sm:space-y-6">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.company}
              className="group relative -mx-4 sm:-mx-6 p-5 sm:p-7 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-white/[0.03] hover:backdrop-blur-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-transparent hover:border-white/5 group-hover/list:opacity-50 hover:!opacity-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start">
                {/* Left Column: Date Range & Type */}
                <div className="md:col-span-3 pt-0.5">
                  <span className="text-xs font-medium tracking-wide uppercase text-white block">
                    {exp.period}
                  </span>
                </div>

                {/* Right Column: Role, Company, Metric, Narrative & Deliverables */}
                <div className="md:col-span-9 space-y-3 sm:space-y-4">
                  {/* Title Header with Arrow micro-interaction */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-default">
                      <span>{exp.role}</span>
                      <span className="text-neutral-500 font-normal">·</span>
                      <span className="text-neutral-300 group-hover:text-cyan-300 transition-colors">
                        {exp.company}
                      </span>
                    </h3>

                    {/* Metric Badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border shrink-0 ${exp.metricBadge.colorClass}`}
                    >
                      {exp.metricBadge.icon}
                      <span>{exp.metricBadge.value}</span>
                    </span>
                  </div>

                  {/* Narrative Summary */}
                  <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Deliverables */}
                  <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-400 font-light">
                    {exp.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <span className="text-cyan-400/70 select-none mt-0.5">*</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 hover:border-cyan-400/40 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ExperienceSection);
