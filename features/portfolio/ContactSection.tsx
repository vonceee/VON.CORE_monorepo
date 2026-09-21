import React from "react";
import { Github, Linkedin, Mail, ChessPawn, ArrowUpRight } from "lucide-react";

const ContactSection: React.FC = () => {
  return (
    <section
      id="CONTACT"
      className="snap-section min-h-screen w-full flex items-center justify-center relative overflow-hidden px-6 sm:px-10 lg:px-16 py-20 sm:py-28"
    >
      <div className="w-full max-w-4xl flex flex-col items-center text-center justify-center">
        {/* Section Indicator in Brittany Chiang Line Accent Style */}
        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-cyan-400 mb-6 sm:mb-8">
          <span className="w-12 sm:w-16 h-px bg-cyan-400 inline-block" />
          <span>CONTACT</span>
          <span className="w-12 sm:w-16 h-px bg-cyan-400 inline-block" />
        </div>

        {/* Section Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          GET IN <span className="text-cyan-400">TOUCH</span>
        </h2>

        {/* Narrative Prose Invitation */}
        <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed sm:leading-8 max-w-2xl mb-8 sm:mb-10">
          I am currently seeking full-stack and frontend engineering opportunities where I can contribute
          clean, maintainable code to high-impact products. Whether you have an open role, an architectural
          challenge, or simply want to talk about modern web standards or chess strategies, my inbox is always open.
        </p>

        {/* Minimalist Social Icon Row */}
        <div className="flex items-center justify-center gap-6 text-neutral-400 pt-2">
          <a
            href="https://github.com/vonceee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/von-cedric-ra%C3%B1ola-3908222aa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="https://www.chess.com/member/yunahafk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chess.com Profile"
            className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
          >
            <ChessPawn size={22} />
          </a>
          <a
            href="mailto:alonarvoncedric@gmail.com"
            aria-label="Email Von Cedric Rañola"
            className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
          >
            <Mail size={22} />
          </a>
        </div>

        {/* Minimalist Footer */}
        <footer className="mt-16 sm:mt-20 pt-8 border-t border-white/5 w-full text-center text-xs sm:text-sm text-neutral-500 font-light">
          <p>
            @2024
          </p>
          <p className="mt-1 text-neutral-600 text-xs">
            Built with React, TypeScript &amp; Tailwind CSS
          </p>
        </footer>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
