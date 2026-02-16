import React, { useRef } from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";
import { PROJECTS } from "./projectData";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useDemo } from "../../context/DemoContext";
import { ToolId } from "../../types";

const PortfolioSection: React.FC = () => {
  const { t } = useLanguage();
  const { openDemo } = useDemo();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="PORTFOLIO"
      className="snap-section flex flex-col items-center justify-center py-20 md:py-0 bg-black text-white relative"
    >
      <AnimatedText
        text={t.portfolio.title}
        className="text-5xl lg:text-7xl 2xl:text-8xl font-bold mb-16 tracking-tighter"
        type="decode"
      />

      <div className="relative w-full group">
        {/* Left Navigation Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-8 pt-4 px-6 md:px-10 hide-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          <div className="flex gap-6 lg:gap-8 w-max">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => openDemo(project.id as ToolId)}
                className="snap-center shrink-0 group/card relative overflow-hidden w-[85vw] md:w-[45vw] lg:w-[30vw] xl:w-[25vw] aspect-[4/5] bg-neutral-900 border border-white/10 flex flex-col justify-end p-6 lg:p-8 cursor-pointer transition-colors hover:border-white/30"
              >
                {/* Background Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-700 ease-out"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 z-10" />

                {/* Content */}
                <div className="relative z-20 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                  {/* Category & Arrow */}
                  <div className="flex justify-between items-start mb-2 opacity-80 group-hover/card:opacity-100 transition-opacity">
                    <span className="text-xs font-mono text-primary tracking-widest uppercase">
                      {project.category}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover/card:opacity-100 -translate-y-2 group-hover/card:translate-y-0 transition-all duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold leading-none uppercase text-white mb-3 group-hover/card:text-primary transition-colors duration-300">
                    {project.title.replace(/_/g, " ")}
                  </h3>

                  {/* Description (Hidden by default, reveal on hover) */}
                  <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-sm text-neutral-300 font-light leading-relaxed mb-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 delay-100 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 delay-200">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] uppercase border border-white/20 px-2 py-1 rounded-full text-neutral-400"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[10px] uppercase border border-white/20 px-2 py-1 rounded-full text-neutral-400">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
