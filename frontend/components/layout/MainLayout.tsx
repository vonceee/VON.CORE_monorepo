import React, { ReactNode } from "react";
import { SectionId } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { usePersona } from "../../hooks/usePersona";
import AnimatedText from "../ui/AnimatedText";

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
  const { persona, setPersona } = usePersona();

  return (
    <div
      style={
        {
          "--primary": theme !== "light" ? "#ffffff" : "#000000",
        } as React.CSSProperties
      }
      className={`${
        persona === "hr"
          ? theme !== "light"
            ? "bg-slate-900 text-slate-100"
            : "bg-slate-50 text-slate-800"
          : theme !== "light"
            ? "bg-black text-white"
            : "bg-white text-black"
      } transition-colors duration-500`}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row items-center justify-between p-6 lg:p-8 2xl:p-12 transition-all duration-300 ${
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
              onClick={() => onScrollTo("ABOUT")}
              className="hover:text-primary transition-colors"
            >
              ABOUT
            </button>
            <button
              onClick={() => onScrollTo("PORTFOLIO")}
              className="hover:text-primary transition-colors duration-300"
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => onScrollTo("DEEP_DIVE")}
              className="hover:text-primary transition-colors duration-300"
            >
              DEEP DIVE
            </button>
            <button
              onClick={() => onScrollTo("CONTACT")}
              className="hover:text-primary transition-colors duration-300"
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
      <div className="fixed top-28 left-8 md:top-28 md:left-10 xl:top-32 xl:left-12 z-40 hidden md:block">
        <AnimatedText
          text={`// ${activeSection}`}
          className="text-lg 2xl:text-2xl tracking-[0.4em] font-mono text-primary"
          type="decode"
          once={false}
        />
      </div>

      {children}

      {/* Floating Button */}
      {/* Floating Buttons: Terminal & Persona Toggle */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-2 font-mono text-xs sm:text-sm text-neutral-400">
        <button
          onClick={() => setPersona(persona === "hr" ? "developer" : "hr")}
          className="hover:text-primary transition-colors duration-300"
        >
          [ switch_to_{persona === "hr" ? "dev" : "hr"}_mode ]
        </button>
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
