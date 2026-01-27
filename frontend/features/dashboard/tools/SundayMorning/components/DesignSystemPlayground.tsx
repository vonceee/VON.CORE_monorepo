import React, { useState } from "react";
import "../SundayMorning.css";

export const DesignSystemPlayground: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Ideally, this would be handled by a context provider or setting a class on a parent container
    // For this playground visualization, we might need a wrapper div locally
  };

  return (
    <div
      className={`sm-theme p-8 min-h-screen ${isDarkMode ? "bg-[#1A1816]" : "bg-[#F9F7F2]"}`}
      data-theme={isDarkMode ? "dark" : "light"}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex justify-between items-center border-b border-[var(--sm-color-secondary)]/20 pb-6">
          <h1 className="sm-font-serif text-[var(--sm-text-3xl)] font-bold">
            Sunday Morning Design System
          </h1>
          <button onClick={toggleTheme} className="sm-btn">
            Toggle {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </header>

        {/* Colors */}
        <section className="space-y-4">
          <h2 className="text-[var(--sm-text-xl)] font-bold uppercase tracking-wider text-[var(--sm-color-secondary)]">
            Colors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Primary", var: "var(--sm-color-primary)" },
              { name: "Secondary", var: "var(--sm-color-secondary)" },
              { name: "Background", var: "var(--sm-color-background)" },
              { name: "Surface", var: "var(--sm-color-surface)" },
              { name: "Accent", var: "var(--sm-color-accent)" },
              { name: "Text Main", var: "var(--sm-color-text-main)" },
              { name: "Text Muted", var: "var(--sm-color-text-muted)" },
            ].map((color) => (
              <div key={color.name} className="space-y-2">
                <div
                  className="h-20 w-full rounded shadow-sm border border-gray-200/20"
                  style={{ backgroundColor: color.var }}
                />
                <div className="text-[var(--sm-text-sm)] font-medium">
                  {color.name}
                </div>
                <div className="text-[var(--sm-text-xs)] opacity-60 font-mono">
                  {color.var}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-[var(--sm-text-xl)] font-bold uppercase tracking-wider text-[var(--sm-color-secondary)]">
            Typography
          </h2>
          <div className="space-y-4 border-l-4 border-[var(--sm-color-primary)] pl-6">
            <h1 className="sm-font-serif text-[var(--sm-text-4xl)]">
              Heading 1 (Serif 4xl)
            </h1>
            <h2 className="sm-font-serif text-[var(--sm-text-3xl)]">
              Heading 2 (Serif 3xl)
            </h2>
            <h3 className="sm-font-serif text-[var(--sm-text-2xl)]">
              Heading 3 (Serif 2xl)
            </h3>
            <p className="text-[var(--sm-text-base)] max-w-prose leading-relaxed">
              Body text (Sans Base). Sunday morning rain is falling. Steal some
              covers, share some skin. Clouds are shrouding us in moments
              unforgettable. Twist and turn, things just burn, but we are safe
              right here within.
            </p>
            <p className="text-[var(--sm-text-sm)] text-[var(--sm-color-text-muted)]">
              Small text / Caption (Sans SM muted). Japan 2nd Digital Single
              'Sunday Morning' 2026.1.13 0:00 (JST)
            </p>
          </div>
        </section>

        {/* Components */}
        <section className="space-y-6">
          <h2 className="text-[var(--sm-text-xl)] font-bold uppercase tracking-wider text-[var(--sm-color-secondary)]">
            Components
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-[var(--sm-text-sm)] font-bold mb-4">
                Buttons
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="sm-btn">Primary Button</button>
                <button className="sm-btn opacity-80">Hover State</button>
                <button className="px-4 py-2 border border-[var(--sm-color-primary)] text-[var(--sm-color-primary)] rounded">
                  Outlined
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-[var(--sm-text-sm)] font-bold mb-4">
                Inputs
              </h3>
              <div className="space-y-3 max-w-xs">
                <input
                  type="text"
                  placeholder="Type something..."
                  className="w-full px-4 py-2 bg-[var(--sm-color-surface)] border border-[var(--sm-color-secondary)]/30 rounded focus:outline-none focus:border-[var(--sm-color-primary)] text-[var(--sm-color-text-main)] placeholder-[var(--sm-color-text-muted)]/50"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <h3 className="text-[var(--sm-text-sm)] font-bold mb-4">Cards</h3>
              <div className="sm-card max-w-md">
                <h4 className="sm-font-serif text-[var(--sm-text-lg)] mb-2 font-bold">
                  Atmospheric Card
                </h4>
                <p className="text-[var(--sm-text-sm)] text-[var(--sm-color-text-muted)] mb-4">
                  This card uses the surface color and a subtle border. It fits
                  perfectly into the grid.
                </p>
                <button className="text-[var(--sm-text-xs)] uppercase tracking-widest font-bold border-b border-[var(--sm-color-primary)] pb-0.5">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
