import React from "react";
import { Sun } from "lucide-react";
import { useInView } from "../hooks/useInView";
import heroImg from "../../../../../assets/albums/SundayMorning/weverse_4-324516037.jpeg";

export const Hero: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center p-[var(--sm-space-8)] pt-[calc(var(--sm-space-16)+var(--sm-space-8))] relative overflow-hidden bg-[var(--sm-color-background)] snap-center"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--sm-color-surface)] to-[var(--sm-color-background)] opacity-50 pointer-events-none" />

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-[var(--sm-space-12)] p-[var(--sm-space-4)] transition-all duration-1000 ease-out transform ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start">
          <Sun
            className="w-16 h-16 text-[var(--sm-color-secondary)] opacity-80 mb-[var(--sm-space-6)] animate-spin-slow"
            strokeWidth={1}
            style={{ animationDuration: "10s" }}
          />
          <h1 className="sm-font-serif text-[4rem] md:text-[6rem] leading-none text-[var(--sm-color-primary)] tracking-tight mb-[var(--sm-space-4)]">
            Sunday Morning
          </h1>
          <p className="text-[var(--sm-text-xl)] md:text-[var(--sm-text-2xl)] text-[var(--sm-color-secondary)] font-light tracking-wide italic">
            "Japan 2nd Digital Single 'Sunday Morning' 2026.1.13 0:00 (JST)"
          </p>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative w-64 md:w-80 aspect-[3/4] transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 border-4 border-[var(--sm-color-surface)] shadow-xl rounded-sm overflow-hidden">
              <img
                src={heroImg}
                alt="Sunday Morning Aesthetics"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
