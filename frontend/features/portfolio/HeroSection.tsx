import React from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";
import { usePersona } from "../../hooks/usePersona";
import SplineAnimation from "@/components/ui/SplineAnimation";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const { persona } = usePersona();

  return (
    <section
      id="HERO"
      className={`snap-section flex items-center justify-center relative overflow-hidden ${persona === "hr" ? "bg-slate-50" : ""}`}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none ${persona === "hr" ? "opacity-0" : "opacity-5"}`}
      >
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-white/50 h-full"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center relative">
        {/* Left Column: Text Content (Lower Z-Index) */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8 order-2 lg:order-1 mt-8 lg:mt-0 z-0 relative w-full lg:w-1/2">
          <div className="space-y-2">
            <AnimatedText
              text={t.hero.title}
              className={`${
                persona === "hr"
                  ? "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900"
                  : "text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter"
              }`}
              type={persona === "hr" ? "fade" : "directional"}
              direction="bottom"
            />

            <AnimatedText
              text={t.hero.subtitle}
              className={`${
                persona === "hr"
                  ? "text-lg md:text-xl lg:text-2xl tracking-normal text-slate-600 font-medium text-center"
                  : "text-base md:text-lg lg:text-xl tracking-[0.3em] text-primary font-light text-center"
              }`}
              type="decode"
              delay={500}
            />
          </div>

          {persona === "hr" && (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up pt-4">
              <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors shadow-lg w-full sm:w-auto">
                Download Resume
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("ABOUT")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto"
              >
                View Qualifications
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Animation (Higher Z-Index) */}
        <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full z-20 pointer-events-none flex items-center justify-center lg:justify-end">
          <div className="w-full h-full pointer-events-auto">
            <SplineAnimation className="w-full h-full scale-125" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
