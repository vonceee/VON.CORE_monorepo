import React from "react";
import { Tool } from "../../../types/index";

interface SidebarProps {
  activeTool: Tool;
  width: number;
  onResizeStart: (e: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTool,
  width,
  onResizeStart,
}) => {
  return (
    <div
      style={{ width }}
      className="bg-[#252526] border-r border-black/20 flex flex-col relative shrink-0"
    >
      <div className="h-9 flex items-center px-4 text-[11px] font-bold text-[#bbbbbb] tracking-wider uppercase bg-[#252526] select-none">
        Explorer
      </div>
      <div className="flex-1 overflow-y-hidden flex flex-col">
        {/* Sidebar Header for Tool */}
        <div className="group px-2 py-1 cursor-pointer flex items-center text-xs font-bold text-white hover:bg-[#37373d]">
          <span className="text-white/60 mr-1 transform rotate-90">›</span>
          {activeTool.label.toUpperCase()}
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 min-h-0 p-2">
          <div className="h-full rounded-lg border border-white/20 p-1">
            {activeTool.sidebarComponent ? (
              <div className="h-full w-full rounded overflow-hidden">
                <activeTool.sidebarComponent />
              </div>
            ) : (
              <div className="p-4 text-xs text-[#858585] italic">
                No explorer view ({activeTool.label})
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={onResizeStart}
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#007fd4] z-10 transition-colors duration-150 delay-100"
      />
    </div>
  );
};
