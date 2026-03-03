import React, { ReactNode } from "react";
import { SectionId } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

interface MainLayoutProps {
  children: ReactNode;
  activeSection: SectionId | string;
  onScrollTo: (id: string) => void;
  onOpenTerminal: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeSection,
  onScrollTo,
  onOpenTerminal,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, availableLanguages } = useLanguage();

  return (
    <div
      style={
        {
          "--primary": theme !== "light" ? "#ffffff" : "#000000",
          "--dots-color":
            theme !== "light"
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(0, 0, 0, 0.15)",
        } as React.CSSProperties
      }
      className={`${
        theme !== "light" ? "bg-black text-white" : "bg-white text-black"
      } transition-colors duration-500`}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row items-center justify-between p-4 transition-all duration-300 ${
          theme !== "light" ? "mix-blend-difference text-white" : "text-black"
        }`}
      >
        <div className="flex items-center space-x-6 text-sm lg:text-base 2xl:text-xl font-bold tracking-widest">
          <div className="text-xl lg:text-2xl 2xl:text-4xl mr-8">VON.DEV</div>
          <div className="hidden md:flex space-x-4">
            {availableLanguages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`${
                  lang === l
                    ? "text-primary"
                    : "text-neutral-500 hover:text-primary"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-8 text-sm lg:text-base 2xl:text-xl font-bold tracking-widest mt-4 md:mt-0">
          <div className="flex space-x-6">
            <button
              onClick={() => onScrollTo("HERO")}
              className="hover:text-cyan-400 hover:cursor-pointer transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() => onScrollTo("ABOUT")}
              className="hover:text-cyan-400 hover:cursor-pointer transition-colors"
            >
              ABOUT
            </button>
            <button
              onClick={() => onScrollTo("PORTFOLIO")}
              className="hover:text-cyan-400 hover:cursor-pointer transition-colors duration-300"
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => onScrollTo("CONTACT")}
              className="hover:text-cyan-400 hover:cursor-pointer transition-colors duration-300"
            >
              CONTACT
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 border border-current rounded-full w-10 h-10 md:w-11 md:h-11 xl:w-12 xl:h-12 flex items-center justify-center"
          >
            {theme !== "light" ? "☀" : "☾"}
          </button>
        </div>
      </nav>

      {/* Dynamic Subheader */}

      {children}

      {/* Floating Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-2 font-mono text-xs sm:text-sm text-neutral-400">
        <button
          onClick={onOpenTerminal}
          className="hover:text-primary transition-colors duration-300"
        >
          [ execute_terminal_v1.0.42 ]
        </button>
      </div>
    </div>
  );
};

export default MainLayout;
