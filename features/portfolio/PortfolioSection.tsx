import React, { useRef, useState, useEffect } from "react";
import { PROJECTS, DesktopProject } from "./projectData";
import { ChevronLeft, ChevronRight, Layers, ArrowUpRight } from "lucide-react";
import { ProjectDetailModal } from "./ProjectDetailModal";

const PortfolioSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<DesktopProject | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const ratiosRef = useRef<{ [key: number]: number }>({});

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll("[data-card-index]");

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const distanceFromEnd = scrollWidth - clientWidth - scrollLeft;

      if (distanceFromEnd < 8) {
        setActiveIndex((prev) => (prev === PROJECTS.length - 1 ? prev : PROJECTS.length - 1));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.cardIndex);
          ratiosRef.current[index] = entry.intersectionRatio;
        });

        const { scrollLeft, scrollWidth, clientWidth } = container;
        if (scrollWidth - clientWidth - scrollLeft < 8) return;

        let maxRatio = 0;
        let maxIndex = 0;

        Object.entries(ratiosRef.current).forEach(([indexStr, ratio]) => {
          const currentRatio = ratio as number;
          if (currentRatio > maxRatio) {
            maxRatio = currentRatio;
            maxIndex = Number(indexStr);
          }
        });

        setActiveIndex((prev) => (prev === maxIndex ? prev : maxIndex));
      },
      {
        root: container,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    cards.forEach((card) => observer.observe(card));
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <>
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        @keyframes border-spin {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }

        .card-active-glow {
          position: relative;
        }

        .card-active-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 18px;
          padding: 2px;
          background: conic-gradient(
            from var(--angle),
            transparent 0%,
            rgba(34, 211, 238, 0.2) 20%,
            rgba(99, 102, 241, 0.8) 40%,
            rgba(168, 85, 247, 0.9) 55%,
            rgba(34, 211, 238, 1)   70%,
            rgba(99, 102, 241, 0.4) 85%,
            transparent 100%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation:
            border-spin 4s linear infinite,
            glow-pulse 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 10;
        }

        .card-bloom {
          position: absolute;
          inset: -8px;
          border-radius: 24px;
          background: radial-gradient(
            ellipse at 50% 50%,
            rgba(34, 211, 238, 0.18) 0%,
            rgba(99, 102, 241, 0.12) 45%,
            transparent 70%
          );
          filter: blur(12px);
          pointer-events: none;
          z-index: 0;
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .card-top-streak {
          position: absolute;
          top: 0;
          left: 15%;
          right: 15%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(34, 211, 238, 0.9),
            rgba(168, 85, 247, 0.8),
            transparent
          );
          filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.8));
          pointer-events: none;
          z-index: 12;
        }
      `}</style>

      <section
        id="PORTFOLIO"
        className="snap-section min-h-screen w-full flex flex-col justify-center items-center py-20 relative select-none"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center h-full px-4 md:px-8">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 px-4 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
                <Layers size={14} />
                <span>Featured Desktop Software & Systems</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                DESKTOP APPS & <span className="text-cyan-400">TOOLS</span>
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              [ {activeIndex + 1} / {PROJECTS.length} ]
            </span>
          </div>

          {/* Cards Carousel */}
          <div
            ref={scrollContainerRef}
            data-lenis-prevent
            className="w-full overflow-x-auto p-6 sm:p-10 hide-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            <div className="flex gap-6 lg:gap-8 w-max">
              {PROJECTS.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={project.id}
                    data-card-index={index}
                    className="snap-center shrink-0 w-[80vw] sm:w-[55vw] lg:w-[45vw]"
                  >
                    <div className="relative">
                      {/* Bloom behind card */}
                      {isActive && <div className="card-bloom" />}

                      {/* Card shell */}
                      <div
                        onClick={() => setSelectedProject(project)}
                        className={`
                          group/card relative overflow-hidden w-full h-[40vh] sm:h-[45vh] cursor-pointer rounded-2xl
                          transition-all duration-700
                          ${
                            isActive
                              ? [
                                  "card-active-glow",
                                  "opacity-100",
                                  "shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_0_20px_0px_rgba(34,211,238,0.2),0_0_60px_-10px_rgba(99,102,241,0.3),0_0_100px_-20px_rgba(34,211,238,0.15)]",
                                ].join(" ")
                              : "opacity-45 hover:opacity-75 border border-white/5 hover:border-white/10 transition-opacity duration-500"
                          }
                        `}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover object-top group-hover/card:scale-105 transition-all duration-700 ease-out"
                        />

                        {/* Top-edge light streak on active */}
                        {isActive && <div className="card-top-streak" />}

                        {/* Inner rim highlight */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-cyan-300/10 pointer-events-none" />
                        )}

                        {/* Floating Badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider text-cyan-300">
                            {project.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shared Info Bar */}
          <div className="flex flex-row justify-between items-end gap-4 px-4 mt-4">
            <div className="flex flex-col items-start text-left max-w-2xl">
              <h4 className="text-2xl sm:text-3xl font-bold mb-1 text-white">
                {activeProject.title}
              </h4>
              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed line-clamp-2">
                {activeProject.description}
              </p>
              <button
                onClick={() => setSelectedProject(activeProject)}
                className="mt-3 text-sm sm:text-base text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
              >
                <span>View System Specifications</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2 shrink-0 pr-2 sm:pr-4 md:pr-8">
              <button
                onClick={scrollLeft}
                className="bg-neutral-800/50 hover:bg-neutral-800 text-white p-2.5 sm:p-3 rounded-full border border-neutral-800 transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
              <button
                onClick={scrollRight}
                className="bg-neutral-800/50 hover:bg-neutral-800 text-white p-2.5 sm:p-3 rounded-full border border-neutral-800 transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Detail Viewer */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </section>
    </>
  );
};

export default React.memo(PortfolioSection);
