
import React from 'react';
import AnimatedText from '../../components/ui/AnimatedText';
import { useLanguage } from '../../context/LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="ABOUT" className="snap-section flex flex-col items-center justify-center px-10 md:px-0">
      <div className="max-w-2xl text-center">
        <AnimatedText 
          text={t.about.title} 
          className="text-4xl md:text-6xl font-bold mb-8" 
          direction="left"
        />
        <AnimatedText 
          text={t.about.description} 
          className="text-base md:text-lg leading-relaxed text-neutral-400 font-light"
          direction="right"
          delay={300}
        />
      </div>
    </section>
  );
};
export default AboutSection;
