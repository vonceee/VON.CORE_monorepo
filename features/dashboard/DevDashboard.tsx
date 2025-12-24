import React, { useState } from "react";
import { TOOLS_CONFIG } from "./toolRegistry";

interface DevDashboardProps {
  onExit: () => void;
}

const DevDashboard: React.FC<DevDashboardProps> = ({ onExit }) => {
  const [activeToolId, setActiveToolId] = useState<string>(TOOLS_CONFIG[0].id);

  const activeTool =
    TOOLS_CONFIG.find((tool) => tool.id === activeToolId) || TOOLS_CONFIG[0];

  return (
    <div className="fixed inset-0 z-[60] bg-[#1e1e1e] text-[#cccccc] flex flex-col font-sans select-none overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 space-y-4">
          {TOOLS_CONFIG.map((tool) => (
            <button
              key={tool.id}
              title={tool.label}
              onClick={() => setActiveToolId(tool.id)}
              className={`p-2 transition-colors ${
                activeToolId === tool.id
                  ? "text-white border-l-2 border-orange-500"
                  : "text-[#858585] hover:text-white"
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

        {/* Sidebar */}
        <div className="w-64 bg-[#252526] border-r border-black/20 flex flex-col">
          <div className="p-3 text-[11px] font-bold text-[#bbbbbb] tracking-wider uppercase">
            Explorer
          </div>
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            <div className="p-1 px-2 text-xs hover:bg-[#37373d] rounded cursor-pointer flex items-center group">
              <span className="text-orange-500 mr-2">▼</span>
              <span className="font-semibold">
                {activeTool.label.toUpperCase()}
              </span>
            </div>
            {activeTool.sidebarComponent && <activeTool.sidebarComponent />}
            {!activeTool.sidebarComponent && (
              <div className="p-2 text-xs text-[#858585] italic">
                No explorer view
              </div>
            )}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          <div className="h-9 bg-[#2d2d2d] flex items-center px-4 space-x-2 border-b border-black/20">
            <div className="flex items-center space-x-2 bg-[#1e1e1e] h-full px-4 border-t border-orange-500 text-xs">
              <span className="text-orange-500">◈</span>
              <span>{activeTool.label.replace(/ /g, "_")}.ts</span>
            </div>
          </div>
          <div className="flex-1 p-10 flex flex-col overflow-y-auto animate-fadeIn">
            <activeTool.component />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-orange-600 text-black text-[11px] flex items-center px-4 justify-between font-medium">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-1">⎇</span> dev-branch
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="uppercase tracking-tighter">
            VON.CORE CORE-ENGINE-1.0
          </div>
          <div>UTF-8</div>
          <div className="font-bold">MODE: DEV</div>
        </div>
      </div>
    </div>
  );
};

export default DevDashboard;
