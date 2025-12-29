import React from "react";

interface StatusBarProps {
  activeTabCount: number;
  mode?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activeTabCount,
  mode = "DEV",
}) => {
  return (
    <div className="h-6 bg-orange-600 text-black text-[11px] flex items-center px-4 justify-between font-medium z-50">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="mr-1">⎇</span> dev-branch
        </div>
        <div className="flex items-center space-x-1">
          <span>{activeTabCount} Active Tabs</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="uppercase tracking-tighter">
          VON.CORE CORE-ENGINE-1.0
        </div>
        <div>UTF-8</div>
        <div className="font-bold">MODE: {mode}</div>
      </div>
    </div>
  );
};
