import React, { ReactNode } from "react";
import { SectionId } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
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

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } transition-colors duration-500`}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row items-center justify-between p-6 lg:p-8 2xl:p-12 transition-all duration-300 ${
          theme === "dark" ? "mix-blend-difference text-white" : "text-black"
        }`}
      >
        <div className="flex items-center space-x-6 text-sm lg:text-base 2xl:text-xl font-bold tracking-widest">
          <div className="text-xl lg:text-2xl 2xl:text-4xl mr-8">VON.CORE</div>
          <div className="hidden md:flex space-x-4">
            {availableLanguages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`${
                  lang === l
                    ? "text-orange-500"
                    : "text-neutral-500 hover:text-orange-500"
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
              className="hover:text-orange-500 transition-colors"
            >
              ABOUT
            </button>
            <button
              onClick={() => onScrollTo("PORTFOLIO")}
              className="hover:text-orange-500 transition-colors"
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => onScrollTo("CONTACT")}
              className="hover:text-orange-500 transition-colors"
            >
              CONTACT
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 border border-current rounded-full w-10 h-10 md:w-11 md:h-11 xl:w-12 xl:h-12 flex items-center justify-center"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </nav>

      {/* Dynamic Subheader */}
      <div className="fixed top-28 left-8 md:top-28 md:left-10 xl:top-32 xl:left-12 z-40 hidden md:block">
        <AnimatedText
          text={`// CURRENT: ${activeSection}`}
          className="text-lg 2xl:text-2xl tracking-[0.4em] font-mono text-orange-500"
          type="decode"
          once={false}
        />
      </div>

      {children}

      {/* Floating Button */}
      <button
        onClick={onOpenTerminal}
        className="fixed bottom-10 right-10 z-50 w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
      >
        <span className="font-mono text-xl group-hover:animate-pulse">
          &gt;_
        </span>
      </button>
    </div>
  );
};

export default MainLayout;
