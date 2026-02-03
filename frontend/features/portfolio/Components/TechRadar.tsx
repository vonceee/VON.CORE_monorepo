import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Box, Globe, Cpu } from "lucide-react";
import { usePersona } from "../../../hooks/usePersona";

const TechRadar: React.FC = () => {
  const { persona } = usePersona();

  const devSkills = [
    {
      name: "React 18",
      icon: <Layout className="w-4 h-4" />,
      level: "Advanced",
    },
    {
      name: "TypeScript",
      icon: <Code2 className="w-4 h-4" />,
      level: "Expert",
    },
    {
      name: "Node.js",
      icon: <ServerIcon className="w-4 h-4" />,
      level: "Proficient",
    },
    {
      name: "PostgreSQL",
      icon: <Database className="w-4 h-4" />,
      level: "Intermediate",
    },
    { name: "Monorepo", icon: <Box className="w-4 h-4" />, level: "Architect" },
    {
      name: "AI Integration",
      icon: <Cpu className="w-4 h-4" />,
      level: "Specialist",
    },
  ];

  const hrSkills = [
    {
      name: "Frontend Development",
      icon: <Layout className="w-4 h-4" />,
      desc: "Building responsive, modern UIs",
    },
    {
      name: "Full Stack",
      icon: <Globe className="w-4 h-4" />,
      desc: "End-to-end application delivery",
    },
    {
      name: "System Architecture",
      icon: <Box className="w-4 h-4" />,
      desc: "Scalable & maintainable code",
    },
    {
      name: "AI Solutions",
      icon: <Cpu className="w-4 h-4" />,
      desc: "Integrating LLMs into workflows",
    },
  ];

  return (
    <div className="h-full w-full bg-neutral-900 border border-white/10 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white tracking-tight">
          {persona === "developer" ? "Tech Stack Radar" : "Core Competencies"}
        </h3>
        <Cpu
          className={`w-6 h-6 ${persona === "developer" ? "text-orange-500" : "text-blue-500"}`}
        />
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto">
        {persona === "developer"
          ? devSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 p-3 rounded hover:bg-white/10 transition-colors group cursor-default"
              >
                <div className="flex items-center gap-2 mb-1 text-orange-400 group-hover:text-orange-300">
                  {skill.icon}
                  <span className="text-xs font-mono uppercase opacity-70">
                    Stack
                  </span>
                </div>
                <div className="font-bold text-white text-sm">{skill.name}</div>
                <div className="text-xs text-neutral-500 mt-1">
                  {skill.level}
                </div>
              </motion.div>
            ))
          : hrSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/0 p-4 rounded-lg border border-white/5 col-span-2 sm:col-span-1"
              >
                <div className="flex items-center gap-3 mb-2 text-blue-400">
                  {skill.icon}
                  <span className="font-semibold text-white">{skill.name}</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {skill.desc}
                </p>
              </motion.div>
            ))}
      </div>
    </div>
  );
};

const ServerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);

export default TechRadar;
