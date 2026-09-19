import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LenisProvider, useLenisScroll } from "./context/LenisContext";
import { SectionId } from "./types";

// Features
import HeroSection from "./features/portfolio/HeroSection";
import AboutSection from "./features/portfolio/AboutSection";
import ExperienceSection from "./features/portfolio/ExperienceSection";
import PortfolioSection from "./features/portfolio/PortfolioSection";
import ContactSection from "./features/portfolio/ContactSection";

import MainLayout from "./components/layout/MainLayout";
import ParticleOverlay from "./components/effects/ParticleOverlay";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";

const AppContent: React.FC = () => {
  const { scrollTo, pause, resume } = useLenisScroll();
  const [currentView, setCurrentView] = useState<"landing" | "portfolio">("landing");
  const [activeSection, setActiveSection] = useState<SectionId>("HERO");

  // Pause Lenis when landing view is active
  useEffect(() => {
    if (currentView === "landing") {
      pause();
    } else {
      resume();
    }
  }, [currentView, pause, resume]);

  // Scroll Spy Logic observing viewport in portfolio view
  useEffect(() => {
    if (currentView === "portfolio") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id as SectionId);
            }
          });
        },
        { threshold: 0.3 },
      );

      const sections = document.querySelectorAll(".snap-section, .portfolio-section");
      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }
  }, [currentView]);

  const handleViewChange = React.useCallback(
    (view: "landing" | "portfolio", targetSection?: string) => {
      setCurrentView(view);
      if (view === "landing") {
        setActiveSection("HERO");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        setActiveSection((targetSection as SectionId) || "ABOUT");
        if (targetSection && targetSection !== "ABOUT") {
          setTimeout(() => {
            scrollTo(targetSection, { duration: 1.0, immediate: false });
          }, 80);
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }
    },
    [scrollTo],
  );

  const handleScrollTo = React.useCallback(
    (id: string) => {
      if (id === "HERO") {
        handleViewChange("landing");
      } else {
        if (currentView === "landing") {
          handleViewChange("portfolio", id);
        } else {
          scrollTo(id, { duration: 1.2 });
        }
      }
    },
    [scrollTo, currentView, handleViewChange],
  );

  return (
    <>
      {currentView === "portfolio" && <ScrollProgressBar />}
      <ParticleOverlay />

      <MainLayout
        activeSection={activeSection}
        onScrollTo={handleScrollTo}
        currentView={currentView}
        onViewChange={handleViewChange}
      >
        {currentView === "landing" ? (
          <div className="landing-container w-full h-screen overflow-hidden">
            <HeroSection
              onEnter={() => handleViewChange("portfolio", "PORTFOLIO")}
              onAbout={() => handleViewChange("portfolio", "ABOUT")}
            />
          </div>
        ) : (
          <div className="portfolio-container animate-fade-in">
            <AboutSection />
            <ExperienceSection />
            <PortfolioSection />
            <ContactSection />
          </div>
        )}
      </MainLayout>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LenisProvider>
        <AppContent />
      </LenisProvider>
    </ThemeProvider>
  );
};

export default App;
