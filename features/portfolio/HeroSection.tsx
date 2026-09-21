import React from "react";
import InteractiveSphere from "@/components/ui/InteractiveSphere";
import { ArrowRight, Github, Linkedin, Mail, ChessPawn } from "lucide-react";

interface HeroSectionProps {
  onEnter?: () => void;
  onAbout?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnter, onAbout }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="HERO"
      className="snap-section h-screen min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black selection:bg-cyan-400 selection:text-black"
    >
      {/* 3D Interactive Sphere - anchored firmly to the right edge across laptops and desktops */}
      <div className="absolute inset-y-0 right-0 flex items-center justify-end translate-x-16 sm:translate-x-24 md:translate-x-32 lg:translate-x-52 xl:translate-x-70 pointer-events-none z-0">
        <div className="w-[800px] h-[800px] md:w-[1050px] md:h-[1050px] lg:w-[1250px] lg:h-[1250px] xl:w-[1400px] xl:h-[1400px] shrink-0 pointer-events-auto flex items-center justify-center">
          <InteractiveSphere className="w-full h-full" />
        </div>
      </div>

      <div className="container mx-auto w-full h-full flex flex-col justify-center relative px-6 sm:px-10 lg:px-16 z-10 pointer-events-none">
        {/* Left Column: Architectural Text Content */}
        <div className="w-full max-w-2xl xl:max-w-3xl flex flex-col items-start text-left pointer-events-auto z-10 space-y-6 sm:space-y-8">
          {/* Section Indicator in Brittany Chiang Line Accent Style */}
          <div className="flex items-center gap-4 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-cyan-400">
            <span className="w-12 sm:w-16 h-px bg-cyan-400 inline-block" />
            <span>VON CEDRIC C. RANOLA</span>
          </div>

          {/* Primary Hook / Tagline */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-white leading-[1.08]">
              Fast by default. <span className="text-cyan-400">Clear by design.</span>
            </h1>
          </div>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg lg:text-xl text-white font-normal leading-relaxed max-w-xl">
            I build web applications with zero unnecessary bloat and strict visual hierarchy—ensuring every component serves a clear purpose and every page loads instantly.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            {onEnter && (
              <button
                onClick={onEnter}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer"
              >
                <span>Explore Projects</span>
              </button>
            )}

            <button
              onClick={onAbout || onEnter}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-medium cursor-pointer"
            >
              About Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
