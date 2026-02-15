import React from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";
import { PROJECTS } from "./projectData";
import { ArrowUpRight } from "lucide-react";
import { useDemo } from "../../context/DemoContext";
import { ToolId } from "../../types";

const PortfolioSection: React.FC = () => {
  const { t } = useLanguage();
  const { openDemo } = useDemo();

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl w-full px-6 md:px-10">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => openDemo(project.id as ToolId)}
            className="group relative overflow-hidden aspect-[4/5] bg-neutral-900 border border-white/10 flex flex-col justify-end p-6 lg:p-8 cursor-pointer transition-colors hover:border-white/30"
          >
            {/* Background Image */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 z-10" />

            {/* Content */}
            <div className="relative z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              {/* Category & Arrow */}
              <div className="flex justify-between items-start mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-mono text-primary tracking-widest uppercase">
                  {project.category}
                </span>
                <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500" />
              </div>

              {/* Title */}
              <h3 className="text-3xl lg:text-4xl font-bold leading-none uppercase text-white mb-3 group-hover:text-primary transition-colors duration-300">
                {project.title.replace(/_/g, " ")}
              </h3>

              {/* Description (Hidden by default, reveal on hover) */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                <div className="overflow-hidden">
                  <p className="text-sm text-neutral-300 font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] uppercase border border-white/20 px-2 py-1 rounded-full text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
