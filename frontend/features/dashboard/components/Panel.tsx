import React from "react";

export const Panel: React.FC = () => {
  return (
    <div className="h-48 bg-[#181818] border-t border-[#2B2B2B] flex flex-col">
      {/* Panel Header/Tabs */}
      <div className="flex text-xs border-b border-[#2B2B2B] bg-[#1e1e1e]">
        <div className="px-3 py-2 text-white border-b border-blue-500 cursor-pointer">
          TERMINAL
        </div>
        <div className="px-3 py-2 text-[#888888] hover:text-[#cccccc] cursor-pointer">
          OUTPUT
        </div>
        <div className="px-3 py-2 text-[#888888] hover:text-[#cccccc] cursor-pointer">
          DEBUG CONSOLE
        </div>
        <div className="px-3 py-2 text-[#888888] hover:text-[#cccccc] cursor-pointer">
          PROBLEMS
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 p-2 font-mono text-xs text-[#cccccc] overflow-auto">
        <div>Microsoft Windows [Version 10.0.19045.3693]</div>
        <div>(c) Microsoft Corporation. All rights reserved.</div>
        <br />
        <div>C:\Users\User\Project&gt; _</div>
      </div>
    </div>
  );
};
