
import React from 'react';
import AnimatedText from '../../components/ui/AnimatedText';
import { useLanguage } from '../../context/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="HERO" className="snap-section flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-5 pointer-events-none">
        <div className="grid grid-cols-12 h-full w-full">
            {Array.from({length: 12}).map((_, i) => <div key={i} className="border-l border-white/50 h-full"></div>)}
        </div>
      </div>
      <AnimatedText 
        text={t.hero.title} 
        className="text-7xl md:text-9xl font-extrabold tracking-tighter"
        type="directional"
        direction="bottom"
      />
      <AnimatedText 
        text={t.hero.subtitle} 
        className="text-xs md:text-sm tracking-[0.5em] text-orange-500 mt-4 font-light"
        type="decode"
        delay={500}
      />
    </section>
  );
};

export default HeroSection;
