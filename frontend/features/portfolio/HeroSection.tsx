import React from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";
import { usePersona } from "../../hooks/usePersona";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const { persona } = usePersona();

  return (
    <section
      id="HERO"
      className={`snap-section flex flex-col items-center justify-center relative overflow-hidden ${persona === "hr" ? "bg-slate-50" : ""}`}
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

      <AnimatedText
        text={t.hero.title}
        className={`${
          persona === "hr"
            ? "text-6xl md:text-8xl font-bold tracking-tight text-slate-900"
            : "text-8xl md:text-[10rem] lg:text-[13rem] font-extrabold tracking-tighter"
        }`}
        type={persona === "hr" ? "fade" : "directional"}
        direction="bottom"
      />

      <AnimatedText
        text={t.hero.subtitle}
        className={`${
          persona === "hr"
            ? "text-xl md:text-3xl tracking-normal text-slate-600 mt-6 font-medium"
            : "text-lg md:text-2xl tracking-[0.5em] text-orange-500 mt-4 font-light"
        }`}
        type="decode"
        delay={500}
      />

      {persona === "hr" && (
        <div className="mt-12 flex space-x-6 z-10 animate-fade-in-up">
          <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors shadow-lg">
            Download Resume
          </button>
          <button
            onClick={() =>
              document
                .getElementById("ABOUT")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            View Qualifications
          </button>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
