import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { useAppMode } from "./hooks/useAppMode";
import { usePersona } from "./hooks/usePersona";
import { SectionId } from "./types";
import { PersonaProvider } from "./context/PersonaContext";
import EntryGate from "./components/EntryGate";

// Features
import Terminal from "./features/terminal/Terminal";
import DevDashboard from "./features/dashboard/DevDashboard";
import HeroSection from "./features/portfolio/HeroSection";
import AboutSection from "./features/portfolio/AboutSection";
import PortfolioSection from "./features/portfolio/PortfolioSection";
import ContactSection from "./features/portfolio/ContactSection";

import MainLayout from "./components/layout/MainLayout";
import BootSequence from "./components/BootSequence";
import { DemoProvider } from "./context/DemoContext";
import { DemoLayout } from "./components/layout/DemoLayout";
import ParticleOverlay from "./components/effects/ParticleOverlay";

const AppContent: React.FC = () => {
  const { mode, setMode } = useAppMode();
  const { persona, setPersona } = usePersona();
  const [activeSection, setActiveSection] = useState<SectionId>("HERO");
  const [isBooting, setIsBooting] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Spy Logic
  useEffect(() => {
    if (mode === "public" && persona) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id as SectionId);
            }
          });
        },
        { threshold: 0.6 },
      );

      const sections = document.querySelectorAll(".snap-section");
      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }
  }, [mode, persona]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleDevModeOn = () => {
    setIsBooting(true);
    setMode("dev");
    setIsTerminalOpen(false);
  };

  const handleDevModeOff = () => {
    setMode("public");
    setIsTerminalOpen(false);
  };

  // Global particle overlay regardless of mode
  return (
    <>
      <ParticleOverlay />

      {!persona ? (
        <EntryGate onSelect={setPersona} />
      ) : mode === "dev" ? (
        isBooting ? (
          <BootSequence onComplete={() => setIsBooting(false)} />
        ) : (
          <>
            <DevDashboard onExit={handleDevModeOff} />
            <Terminal
              isOpen={isTerminalOpen}
              onClose={() => setIsTerminalOpen(false)}
              onDevModeSuccess={handleDevModeOn}
              onDevModeOff={handleDevModeOff}
              isDevMode={true}
            />
          </>
        )
      ) : (
        <MainLayout
          activeSection={activeSection}
          onScrollTo={scrollTo}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        >
          <DemoLayout />
          <div
            ref={containerRef}
            className={`snap-container ${persona === "hr" ? "theme-hr" : ""}`}
          >
            <HeroSection />
            <AboutSection />
            <PortfolioSection />
            <ContactSection />
          </div>

          <Terminal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onDevModeSuccess={handleDevModeOn}
            onDevModeOff={handleDevModeOff}
            isDevMode={false}
          />
        </MainLayout>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PersonaProvider>
          <DemoProvider>
            <AppContent />
          </DemoProvider>
        </PersonaProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
