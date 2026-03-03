import React, { useRef, useState, useEffect } from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useTheme } from "../../context/ThemeContext";
import Marquee from "react-fast-marquee";
import { Github, Linkedin, Facebook, Instagram, ChessPawn } from "lucide-react";
import aesImage from "../../assets/aes/aes_lnlbes.jpg";
import SpinningCube from "../../components/ui/SpinningCube";

const BADGES = {
  dark: [
    "https://img.shields.io/badge/Laravel-000000?style=for-the-badge&logo=laravel&logoColor=white",
    "https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=white",
    "https://img.shields.io/badge/Angular-000000?style=for-the-badge&logo=angular&logoColor=white",
  ],
  light: [
    "https://img.shields.io/badge/Laravel-FFFFFF?style=for-the-badge&logo=laravel&logoColor=black",
    "https://img.shields.io/badge/React-FFFFFF?style=for-the-badge&logo=react&logoColor=black",
    "https://img.shields.io/badge/Angular-FFFFFF?style=for-the-badge&logo=angular&logoColor=black",
  ],
};

interface AboutSectionProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

const AboutSection: React.FC<AboutSectionProps> = ({ scrollContainerRef }) => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const sectionRef = useRef<HTMLElement>(null);
  const [triggerText, setTriggerText] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerText(true);
        }
      },
      {
        root: scrollContainerRef?.current || null,
        threshold: 0.5,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [scrollContainerRef]);

  return (
    <section
      ref={sectionRef}
      id="ABOUT"
      className={`snap-section flex items-center justify-center relative overflow-hidden`}
    >
      <SpinningCube className="absolute inset-0 z-50 scale-125 transition-all duration-300 pt-35 pl-40 pointer-events-none" />
      <div className="w-full h-full flex">
        <div className="grid grid-cols-10 grid-rows-10 overflow-hidden">
          <div
            className={`col-span-6 row-start-1 row-span-4 p-4 pt-20 overflow-hidden bg-tech-dots flex flex-col justify-center`}
          >
            <div className="flex flex-wrap text-5xl font-bold leading-[1.2]">
              <AnimatedText
                text="elevate your digital"
                type="decode"
                speed={1}
                trigger={triggerText}
                className="inline mr-4 mb-2 md:mb-0"
              />
            </div>
            <div className="flex flex-wrap text-5xl font-bold leading-[1.2]">
              <AnimatedText
                text="experience with"
                type="decode"
                speed={1}
                trigger={triggerText}
                className="inline mr-4 mb-2 md:mb-0"
              />
              <AnimatedText
                text="VON.DEV"
                type="decode"
                speed={1}
                trigger={triggerText}
                blink={true}
                className="inline text-cyan-400"
              />
            </div>
          </div>
          {/* IMAGE BLOCK */}
          <div className="col-start-7 col-span-6 row-start-1 row-end-9 h-full relative z-10 flex items-end justify-end group">
            <img
              src={aesImage}
              className="absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-700 ease-in-out group-hover:scale-110 hover:scale-110"
              alt="Aesthetic"
            />
          </div>
          {/* NAME BLOCK  */}
          <div
            className={`col-start-4 col-span-5 row-start-5 row-span-4 z-20 border-r-2 border-t-2 ${isLight ? "border-t-black bg-white" : "border-t-white bg-black"} bg-tech-dots`}
          ></div>

          {/* SMALL BLOCKS */}
          <div className="grid grid-cols-2 md:contents">
            <div className="col-span-3 row-start-5 row-span-2 border-t-2 border-r-2 bg-tech-dots">
              <div className="w-full h-full flex flex-row items-center justify-start gap-4 sm:gap-6 p-4">
                <a
                  href="https://www.instagram.com/voncedric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center p-3 sm:p-4 rounded-full ${isLight ? "bg-black/5 border border-black/10 text-black/70 hover:text-white" : "bg-white/5 border border-white/10 text-white/70 hover:text-black"} hover:bg-cyan-400 hover:border-cyan-400 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] backdrop-blur-sm`}
                >
                  <Instagram
                    size={28}
                    className="transform group-hover:scale-110 transition-transform"
                  />
                </a>
                <a
                  href="https://www.facebook.com/people/VonDev/61585149598227/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center p-3 sm:p-4 rounded-full ${isLight ? "bg-black/5 border border-black/10 text-black/70 hover:text-white" : "bg-white/5 border border-white/10 text-white/70 hover:text-black"} hover:bg-cyan-400 hover:border-cyan-400 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] backdrop-blur-sm`}
                >
                  <Facebook
                    size={28}
                    className="transform group-hover:scale-110 transition-transform"
                  />
                </a>
                <a
                  href="https://www.chess.com/member/voncedric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center p-3 sm:p-4 rounded-full ${isLight ? "bg-black/5 border border-black/10 text-black/70 hover:text-white" : "bg-white/5 border border-white/10 text-white/70 hover:text-black"} hover:bg-cyan-400 hover:border-cyan-400 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] backdrop-blur-sm`}
                >
                  <ChessPawn
                    size={28}
                    className="transform group-hover:scale-110 transition-transform"
                  />
                </a>
              </div>
            </div>
            <div className="md:col-span-3 md:row-start-7 md:row-span-2 p-4 flex items-center justify-start gap-4 sm:gap-6 border-t-2 border-r-2 bg-tech-dots">
              <a
                href="https://github.com/vonceee"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center p-3 sm:p-4 rounded-full ${isLight ? "bg-black/5 border border-black/10 text-black/70 hover:text-white" : "bg-white/5 border border-white/10 text-white/70 hover:text-black"} hover:bg-cyan-400 hover:border-cyan-400 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] backdrop-blur-sm`}
              >
                <Github
                  size={28}
                  className="transform group-hover:scale-110 transition-transform"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/voncedric"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center p-3 sm:p-4 rounded-full ${isLight ? "bg-black/5 border border-black/10 text-black/70 hover:text-white" : "bg-white/5 border border-white/10 text-white/70 hover:text-black"} hover:bg-cyan-400 hover:border-cyan-400 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] backdrop-blur-sm`}
              >
                <Linkedin
                  size={28}
                  className="transform group-hover:scale-110 transition-transform"
                />
              </a>
            </div>
          </div>
          {/* MARQUEE FOOTER */}
          <div className="col-span-12 row-start-9 row-span-3 text-5xl font-bold flex items-center justify-center border-t-2 min-h-[100px] order-5 md:order-none">
            <Marquee
              gradient={false}
              speed={50}
              direction="left"
              pauseOnHover={true}
              className="flex items-center gap-4 py-2"
            >
              <div className="flex gap-4 pr-4">
                {(isLight ? BADGES.light : BADGES.dark).map((badge, index) => (
                  <img
                    key={index}
                    src={badge}
                    alt="Tech Badge"
                    className="h-20"
                  />
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
