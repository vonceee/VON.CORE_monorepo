import React from "react";
import {
  Settings,
  Sidebar,
  PanelBottom,
  PanelRight,
  Search,
} from "lucide-react";
import VonLogo from "../../../assets/logo/von_logo.svg";

interface TopBarProps {
  onTogglePrimarySidebar: () => void;
  onTogglePanel: () => void;
  onToggleSecondarySidebar: () => void;
  isPrimarySidebarOpen: boolean;
  isPanelOpen: boolean;
  isSecondarySidebarOpen: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onTogglePrimarySidebar,
  onTogglePanel,
  onToggleSecondarySidebar,
  isPrimarySidebarOpen,
  isPanelOpen,
  isSecondarySidebarOpen,
}) => {
  return (
    <div className="h-9 min-h-[36px] bg-[#181818] flex items-center justify-between px-2 select-none border-b border-[#2B2B2B]">
      {/* Left Section (Logo) */}
      <div className="flex items-center">
        <img
          src={VonLogo}
          alt="VON"
          className="h-5 w-auto opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Right Section (Layout Controls & Settings) */}
      <div className="flex items-center space-x-1">
        <button
          onClick={onTogglePrimarySidebar}
          className="p-1 hover:bg-[#333333] rounded text-[#cccccc]"
          title="Toggle Primary Sidebar (Ctrl+Alt+B)"
        >
          <Sidebar size={16} />
        </button>
        <button
          onClick={onTogglePanel}
          className="p-1 hover:bg-[#333333] rounded text-[#cccccc]"
          title="Toggle Panel (Ctrl+J)"
        >
          <PanelBottom size={16} />
        </button>
        <button
          onClick={onToggleSecondarySidebar}
          className="p-1 hover:bg-[#333333] rounded text-[#cccccc]"
          title="Toggle Secondary Sidebar (Ctrl+B)"
        >
          <PanelRight size={16} />
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" /> {/* Divider */}
        <button className="p-1 hover:bg-[#333333] rounded text-[#cccccc]">
          <Search size={16} />
        </button>
        <button className="p-1 hover:bg-[#333333] rounded text-[#cccccc]">
          <Settings size={16} />
        </button>
      </div>
    </div>
  );
};
