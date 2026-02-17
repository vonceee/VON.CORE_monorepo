import React, { useState } from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";
import Marquee from "react-fast-marquee";
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  X,
  FileText,
} from "lucide-react";
import aesImage from "../../assets/aes/aes_lnlbes.jpg";
import { motion, AnimatePresence } from "framer-motion";

const BADGES = [
  "https://img.shields.io/badge/Laravel-27272a?style=for-the-badge&logo=laravel&logoColor=white",
  "https://img.shields.io/badge/React-27272a?style=for-the-badge&logo=react&logoColor=white",
  "https://img.shields.io/badge/Angular-27272a?style=for-the-badge&logo=angular&logoColor=white",
  "https://img.shields.io/badge/Vite-27272a?style=for-the-badge&logo=vite&logoColor=white",
  "https://img.shields.io/badge/Tailwind_CSS-27272a?style=for-the-badge&logo=tailwind-css&logoColor=white",
  "https://img.shields.io/badge/TypeScript-27272a?style=for-the-badge&logo=typescript&logoColor=white",
  "https://img.shields.io/badge/HTML5-27272a?style=for-the-badge&logo=html5&logoColor=white",
  "https://img.shields.io/badge/CSS3-27272a?style=for-the-badge&logo=css3&logoColor=white",
  "https://img.shields.io/badge/JavaScript-27272a?style=for-the-badge&logo=javascript&logoColor=white",
  "https://img.shields.io/badge/PHP-27272a?style=for-the-badge&logo=php&logoColor=white",
];

const TECH_STACK = {
  Frameworks: [
    "https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white",
    "https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB",
    "https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white",
  ],
  Languages: [
    "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
    "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
    "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
    "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
    "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white",
  ],
  Tools: [
    "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white",
    "https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white",
  ],
  IDE: [
    "https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white",
    "https://img.shields.io/badge/Antigravity-000000?style=for-the-badge&logo=atom&logoColor=white", // Custom/Placeholder
  ],
  AI: [
    "https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white",
    "https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=anthropic&logoColor=white",
    "https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white",
  ],
};

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [isStackModalOpen, setIsStackModalOpen] = useState(false);

  return (
    <section
      id="ABOUT"
      className="min-h-screen w-full flex flex-col justify-center snap-start bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 pt-20"
    >
      <div className="w-full h-full p-4 md:p-8 lg:p-12 grow flex flex-col">
        <div className="grid grid-cols-12 grid-rows-10 border-5 border-white">
          <div className="col-start-6 col-span-7 row-start-1 row-end-9 row-span-4 bg-blue-500 relative z-10 flex items-end justify-end p-6">
            <h1 className="text-white text-6xl font-bold">FRONTENDDEVELOPER</h1>
          </div>

          <div className="col-start-3 col-span-4 row-start-6 row-span-3 bg-black z-20 flex border-r-5">
            <h1 className="text-white text-6xl font-monoton">VON CEDRIC</h1>
          </div>

          <div className="col-span-5 row-start-1 row-span-5 flex items-center justify-center text-6xl bg-red-500">
            TEXT 1
          </div>

          <div className="col-span-2 row-start-6 row-span-2 bg-yellow-500 p-4">
            Small Text
          </div>
          <div className="col-span-2 row-start-8 bg-orange-400 p-6 text-4xl font-bold">
            TEXT 2
          </div>
          <div className="col-span-12 row-start-9 row-span-3 bg-red-500 text-5xl font-bold flex items-center justify-center">
            MARQUEE
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
