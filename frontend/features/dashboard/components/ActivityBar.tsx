import React from "react";
import { Tool } from "../../../types/index";
import { LogOut } from "lucide-react";

interface ActivityBarProps {
  tools: Tool[];
  activeToolId: string;
  isSidebarOpen: boolean;
  onToolClick: (toolId: string) => void;
  onExit: () => void;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({
  tools,
  activeToolId,
  isSidebarOpen,
  onToolClick,
  onExit,
}) => {
  return (
    <div className="w-12 bg-[#181818] border-r border-[#2B2B2B] flex flex-col items-center py-4 space-y-4 z-20">
      {tools.map((tool) => (
        <button
          key={tool.id}
          title={tool.label}
          onClick={() => onToolClick(tool.id)}
          className={`p-2 transition-all relative rounded-md bg-transparent ${
            activeToolId === tool.id && isSidebarOpen
              ? "text-white bg-white/10"
              : "text-white/25 hover:text-white hover:bg-white/5"
          }`}
        >
          {tool.icon}
        </button>
      ))}

      <div className="flex-1"></div>
      <button
        onClick={onExit}
        className="p-2 text-[#858585] hover:text-white"
        title="Exit Dev Mode"
      >
        <LogOut size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
};
