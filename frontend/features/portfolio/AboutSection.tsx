import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";
import Marquee from "react-fast-marquee";
import { Github, Linkedin, Facebook, Instagram, ChessPawn } from "lucide-react";
import aesImage from "../../assets/aes/aes_lnlbes.jpg";
import CubeCursor from "../../components/ui/CubeCursor";

const BADGES = [
  "https://img.shields.io/badge/Laravel-000000?style=for-the-badge&logo=laravel&logoColor=white",
  "https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=white",
  "https://img.shields.io/badge/Angular-000000?style=for-the-badge&logo=angular&logoColor=white",
  "https://img.shields.io/badge/JavaScript-000000?style=for-the-badge&logo=javascript&logoColor=white",
  "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white",
];

interface AboutSectionProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

const AboutSection: React.FC<AboutSectionProps> = ({ scrollContainerRef }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [triggerText, setTriggerText] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef,
    offset: ["start end", "start start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.5 && !triggerText) {
      setTriggerText(true);
    }
  });

  // Animations
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const imageBrightness = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const blockScale = useTransform(scrollYProgress, [0.2, 1], [0.8, 1]);
  const blockOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="ABOUT"
      className="h-screen w-screen relative flex flex-col justify-center snap-start dark:bg-black dark:text-white transition-colors duration-500 pt-20"
    >
      <CubeCursor className="absolute inset-0 w-full h-full z-50 pointer-events-none scale-120" />
      <div className="w-full h-full p-4 md:p-8 lg:p-12 grow flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-10 md:h-full overflow-hidden rounded-3xl">
          <motion.div
            style={{ scale: blockScale, opacity: blockOpacity }}
            className="md:col-span-6 md:row-start-1 md:row-span-4 w-full h-auto md:h-full p-4 order-2 md:order-none overflow-hidden bg-black bg-tech-dots flex flex-col justify-center"
          >
            <div className="flex flex-wrap items-baseline">
              <p className="text-2xl md:text-4xl lg:text-6xl font-bold text-white leading-[1.2]">
                elevate your digital experience with{" "}
                <span className="text-cyan-400">VON.DEV</span>
              </p>
            </div>
            <div className="p-2 text-base sm:text-sm md:text-base lg:text-lg text-gray-300">
              <AnimatedText
                text={t.about.description}
                type="decode"
                speed={3}
                trigger={triggerText}
              />
            </div>
          </motion.div>
          {/* IMAGE BLOCK */}
          <div className="md:col-start-7 md:col-span-6 row-start-1 md:row-end-9 md:h-full relative z-10 flex items-end justify-end">
            <motion.img
              style={{
                scale: imageScale,
                filter: useTransform(
                  imageBrightness,
                  (b) => `brightness(${b})`,
                ),
              }}
              src={aesImage}
              className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Aesthetic"
            />
          </div>
          {/* NAME BLOCK  */}
          <motion.div
            style={{ scale: blockScale, opacity: blockOpacity }}
            className="md:col-start-4 md:col-span-5 md:row-start-5 md:row-span-4 bg-black z-20 flex flex-col border-r-2 border-t-2 border-t-white order-3 md:order-none overflow-hidden relative p-4"
          >
            <div className="flex-grow flex justify-center"></div>
            <div className="w-full flex justify-end">
              <div className="text-base sm:text-sm md:text-base lg:text-lg text-gray-300 text-right">
                <AnimatedText
                  text="読めないけど、見た目はかっこいい"
                  type="decode"
                  direction="bottom"
                  delay={200}
                  speed={3}
                  trigger={triggerText}
                />
              </div>
            </div>
          </motion.div>

          {/* SMALL BLOCKS */}
          <div className="grid grid-cols-2 md:contents order-4 md:order-none ">
            <motion.div
              style={{ scale: blockScale, opacity: blockOpacity }}
              className="md:col-span-3 md:row-start-5 md:row-span-2 border-t-2 border-r-2 bg-tech-dots"
            >
              <div className="w-full h-full flex flex-row items-center justify-center gap-4 p-4">
                <a
                  href="https://github.com/vonceee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-black/20 text-gray-600 hover:text-white hover:bg-black dark:text-gray-300 dark:hover:text-black dark:hover:bg-white transition-all duration-300 p-2 rounded-lg"
                >
                  <Github
                    size={32}
                    className="transform group-hover transition-transform"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/voncedric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-black/20 text-gray-600 hover:text-white hover:bg-[#0077b5] dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#0077b5] transition-all duration-300 p-2 rounded-lg"
                >
                  <Linkedin
                    size={32}
                    className="transform group-hover transition-transform"
                  />
                </a>
                <a
                  href="https://www.instagram.com/voncedric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-black/20 text-gray-600 hover:text-white hover:bg-[#E1306C] dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#E1306C] transition-all duration-300 p-2 rounded-lg"
                >
                  <Instagram
                    size={32}
                    className="transform group-hover transition-transform"
                  />
                </a>
                <a
                  href="https://www.facebook.com/people/VonDev/61585149598227/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-black/20 text-gray-600 hover:text-white hover:bg-[#1877F2] dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#1877F2] transition-all duration-300 p-2 rounded-lg"
                >
                  <Facebook
                    size={32}
                    className="transform group-hover transition-transform"
                  />
                </a>
                <a
                  href="https://www.chess.com/member/voncedric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-black/20 text-gray-600 hover:text-white hover:bg-[#7FA650] dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#7FA650] transition-all duration-300 p-2 rounded-lg"
                >
                  <ChessPawn
                    size={32}
                    className="transform group-hover transition-transform"
                  />
                </a>
              </div>
            </motion.div>
            <motion.div
              style={{ scale: blockScale, opacity: blockOpacity }}
              className="md:col-span-3 md:row-start-7 md:row-span-2 p-4 font-kumar flex items-end border-t-2 border-r-2 bg-tech-dots"
            >
              <AnimatedText
                text="FRONTEND"
                className="text-2xl md:text-4xl font-bold w-full text-right"
                type="decode"
                delay={400}
                trigger={triggerText}
              />
            </motion.div>
          </div>
          {/* MARQUEE FOOTER */}
          <motion.div
            style={{ opacity: blockOpacity }}
            className="md:col-span-12 md:row-start-9 md:row-span-3 text-5xl font-bold flex items-center justify-center border-t-2 min-h-[100px] order-5 md:order-none"
          >
            <Marquee
              gradient={false}
              speed={40}
              direction="left"
              pauseOnHover={true}
              className="flex items-center gap-4 py-2"
            >
              <div className="flex gap-4 pr-4">
                {BADGES.map((badge, index) => (
                  <img
                    key={index}
                    src={badge}
                    alt="Tech Badge"
                    className="h-32 md:h-32 lg:h-22 w-auto object-contain shrink-0"
                  />
                ))}
              </div>
            </Marquee>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
