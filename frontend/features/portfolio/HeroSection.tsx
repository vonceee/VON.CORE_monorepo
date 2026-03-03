import React from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";
import InteractiveSphere from "@/components/ui/InteractiveSphere";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="HERO"
      className={`snap-section flex items-center justify-center relative overflow-hidden`}
    >
      <div className="container w-full h-full flex flex-col flex-row items-center justify-center relative">
        {/* Left Column: Text Content */}
        <div className="flex-1 flex flex-col items-start text-left">
          <div className="space-y-2">
            <AnimatedText
              text={t.hero.title}
              className={`text-9xl font-extrabold tracking-tighter`}
              type="directional"
              direction="bottom"
            />

            <AnimatedText
              text={t.hero.subtitle}
              className="text-2xl font-medium text-center"
              type="decode"
              delay={500}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="absolute top-0 right-0 w-3/5 h-full flex items-center justify-end">
          <div className="w-full h-full pointer-events-auto">
            <InteractiveSphere className="w-full h-full scale-125" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
