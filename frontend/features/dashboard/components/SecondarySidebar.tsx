import React from "react";

export const SecondarySidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#181818] border-l border-[#2B2B2B] flex flex-col h-full">
      {/* Header */}
      <div className="h-9 min-h-[36px] px-4 flex items-center text-xs font-semibold text-[#bbbbbb]">
        AGENT
      </div>

      {/* Content */}
      <div className="flex-1 p-4 text-sm text-[#888888] flex flex-col items-center justify-center text-center">
        <p>agent is not ready.</p>
        <p className="mt-2 text-xs opacity-70">to be implemented...</p>
      </div>
    </div>
  );
};
