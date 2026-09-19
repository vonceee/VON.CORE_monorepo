import React, { ReactNode } from "react";
import { SectionId } from "../../types";

interface MainLayoutProps {
  children: ReactNode;
  activeSection: SectionId | string;
  onScrollTo: (id: string) => void;
  currentView?: "landing" | "portfolio";
  onViewChange?: (view: "landing" | "portfolio", targetSection?: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeSection,
  onScrollTo,
  currentView = "landing",
  onViewChange,
}) => {
  const handleNavClick = (section: string) => {
    if (section === "HERO") {
      if (onViewChange) onViewChange("landing");
      onScrollTo("HERO");
    } else {
      if (currentView === "landing" && onViewChange) {
        onViewChange("portfolio", section);
      } else {
        onScrollTo(section);
      }
    }
  };

  return (
    <div
      style={
        {
          "--primary": "#ffffff",
          "--dots-color": "rgba(255, 255, 255, 0.15)",
        } as React.CSSProperties
      }
      className="bg-black text-white transition-colors duration-500"
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row items-center justify-between p-4 transition-all duration-300 bg-black/40 backdrop-blur-md border-b border-white/5 text-white">
        <div className="flex items-center space-x-6 text-sm lg:text-base 2xl:text-xl font-bold tracking-widest">
          <button
            onClick={() => handleNavClick("HERO")}
            className="text-xl lg:text-2xl 2xl:text-4xl hover:text-cyan-400 transition-colors cursor-pointer"
          >
            VON.DEV
          </button>
        </div>
        <div className="flex items-center text-sm lg:text-base 2xl:text-xl font-bold tracking-widest mt-4 md:mt-0">
          <div className="flex space-x-6">
            <button
              onClick={() => handleNavClick("HERO")}
              className={`hover:text-cyan-400 hover:cursor-pointer transition-colors ${
                currentView === "landing" ? "text-cyan-400 font-extrabold" : ""
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick("ABOUT")}
              className={`hover:text-cyan-400 hover:cursor-pointer transition-colors ${
                currentView === "portfolio" && activeSection === "ABOUT"
                  ? "text-cyan-400 font-extrabold"
                  : ""
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => handleNavClick("EXPERIENCE")}
              className={`hover:text-cyan-400 hover:cursor-pointer transition-colors duration-300 ${
                currentView === "portfolio" && activeSection === "EXPERIENCE"
                  ? "text-cyan-400 font-extrabold"
                  : ""
              }`}
            >
              EXPERIENCE
            </button>
            <button
              onClick={() => handleNavClick("PORTFOLIO")}
              className={`hover:text-cyan-400 hover:cursor-pointer transition-colors duration-300 ${
                currentView === "portfolio" && activeSection === "PORTFOLIO"
                  ? "text-cyan-400 font-extrabold"
                  : ""
              }`}
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => handleNavClick("CONTACT")}
              className={`hover:text-cyan-400 hover:cursor-pointer transition-colors duration-300 ${
                currentView === "portfolio" && activeSection === "CONTACT"
                  ? "text-cyan-400 font-extrabold"
                  : ""
              }`}
            >
              CONTACT
            </button>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default React.memo(MainLayout);
