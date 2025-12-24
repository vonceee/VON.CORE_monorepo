import React from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Skyscraper/Architecture
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop", // Structure
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop", // Minimal
];

const PortfolioSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section
      id="PORTFOLIO"
      className="snap-section flex flex-col items-center justify-center py-20 md:py-0"
    >
      <AnimatedText
        text={t.portfolio.title}
        className="text-5xl lg:text-6xl 2xl:text-8xl font-bold mb-12"
        type="decode"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 2xl:gap-20 max-w-6xl 2xl:max-w-[110rem] w-full px-6 md:px-10">
        {t.portfolio.items.map((item, i) => (
          <div
            key={i}
            className="group relative overflow-hidden aspect-[2/3] bg-neutral-900 border border-white/10 flex flex-col justify-end p-8 lg:p-10 2xl:p-14 cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={PROJECT_IMAGES[i % PROJECT_IMAGES.length]}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            />

            {/* Gradient Fade for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 z-10" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out opacity-20 z-10"></div>

            {/* Content */}
            <div className="relative z-20">
              <p className="text-xs lg:text-sm 2xl:text-lg text-orange-500 tracking-widest font-mono mb-3 font-bold drop-shadow-md">
                {item.category}
              </p>
              <h3 className="text-3xl lg:text-4xl 2xl:text-6xl font-bold leading-none uppercase text-white drop-shadow-lg">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default PortfolioSection;
