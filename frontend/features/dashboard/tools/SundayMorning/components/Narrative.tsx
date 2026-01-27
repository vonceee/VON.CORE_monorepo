import React from "react";
import { useInView } from "../hooks/useInView";

export const Narrative: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      id="narrative"
      className="min-h-screen flex flex-col justify-center items-center p-[var(--sm-space-8)] pt-[calc(var(--sm-space-16)+var(--sm-space-8))] md:p-[var(--sm-space-16)] md:pt-[calc(var(--sm-space-16)+var(--sm-space-8))] bg-[var(--sm-color-surface)] snap-center"
    >
      <div
        ref={ref}
        className="max-w-3xl mx-auto space-y-[var(--sm-space-12)] text-center"
      >
        <div
          className={`space-y-[var(--sm-space-4)] transition-all duration-1000 ease-out transform ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="sm-font-serif text-[var(--sm-text-3xl)] md:text-[var(--sm-text-4xl)] text-[var(--sm-color-primary)]">
            The Story
          </h2>
          <div className="w-12 h-1 bg-[var(--sm-color-secondary)]/30 mx-auto" />
        </div>

        <div className="space-y-[var(--sm-space-6)] text-[var(--sm-text-lg)] md:text-[var(--sm-text-xl)] text-[var(--sm-color-text-main)] leading-relaxed font-light">
          <p
            className={`transition-all duration-1000 delay-300 ease-out fill-mode-both ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            It's that feeling when you first wake up. The world is quiet, except
            for the gentle patter of rain against the windowpane.
          </p>
          <p
            className={`transition-all duration-1000 delay-500 ease-out fill-mode-both ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            There's no rush to be anywhere. No deadlines looming immediately
            overhead. Just the comfort of the sheets and the warmth of the
            moment.
          </p>
          <p
            className={`sm-font-serif italic text-[var(--sm-color-secondary)] text-[var(--sm-text-2xl)] pt-[var(--sm-space-4)] transition-all duration-1000 delay-700 ease-out fill-mode-both ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            It's about finding peace in the simple things.
          </p>
        </div>
      </div>
    </section>
  );
};
