import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Activity,
  CheckCircle,
  Server,
  Shield,
  Zap,
  Box,
} from "lucide-react";
import { usePersona } from "../../../hooks/usePersona";

const TOOLS = [
  {
    id: "MAGNETIC",
    name: "Magnetic",
    status: "Active",
    type: "Timeline Maker",
  },
  {
    id: "LUCKY_GIRL",
    name: "Lucky Girl Syndrome",
    status: "Deployed",
    type: "Exp",
  },
  {
    id: "MIDNIGHT",
    name: "Midnight Fiction",
    status: "Stable",
    type: "Workflow Maker",
  },
  {
    id: "MY_WORLD",
    name: "My World",
    status: "Online",
    type: "Note Taking App",
  },
  {
    id: "NOT_CUTE",
    name: "Not Cute Anymore",
    status: "Legacy",
    type: "Routine Maker",
  },
  {
    id: "NOT_ME",
    name: "Not Me",
    status: "Hidden",
    type: "Habit Tracker",
  },
  {
    id: "SUNDAY",
    name: "Sunday Morning",
    status: "Live",
    type: "Brochureware",
  },
];

const LiveStatus: React.FC = () => {
  const { persona } = usePersona();
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="h-full w-full bg-neutral-900 border border-white/10 p-6 flex flex-col relative overflow-hidden group">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 z-10">
        <div className="flex items-center gap-2">
          {persona === "developer" ? (
            <Terminal className="text-orange-500 w-5 h-5" />
          ) : (
            <Activity className="text-green-500 w-5 h-5" />
          )}
          <span className="font-mono text-sm tracking-wider text-neutral-400 uppercase">
            {persona === "developer" ? "Active Modules" : "System Status"}
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {persona === "developer" ? (
          <motion.div
            key="tools"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto pr-2 custom-scrollbar font-mono text-xs relative"
          >
            <div className="space-y-2">
              <div className="grid grid-cols-12 text-neutral-600 uppercase tracking-wider mb-3 px-2">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Module</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-3 text-right">Status</div>
              </div>

              {TOOLS.map((tool, i) => (
                <motion.div
                  key={tool.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  className={`grid grid-cols-12 items-center p-2 rounded transition-colors cursor-default ${
                    hoveredTool === tool.id ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  <div className="col-span-1 text-neutral-500">
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                  <div
                    className={`col-span-5 font-bold ${hoveredTool === tool.id ? "text-orange-400" : "text-neutral-300"}`}
                  >
                    {tool.name}
                  </div>
                  <div className="col-span-3 text-neutral-500 flex items-center gap-1">
                    <Box className="w-3 h-3" />
                    {tool.type}
                  </div>
                  <div className="col-span-3 text-right">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] uppercase ${
                        tool.status === "Active" ||
                        tool.status === "Live" ||
                        tool.status === "Online"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-neutral-700/50 text-neutral-400"
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex gap-4 text-neutral-500">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-orange-500" />
                <span>7 Modules Loaded</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>System Stable</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center gap-6"
          >
            <StatusItem
              icon={<CheckCircle className="w-5 h-5 text-green-500" />}
              label="System Uptime"
              value="99.9%"
            />
            <StatusItem
              icon={<Server className="w-5 h-5 text-blue-500" />}
              label="Architecture"
              value="Scalable Microservices"
            />
            <StatusItem
              icon={<Shield className="w-5 h-5 text-purple-500" />}
              label="Security"
              value="Enterprise Grade"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-white/5 pointer-events-none" />
    </div>
  );
};

const StatusItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-neutral-400 text-sm font-medium">{label}</span>
    </div>
    <span className="text-white font-bold">{value}</span>
  </div>
);

export default LiveStatus;
