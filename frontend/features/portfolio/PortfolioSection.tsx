import React, { useRef, useState, useEffect } from "react";
import { PROJECTS } from "./projectData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDemo } from "../../context/DemoContext";
import { ToolId } from "../../types";

const PortfolioSection: React.FC = () => {
  const { openDemo } = useDemo();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const ratiosRef = useRef<{ [key: number]: number }>({});

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll("[data-card-index]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.cardIndex);
          ratiosRef.current[index] = entry.intersectionRatio;
        });

        let maxRatio = 0;
        let maxIndex = 0;

        Object.entries(ratiosRef.current).forEach(([indexStr, ratio]) => {
          const currentRatio = ratio as number;
          if (currentRatio > maxRatio) {
            maxRatio = currentRatio;
            maxIndex = Number(indexStr);
          }
        });

        setActiveIndex(maxIndex);
      },
      {
        root: container,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
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

        /* Spinning conic-gradient border */
        .card-active-glow::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: conic-gradient(
            from var(--angle),
            transparent 0deg,
            rgba(34, 211, 238, 0.9) 60deg,
            rgba(129, 140, 248, 0.7) 120deg,
            transparent 200deg,
            rgba(34, 211, 238, 0.5) 280deg,
            transparent 360deg
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: border-spin 5s linear infinite;
          z-index: 10;
          pointer-events: none;
        }

        /* ambient bloom sitting behind the card */
        .card-bloom {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 60px;
          background: radial-gradient(
            ellipse at center,
            rgba(34, 211, 238, 0.25) 0%,
            rgba(99, 102, 241, 0.15) 40%,
            transparent 70%
          );
          filter: blur(18px);
          animation: glow-pulse 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        /* top-edge light streak */
        .card-top-streak {
          position: absolute;
          top: 0;
          left: 20%;
          right: 20%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(34, 211, 238, 0.8) 30%,
            rgba(129, 140, 248, 0.8) 70%,
            transparent
          );
          filter: blur(0.5px);
          z-index: 11;
          pointer-events: none;
        }
      `}</style>

      <section
        id="PORTFOLIO"
        className="snap-section flex flex-col items-center justify-start relative pt-20 pl-2"
      >
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto p-10 hide-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            <div className="flex gap-6 lg:gap-8 w-max">
              {PROJECTS.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={project.id}
                    data-card-index={index}
                    className="snap-center shrink-0 w-[45vw]"
                  >
                    <div className="relative">
                      {/* Bloom behind card */}
                      {isActive && <div className="card-bloom" />}

                      {/* Card shell */}
                      <div
                        onClick={() => openDemo(project.id as ToolId)}
                        className={`
                          group/card relative overflow-hidden w-full h-[45vh] cursor-pointer rounded-2xl
                          transition-all duration-700
                          ${
                            isActive
                              ? [
                                  "card-active-glow",
                                  "opacity-100",
                                  // layered box-shadow: tight colored glow + wide diffuse halo
                                  "shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_0_20px_0px_rgba(34,211,238,0.2),0_0_60px_-10px_rgba(99,102,241,0.3),0_0_100px_-20px_rgba(34,211,238,0.15)]",
                                ].join(" ")
                              : "opacity-45 hover:opacity-70 border border-white/5 hover:border-white/10 transition-opacity duration-500"
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
              <h4 className="text-3xl mb-1">
                {activeProject.title.replace(/_/g, " ")}
              </h4>
              <p className="text-lg text-neutral-400 font-light leading-relaxed line-clamp-2 lowercase">
                {activeProject.description}
              </p>
              <button
                onClick={() => openDemo(activeProject.id as ToolId)}
                className="mt-4 text-lg text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                view case <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex gap-2 shrink-0 pr-[40vw]">
              <button
                onClick={scrollLeft}
                className="bg-neutral-800/50 hover:bg-neutral-800 text-white p-3 rounded-full border border-neutral-800 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={scrollRight}
                className="bg-neutral-800/50 hover:bg-neutral-800 text-white p-3 rounded-full border border-neutral-800 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioSection;
