import React, { useState } from "react";
import { Hero } from "./components/Hero";
import { TrackInfo } from "./components/TrackInfo";
import { Gallery } from "./components/Gallery";
import { Lyrics } from "./components/Lyrics";

import { NavBar } from "./components/NavBar";
import { IntroductionView } from "./components/IntroductionView"; // [NEW]

import { DesignSystemPlayground } from "./components/DesignSystemPlayground";
import "./SundayMorning.css";
// import { Moon, Sun } from "lucide-react"; // Assuming lucide-react is available - these are now handled by NavBar

export const SundayMorning: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showPlayground, setShowPlayground] = useState(false);
  const [showIntro, setShowIntro] = useState(false); // [NEW]
  const containerRef = React.useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (showPlayground) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowPlayground(false)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-black text-white rounded shadow-lg"
        >
          Exit Playground
        </button>
        <DesignSystemPlayground />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="sm-theme h-full w-full overflow-hidden flex relative"
      data-theme={theme}
    >
      {/* Intro View Overlay */}
      {showIntro && (
        <div className="absolute inset-0 z-[60]">
          <IntroductionView onClose={() => setShowIntro(false)} />
        </div>
      )}

      <NavBar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenPlayground={() => setShowPlayground(true)}
        onToggleFullscreen={toggleFullscreen}
        onShowIntro={() => setShowIntro(true)} // [NEW]
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scroll-smooth relative snap-y snap-mandatory h-full">
        <Hero />
        <TrackInfo />
        <Gallery />
        <Lyrics />

        <footer className="py-12 text-center text-[var(--sm-color-text-muted)] text-xs uppercase tracking-widest opacity-50 snap-end">
          Sunday Morning - Fan Experience
        </footer>
      </main>
    </div>
  );
};
