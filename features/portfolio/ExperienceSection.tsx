import React from "react";
import {
  Briefcase,
  TrendingDown,
  Cpu,
  Calendar,
  Building2,
  CheckCircle2,
  ArrowUpRight,
  Download,
  Mail,
  Linkedin,
} from "lucide-react";

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
      "Standardized modular frontend architecture and reusable UI component systems across customer-facing web products, ensuring zero visual bloat and fast rendering.",
    deliverables: [
      "Architected and implemented 15+ reusable React components with strict TypeScript typings and clean props contracts.",
      "Accelerated UI development velocity and eliminated visual inconsistencies across mobile and desktop viewports.",
      "Enforced atomic CSS design tokens with Tailwind, reducing redundant bundle CSS across views.",
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
      "Engineered backend API endpoints and optimized database performance for internal business tools and enterprise client portals.",
    deliverables: [
      "Audited database queries, introduced compound MySQL indexing, and streamlined Eloquent ORM queries, achieving an estimated ~30% reduction in endpoint response times.",
      "Developed robust RESTful API endpoints in Laravel with strict request validation, error reporting, and sanitization.",
      "Collaborated with senior engineers on database schema migrations and secure data pipelines.",
    ],
    techStack: ["Laravel", "PHP", "MySQL", "REST APIs", "Eloquent ORM", "MVC"],
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <section
      id="EXPERIENCE"
      className="snap-section min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      <div className="w-full max-w-6xl 2xl:max-w-7xl flex flex-col justify-center">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Briefcase size={14} />
              <span>CAREER_HISTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              WORK <span className="text-cyan-400">EXPERIENCE</span>
            </h2>
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 sm:space-y-8 relative">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.company}
              className="group relative rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-6 sm:p-8 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.1)] transition-all duration-300"
            >
              {/* Top Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-white/5 text-neutral-300 border border-white/10">
                    0{index + 1} // {exp.type.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                    <Building2 size={13} className="text-cyan-400" />
                    <span className="text-white font-medium">{exp.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Metric Pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${exp.metricBadge.colorClass}`}
                  >
                    {exp.metricBadge.icon}
                    <span>{exp.metricBadge.value}</span>
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                    <Calendar size={13} />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Title & Role */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {exp.role}
              </h3>

              {/* Summary */}
              <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed mb-4">
                {exp.summary}
              </p>

              {/* Bullet Deliverables */}
              <div className="space-y-2 mb-5">
                {exp.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400 font-light">
                    <CheckCircle2
                      size={15}
                      className="text-cyan-400/80 shrink-0 mt-0.5 group-hover:text-cyan-400 transition-colors"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-neutral-500 mr-1">STACK:</span>
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-neutral-300 hover:border-cyan-400/40 hover:text-white transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
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
