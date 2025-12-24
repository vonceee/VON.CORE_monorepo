
import React, { useState, useEffect, useRef } from 'react';
import { Language, Theme, SectionId, AppMode } from './types';
import { TRANSLATIONS } from './constants';
import AnimatedText from './components/AnimatedText';
import Terminal from './components/Terminal';
import DevDashboard from './components/DevDashboard';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ENG');
  const [theme, setTheme] = useState<Theme>('dark');
  const [activeSection, setActiveSection] = useState<SectionId>('HERO');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [mode, setMode] = useState<AppMode>(() => (localStorage.getItem('vcore_mode') as AppMode) || 'public');
  const containerRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    localStorage.setItem('vcore_mode', mode);
  }, [mode]);

  useEffect(() => {
    if (mode === 'public') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id as SectionId);
            }
          });
        },
        { threshold: 0.6 }
      );

      const sections = document.querySelectorAll('.snap-section');
      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }
  }, [mode]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDevModeOn = () => {
    setMode('dev');
    setIsTerminalOpen(false);
  };

  const handleDevModeOff = () => {
    setMode('public');
    setIsTerminalOpen(false);
  };

  if (mode === 'dev') {
    return (
      <>
        <DevDashboard onExit={handleDevModeOff} />
        <Terminal 
          isOpen={isTerminalOpen} 
          onClose={() => setIsTerminalOpen(false)} 
          onDevModeSuccess={handleDevModeOn}
          onDevModeOff={handleDevModeOff}
          isDevMode={true}
        />
        {/* Terminal trigger in dev mode is key bound or accessible via small hidden pixel/button if needed, 
            but prompt says CLI is used for auth/mode switch. We can keep the floating button or use a keyboard shortcut. */}
        <button 
          onClick={() => setIsTerminalOpen(true)}
          className="fixed bottom-10 right-10 z-[70] w-12 h-12 bg-orange-600 text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-30 hover:opacity-100"
        >
          <span className="font-mono text-sm">&gt;_</span>
        </button>
      </>
    );
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row items-center justify-between p-6 mix-blend-difference">
        <div className="flex items-center space-x-6 text-xs font-bold tracking-widest">
          <div className="text-xl mr-8">VON.CORE</div>
          <div className="hidden md:flex space-x-4">
            {['ENG', 'JPN', 'KOR', 'RUS', 'PH'].map((l) => (
              <button 
                key={l} 
                onClick={() => setLang(l as Language)}
                className={`${lang === l ? 'text-orange-500' : 'text-neutral-500 hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-8 text-xs font-bold tracking-widest mt-4 md:mt-0">
          <div className="flex space-x-6">
            <button onClick={() => scrollTo('ABOUT')} className="hover:text-orange-500 transition-colors">ABOUT</button>
            <button onClick={() => scrollTo('PORTFOLIO')} className="hover:text-orange-500 transition-colors">PORTFOLIO</button>
            <button onClick={() => scrollTo('CONTACT')} className="hover:text-orange-500 transition-colors">CONTACT</button>
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

      <div ref={containerRef} className="snap-container">
        {/* HERO */}
        <section id="HERO" className="snap-section flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-5 pointer-events-none">
            <div className="grid grid-cols-12 h-full w-full">
               {Array.from({length: 12}).map((_, i) => <div key={i} className="border-l border-white/50 h-full"></div>)}
            </div>
          </div>
          <AnimatedText 
            text={t.hero.title} 
            className="text-7xl md:text-9xl font-extrabold tracking-tighter"
            type="directional"
            direction="bottom"
          />
          <AnimatedText 
            text={t.hero.subtitle} 
            className="text-xs md:text-sm tracking-[0.5em] text-orange-500 mt-4 font-light"
            type="decode"
            delay={500}
          />
        </section>

        {/* ABOUT */}
        <section id="ABOUT" className="snap-section flex flex-col items-center justify-center px-10 md:px-0">
          <div className="max-w-2xl text-center">
            <AnimatedText 
              text={t.about.title} 
              className="text-4xl md:text-6xl font-bold mb-8" 
              direction="left"
            />
            <AnimatedText 
              text={t.about.description} 
              className="text-base md:text-lg leading-relaxed text-neutral-400 font-light"
              direction="right"
              delay={300}
            />
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="PORTFOLIO" className="snap-section flex flex-col items-center justify-center">
          <AnimatedText text={t.portfolio.title} className="text-4xl md:text-6xl font-bold mb-12" direction="top" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full px-10">
            {t.portfolio.items.map((item, i) => (
              <div key={i} className="group relative overflow-hidden aspect-[3/4] bg-neutral-900 border border-white/10 flex flex-col justify-end p-8 cursor-pointer">
                <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out opacity-20"></div>
                <div className="relative z-10">
                  <p className="text-[10px] text-orange-500 tracking-widest font-mono mb-2">{item.category}</p>
                  <h3 className="text-2xl font-bold leading-tight uppercase">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="CONTACT" className="snap-section flex flex-col items-center justify-center relative">
          <AnimatedText text={t.contact.title} className="text-5xl md:text-8xl font-black opacity-10 absolute top-20 select-none" />
          <div className="text-center">
            <a href={`mailto:${t.contact.email}`} className="text-3xl md:text-5xl font-bold hover:text-orange-500 transition-colors block mb-4 underline decoration-orange-500 underline-offset-8">
              {t.contact.email}
            </a>
            <p className="text-neutral-500 tracking-[0.3em] text-xs font-mono uppercase">{t.contact.social}</p>
          </div>

          <footer className="absolute bottom-10 left-0 w-full flex flex-col items-center space-y-4 px-6 text-xs text-neutral-500">
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
              <a href="#" className="hover:text-white transition-colors">GITHUB</a>
              <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
            </div>
            <p>© 2024 VON.CORE ALL RIGHTS RESERVED.</p>
          </footer>
        </section>
      </div>

      {/* Floating Button */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-10 right-10 z-50 w-14 h-14 bg-orange-500 text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
      >
        <span className="font-mono text-xl group-hover:animate-pulse">&gt;_</span>
      </button>

      {/* Terminal Overlay */}
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        onDevModeSuccess={handleDevModeOn}
        onDevModeOff={handleDevModeOff}
        isDevMode={mode === 'dev'}
      />
    </div>
  );
};

export default App;
