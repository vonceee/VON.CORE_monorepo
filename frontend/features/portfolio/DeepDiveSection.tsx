import React from "react";
import { motion } from "framer-motion";
import { usePersona } from "../../hooks/usePersona";
import { useLanguage } from "../../context/LanguageContext";
import LiveStatus from "./components/LiveStatus";
import TechRadar from "./components/TechRadar";
import {
  User,
  Code2,
  GitBranch,
  ListTodo,
  Workflow,
  Settings2,
  Atom,
  Database,
  FileCode,
  Palette,
  Server,
  Layers,
  Cpu,
  Terminal,
  Globe,
} from "lucide-react";
import AnimatedText from "../../components/ui/AnimatedText";
import aesImage from "../../assets/aes/aes_lnlbes.jpg";

const TOOL_STACK = [
  { name: "GitHub", icon: <GitBranch className="w-4 h-4" />, color: "#242938" },
  { name: "Jira", icon: <ListTodo className="w-4 h-4" />, color: "#0052CC" },
  { name: "n8n", icon: <Workflow className="w-4 h-4" />, color: "#ea4b71" },
  { name: "React", icon: <Atom className="w-4 h-4" />, color: "#61DAFB" },
  { name: "TS", icon: <Code2 className="w-4 h-4" />, color: "#3178C6" },
  {
    name: "JS",
    icon: <FileCode className="w-4 h-4" />,
    color: "#F7DF1E",
    text: "black",
  },
  { name: "HTML", icon: <Globe className="w-4 h-4" />, color: "#E34F26" },
  { name: "CSS", icon: <Palette className="w-4 h-4" />, color: "#1572B6" },
  { name: "Laravel", icon: <Layers className="w-4 h-4" />, color: "#FF2D20" },
  { name: "PHP", icon: <Server className="w-4 h-4" />, color: "#777BB4" },
  { name: "MySQL", icon: <Database className="w-4 h-4" />, color: "#4479A1" },
  { name: "Python", icon: <Terminal className="w-4 h-4" />, color: "#3776AB" },
  { name: "Angular", icon: <Layers className="w-4 h-4" />, color: "#DD0031" },
  { name: "C", icon: <Cpu className="w-4 h-4" />, color: "#555555" },
  { name: "C++", icon: <Cpu className="w-4 h-4" />, color: "#00599C" },
  { name: "C#", icon: <Cpu className="w-4 h-4" />, color: "#178600" },
];

const DeepDiveSection: React.FC = () => {
  const { persona } = usePersona();
  const { t } = useLanguage();

  return (
    <section
      id="DEEP_DIVE"
      className="snap-section flex flex-col items-center justify-center py-20 bg-neutral-950 relative overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="w-full max-w-7xl px-6 relative z-10 font-sans">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <AnimatedText
              text="DEEP DIVE"
              className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-2"
              type="decode"
            />
            <p className="text-neutral-400 max-w-md">
              {persona === "developer"
                ? "explore technical specifications."
                : "A comprehensive overview of capabilities, system health, and professional impact."}
            </p>
          </div>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto md:h-[600px]">
          {/* Live Status / Terminal (Large Block) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 h-full"
          >
            <LiveStatus />
          </motion.div>

          {/* Tech Radar (Medium Block) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 h-full"
          >
            <TechRadar />
          </motion.div>

          {/* Stat Cards (Small Blocks Stacked) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 flex flex-col gap-4 h-full">
            {/* Box A: Workflow / Tools */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-neutral-900 border border-white/10 p-6 flex-1 flex flex-col justify-between group hover:border-white/20 transition-colors relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                <Workflow className="w-20 h-20 -rotate-12" />
              </div>

              <div className="flex justify-between items-start z-10">
                <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider">
                  Operational Stack
                </span>
                <div className="p-1.5 bg-white/5 rounded">
                  <Settings2 className="w-4 h-4 text-neutral-300" />
                </div>
              </div>

              <div className="mt-8 z-10 w-full overflow-hidden mask-gradient flex flex-col gap-4">
                {/* Row 1 */}
                <motion.div
                  className="flex gap-6 w-max"
                  animate={{ x: "-50%" }}
                  transition={{
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {[
                    ...TOOL_STACK.slice(0, 8),
                    ...TOOL_STACK.slice(0, 8),
                    ...TOOL_STACK.slice(0, 8),
                  ].map((tool, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 min-w-[60px] group/icon"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 group-hover/icon:border-white/30 transition-colors shadow-sm"
                        style={{ backgroundColor: tool.color }}
                      >
                        <div
                          className={
                            tool.text === "black" ? "text-black" : "text-white"
                          }
                        >
                          {React.cloneElement(tool.icon as React.ReactElement, {
                            className: "w-6 h-6",
                          })}
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-tight">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Row 2 */}
                <motion.div
                  className="flex gap-6 w-max"
                  initial={{ x: "-50%" }}
                  animate={{ x: "0%" }}
                  transition={{
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {[
                    ...TOOL_STACK.slice(8),
                    ...TOOL_STACK.slice(8),
                    ...TOOL_STACK.slice(8),
                  ].map((tool, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 min-w-[60px] group/icon"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 group-hover/icon:border-white/30 transition-colors shadow-sm"
                        style={{ backgroundColor: tool.color }}
                      >
                        <div
                          className={
                            tool.text === "black" ? "text-black" : "text-white"
                          }
                        >
                          {React.cloneElement(tool.icon as React.ReactElement, {
                            className: "w-6 h-6",
                          })}
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-tight">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Box B */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-neutral-900 border border-white/10 flex-1 flex flex-col justify-between group hover:border-white/20 transition-colors relative overflow-hidden p-0"
            >
              <img
                src={aesImage}
                alt="Current Focus"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              <div className="relative z-10 p-6 mt-auto">
                <span className="text-primary/80 text-xs font-mono uppercase tracking-wider mb-1 block">
                  Current Focus
                </span>
                <h4 className="text-xl font-bold text-white leading-tight">
                  Aesthetics
                </h4>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeepDiveSection;
