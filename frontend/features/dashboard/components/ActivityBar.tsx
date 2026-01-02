import React from "react";
import { Tool } from "../../../types/index";

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
    <div className="w-12 bg-[#09090b] flex flex-col items-center py-4 space-y-4 z-20">
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
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </div>
  );
};
