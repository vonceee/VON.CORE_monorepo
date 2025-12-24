
import React, { ReactNode } from 'react';
import { SectionId } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import AnimatedText from '../ui/AnimatedText';

interface MainLayoutProps {
  children: ReactNode;
  activeSection: SectionId | string;
  onScrollTo: (id: string) => void;
  onOpenTerminal: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, activeSection, onScrollTo, onOpenTerminal }) => {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, availableLanguages } = useLanguage();

  return (
    <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row items-center justify-between p-6 mix-blend-difference">
        <div className="flex items-center space-x-6 text-xs font-bold tracking-widest">
          <div className="text-xl mr-8">VON.CORE</div>
          <div className="hidden md:flex space-x-4">
            {availableLanguages.map((l) => (
              <button 
                key={l} 
                onClick={() => setLang(l)}
                className={`${lang === l ? 'text-orange-500' : 'text-neutral-500 hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-8 text-xs font-bold tracking-widest mt-4 md:mt-0">
          <div className="flex space-x-6">
            <button onClick={() => onScrollTo('ABOUT')} className="hover:text-orange-500 transition-colors">ABOUT</button>
            <button onClick={() => onScrollTo('PORTFOLIO')} className="hover:text-orange-500 transition-colors">PORTFOLIO</button>
            <button onClick={() => onScrollTo('CONTACT')} className="hover:text-orange-500 transition-colors">CONTACT</button>
          </div>
          <button onClick={toggleTheme} className="p-2 border border-current rounded-full w-10 h-10 flex items-center justify-center">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </nav>

      {/* Dynamic Subheader */}
      <div className="fixed top-24 left-6 z-40 hidden md:block">
        <AnimatedText 
          text={`// CURRENT: ${activeSection}`} 
          className="text-[10px] tracking-[0.3em] font-mono text-orange-500"
          type="decode"
          once={false}
        />
      </div>

      {children}

       {/* Floating Button */}
       <button 
        onClick={onOpenTerminal}
        className="fixed bottom-10 right-10 z-50 w-14 h-14 bg-orange-500 text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
      >
        <span className="font-mono text-xl group-hover:animate-pulse">&gt;_</span>
      </button>
    </div>
  );
};

export default MainLayout;
