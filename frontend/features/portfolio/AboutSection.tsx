import React from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";
import { usePersona } from "../../hooks/usePersona";

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const { persona } = usePersona();

  const skills = [
    "Modern React Architecture",
    "TypeScript / Strict Types",
    "TailwindCSS Design Systems",
    "Node.js & Backend Services",
    "AI Agent Integration",
    "Performance Optimization",
  ];

  return (
    <section
      id="ABOUT"
      className={`snap-section flex flex-col items-center justify-center px-10 md:px-0 ${persona === "hr" ? "bg-white" : ""}`}
    >
      <div className="max-w-4xl text-center">
        <AnimatedText
          text={t.about.title}
          className={`${
            persona === "hr"
              ? "text-4xl md:text-5xl font-bold mb-8 text-slate-900"
              : "text-6xl md:text-8xl font-bold mb-8"
          }`}
          type={persona === "hr" ? "fade" : "decode"}
        />
        <AnimatedText
          text={t.about.description}
          className={`${
            persona === "hr"
              ? "text-lg md:text-xl leading-relaxed text-slate-600 font-normal"
              : "text-xl md:text-2xl lg:text-3xl leading-relaxed text-neutral-400 font-light"
          }`}
          type="decode"
          delay={300}
          speed={4}
        />

        {persona === "hr" && (
          <div className="mt-16 text-left w-full animate-fade-in-up">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 text-center">
              Technical Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 border border-slate-100 rounded hover:border-slate-300 transition-colors flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-slate-400 rounded-full" />
                  <span className="text-slate-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
