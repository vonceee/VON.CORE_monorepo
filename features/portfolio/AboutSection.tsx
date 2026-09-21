import React from "react";
import { Github, Linkedin, Mail, ChessPawn } from "lucide-react";

interface AboutSectionProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section
      id="ABOUT"
      className="snap-section min-h-screen w-full flex items-center justify-center relative overflow-hidden px-6 sm:px-10 lg:px-16 py-16 sm:py-24"
    >
      <div className="w-full max-w-6xl xl:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column (Sticky Desktop Sidebar): Section Header, Profile & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:sticky lg:top-28 gap-8 lg:gap-10">
            <div>
              {/* Section Header in Brittany Chiang Line Accent Style */}
              <div className="flex items-center gap-4 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-cyan-400 mb-6 sm:mb-8">
                <span className="w-12 sm:w-16 h-px bg-cyan-400 inline-block" />
                <span>ABOUT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
                VON CEDRIC <span className="text-cyan-400">RAÑOLA</span>
              </h2>
              <p className="text-base sm:text-lg font-medium text-neutral-200 mb-4">
                Junior Full-Stack Developer
              </p>
            </div>

            {/* Minimalist Social Icon Row */}
            <div className="flex items-center gap-6 text-neutral-400 pt-2">
              <a
                href="https://github.com/vonceee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/von-cedric-ra%C3%B1ola-3908222aa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.chess.com/member/yunahafk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chess.com Profile"
                className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
              >
                <ChessPawn size={20} />
              </a>
              <a
                href="mailto:alonarvoncedric@gmail.com"
                aria-label="Email Von Cedric Rañola"
                className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Brittany Chiang Multi-Paragraph Editorial Prose */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-neutral-400 text-base sm:text-lg font-light leading-relaxed sm:leading-8">
            <p>
              Hi there! I&apos;m Von, and I build websites, desktop apps, and systems. I&apos;m a junior
              full-stack developer with a passion for crafting thoughtful, accessible, and high-performance
              digital experiences. I care deeply about details like fluid interactions, zero layout shift,
              and intuitive visual hierarchies—that separate a good web app from an exceptional one.
            </p>

            <p>
              Currently, my core focus revolves around building responsive, reactive applications using modern
              frontend technologies like{" "}
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 font-medium hover:text-cyan-400 focus-visible:text-cyan-400 transition-colors"
              >
                React
              </a>
              ,{" "}
              <a
                href="https://angular.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 font-medium hover:text-cyan-400 focus-visible:text-cyan-400 transition-colors"
              >
                Angular
              </a>
              , and{" "}
              <a
                href="https://www.typescriptlang.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 font-medium hover:text-cyan-400 focus-visible:text-cyan-400 transition-colors"
              >
                TypeScript
              </a>
              , styled with {" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 font-medium hover:text-cyan-400 focus-visible:text-cyan-400 transition-colors"
              >
                Tailwind CSS
              </a>
              . On the server side, I engineer structured, resilient backends using{" "}
              <a
                href="https://www.php.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 font-medium hover:text-cyan-400 focus-visible:text-cyan-400 transition-colors"
              >
                PHP
              </a>{" "}
              and{" "}
              <a
                href="https://laravel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 font-medium hover:text-cyan-400 focus-visible:text-cyan-400 transition-colors"
              >
                Laravel
              </a>
              , powered by{" "}
              <a
                href="https://www.mysql.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 font-medium hover:text-cyan-400 focus-visible:text-cyan-400 transition-colors"
              >
                MySQL
              </a>{" "}
              and well-documented{" "}
              <span className="text-neutral-200 font-medium hover:text-cyan-400 transition-colors">
                RESTful APIs
              </span>
              .
            </p>

            <p>
              I have honed my craft through hands-on industry internship experience. At{" "}
              <span className="text-neutral-200 font-medium hover:text-cyan-400 transition-colors">
                Perksmania Marketing Corp
              </span>
              , I standardized frontend architecture by developing 15+ modular, reusable UI components with
              strict TypeScript contracts. At{" "}
              <span className="text-neutral-200 font-medium hover:text-cyan-400 transition-colors">
                Hytec Power Inc.
              </span>
              , I audited database queries, introduced compound indexing, and streamlined Eloquent ORM
              relationships, cutting API response latency by approximately ~30%.
            </p>

            <p>
              In my spare time, you can usually find me playing
              rapid chess on{" "}
              <a
                href="https://www.chess.com/member/yunahafk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 font-medium hover:text-cyan-400 focus-visible:text-cyan-400 transition-colors"
              >
                Chess.com
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(AboutSection);
