
import React from 'react';
import AnimatedText from '../../components/ui/AnimatedText';
import { useLanguage } from '../../context/LanguageContext';

const PortfolioSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="PORTFOLIO" className="snap-section flex flex-col items-center justify-center">
          <AnimatedText text={t.portfolio.title} className="text-4xl md:text-6xl font-bold mb-12" direction="top" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full px-10">
            {t.portfolio.items.map((item, i) => (
              <div key={i} className="group relative overflow-hidden aspect-[3/4] bg-neutral-900 border border-white/10 flex flex-col justify-end p-8 cursor-pointer">
                <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out opacity-20"></div>
                <div className="relative z-10">
                  <p className="text-xs md:text-sm text-orange-500 tracking-widest font-mono mb-2">{item.category}</p>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight uppercase">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
    );
}
export default PortfolioSection;
