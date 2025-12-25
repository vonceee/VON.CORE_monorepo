import React from "react";
import { Tool } from "../../../types/index";

interface SidebarProps {
  activeTool: Tool;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTool }) => {
  return (
    <div className="w-64 bg-[#252526] border-r border-black/20 flex flex-col animate-slideRight">
      <div className="h-9 flex items-center px-4 text-[11px] font-bold text-[#bbbbbb] tracking-wider uppercase bg-[#252526]">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Sidebar Header for Tool */}
        <div className="group px-2 py-1 cursor-pointer flex items-center text-xs font-bold text-white hover:bg-[#37373d]">
          <span className="text-white/60 mr-1 transform rotate-90">›</span>
          {activeTool.label.toUpperCase()}
        </div>

        {/* Sidebar Content */}
        <div className="px-0">
          {activeTool.sidebarComponent ? (
            <activeTool.sidebarComponent />
          ) : (
            <div className="p-4 text-xs text-[#858585] italic">
              No explorer view ({activeTool.label})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
