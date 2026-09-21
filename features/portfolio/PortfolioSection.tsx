import React from "react";
import { PROJECTS, DesktopProject } from "./projectData";
import {
  CheckCircle2,
  FolderGit2,
  ExternalLink,
} from "lucide-react";

const PortfolioSection: React.FC = () => {
  return (
    <>
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 0.9; }
        }

        @keyframes border-spin {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }

        .card-bloom {
          position: absolute;
          inset: -8px;
          border-radius: 28px;
          background: radial-gradient(
            ellipse at 50% 50%,
            rgba(34, 211, 238, 0.14) 0%,
            rgba(99, 102, 241, 0.08) 45%,
            transparent 70%
          );
          filter: blur(16px);
          pointer-events: none;
          z-index: 0;
          animation: glow-pulse 4s ease-in-out infinite;
        }
      `}</style>

      <section
        id="PORTFOLIO"
        className="snap-section min-h-screen w-full flex flex-col justify-center items-center py-20 sm:py-28 relative select-none px-6 sm:px-10 lg:px-16"
      >
        <div className="w-full max-w-6xl xl:max-w-7xl mx-auto flex flex-col justify-center">
          {/* Section Indicator in Brittany Chiang Line Accent Style */}
          <div className="flex items-center gap-4 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-cyan-400 mb-4 sm:mb-6 px-2">
            <span className="w-12 sm:w-16 h-px bg-cyan-400 inline-block" />
            <span>PORTFOLIO</span>
          </div>

          {/* Section Header */}
          <div className="mb-12 sm:mb-16 px-2">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
              FEATURED <span className="text-cyan-400">PROJECTS</span>
            </h3>
          </div>

          {/* Alternating Feature Showcase Cards */}
          <div className="flex flex-col gap-16 sm:gap-24 w-full">
            {PROJECTS.map((project: DesktopProject, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  className="relative group transition-all duration-500 hover:border-cyan-500/30"
                >
                  {/* Subtle Ambient Bloom & Top Streak */}
                  <div className="card-bloom" />
                  
                  <div
                    className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Visual Media Column */}
                    <div
                      className={`lg:col-span-7 w-full ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/90 aspect-video shadow-2xl group-hover:border-cyan-400/40 transition-all duration-500">
                        {/* High-Resolution Screenshot */}
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center"
                        />

                        {/* Top Inner Rim Glow */}
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                      </div>
                    </div>

                    {/* Specs & Details Column */}
                    <div
                      className={`lg:col-span-5 flex flex-col justify-center space-y-6 ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      {/* Sub-Header: Index & Category */}
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-medium text-cyan-400">
                          0{index + 1}
                        </span>
                        <span className="text-neutral-600 text-xs">/</span>
                        <span className="text-xs font-semibold tracking-widest uppercase text-neutral-300">
                          {project.category}
                        </span>
                      </div>

                      {/* Project Title & Description */}
                      <div className="space-y-2">
                        <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                          {project.title}
                        </h4>
                        <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Key Features Checklist */}
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-widest text-cyan-400 font-medium">
                          Key Features
                        </span>
                        <div className="space-y-1.5">
                          {project.features.map((feature: string, i: number) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300"
                            >
                              <CheckCircle2
                                size={15}
                                className="text-cyan-400 shrink-0 mt-0.5"
                              />
                              <span className="leading-snug">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack & Platform Badges */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs text-neutral-500 mr-1">Stack:</span>
                          {project.techStack.map((tech: string) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Repository CTA Link */}
                      {project.githubUrl && (
                        <div className="pt-1">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 py-2.5 text-sm tracking-wider hover:underline cursor-pointer shadow-sm hover:shadow-cyan-500/10"
                          >
                            <span>View Project</span>
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(PortfolioSection);
