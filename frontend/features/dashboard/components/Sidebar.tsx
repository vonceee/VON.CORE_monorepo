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
      className="bg-[#181818] border-r border-[#2B2B2B] flex flex-col relative shrink-0"
    >
      <div className="flex-1 overflow-y-hidden flex flex-col mt-2">
        {/* Sidebar Header for Tool */}
        <div className="group px-2 py-1 flex items-center text-md ml-2 font-mono text-white">
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
