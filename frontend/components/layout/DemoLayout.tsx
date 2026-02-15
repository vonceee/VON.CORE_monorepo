import React, { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, ArrowLeft } from "lucide-react";
import { useDemo } from "../../context/DemoContext";
import { TOOLS_CONFIG } from "../../features/dashboard/toolRegistry";

export const DemoLayout: React.FC = () => {
  const { activeDemoId, closeDemo } = useDemo();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!activeDemoId) return null;

  const tool = TOOLS_CONFIG.find((t) => t.id === activeDemoId);
  if (!tool) return null;

  // Use the explicitly defined sidebar component from the registry
  const SidebarComponent = tool.sidebarComponent;
  const ToolComponent = tool.component;

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex animate-in fade-in duration-300">
      {/* Left Sidebar Area */}
      {SidebarComponent && (
        <div
          className={`relative border-r border-white/10 bg-neutral-900/50 transition-all duration-300 ease-in-out flex flex-col ${
            isSidebarOpen ? "w-80" : "w-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex-1 overflow-hidden relative">
            <SidebarComponent />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#09090b]">
        {/* Minimal Header / Toolbar */}
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-neutral-900/80 backdrop-blur-sm z-20">
          <div className="flex items-center gap-3">
            {SidebarComponent && (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1.5 hover:bg-white/10 rounded-md text-neutral-400 hover:text-white transition-colors"
                title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
              >
                {isSidebarOpen ? (
                  <PanelLeftClose size={18} />
                ) : (
                  <PanelLeftOpen size={18} />
                )}
              </button>
            )}
            <div className="h-4 w-px bg-white/10 mx-1" />
            <h2 className="font-mono text-sm font-bold tracking-wider text-primary">
              {tool.label.toUpperCase()}_DEMO
            </h2>
          </div>

          <button
            onClick={closeDemo}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-xs font-mono tracking-widest transition-all hover:border-primary/50 hover:text-primary"
          >
            <ArrowLeft size={14} />
            EXIT DEMO
          </button>
        </div>

        {/* Tool Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <ToolComponent />
        </div>
      </div>
    </div>
  );
};
