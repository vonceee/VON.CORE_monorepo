import React from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section
      id="ABOUT"
      className="snap-section flex flex-col items-center justify-center px-10 md:px-0"
    >
      <div className="max-w-4xl text-center">
        <AnimatedText
          text={t.about.title}
          className="text-6xl md:text-8xl font-bold mb-8"
          type="decode"
        />
        <AnimatedText
          text={t.about.description}
          className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-neutral-400 font-light"
          type="decode"
          delay={300}
          speed={4}
        />
      </div>
    </section>
  );
};
export default AboutSection;
