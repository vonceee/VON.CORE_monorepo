import React from "react";
import { TOOLS_CONFIG } from "./toolRegistry";
import { useDashboard } from "./hooks/useDashboard";
import { ActivityBar } from "./components/ActivityBar";
import { Sidebar } from "./components/Sidebar";
import { EditorGrid } from "./components/EditorGrid";
import { StatusBar } from "./components/StatusBar";

interface DevDashboardProps {
  onExit: () => void;
}

const DevDashboard: React.FC<DevDashboardProps> = ({ onExit }) => {
  const { state, actions } = useDashboard();
  const {
    isSidebarOpen,
    activeSidebarToolId,
    editorGroups,
    activeGroupId,
    activeSidebarTool,
    sidebarWidth,
  } = state;
  const {
    handleToolClick,
    closeTab,
    activateTab,
    splitEditor,
    closeSplit,
    setActiveGroupId,
    setSidebarWidth,
  } = actions;

  const [isResizing, setIsResizing] = React.useState(false);

  // --- Resize Handler ---
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    // Store initial values if needed, but for now we'll just track movement
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      // activity bar width is roughly 48px or 60px depending on implementation,
      // but since we are just adding delta to startWidth, we shouldn't worry about absolute positioning too much
      // as long as the sidebar is on the left.

      const newWidth = Math.max(160, Math.min(600, startWidth + delta));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    // Set global cursor styles
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const getToolById = (id: string) => TOOLS_CONFIG.find((t) => t.id === id);

  return (
    <div
      className={`
        fixed inset-0 z-[60] bg-[#1e1e1e] text-[#cccccc] flex flex-col font-sans overflow-hidden
        ${isResizing ? "select-none cursor-col-resize" : ""}
      `}
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar
          tools={TOOLS_CONFIG}
          activeToolId={activeSidebarToolId}
          isSidebarOpen={isSidebarOpen}
          onToolClick={handleToolClick}
          onExit={onExit}
        />

        {/* Sidebar */}
        {isSidebarOpen && (
          <Sidebar
            activeTool={activeSidebarTool}
            width={sidebarWidth}
            onResizeStart={handleResizeStart}
          />
        )}

        {/* Main Editor Area */}
        <EditorGrid
          groups={editorGroups}
          activeGroupId={activeGroupId}
          onActivateGroup={setActiveGroupId}
          onActivateTab={activateTab}
          onCloseTab={closeTab}
          onSplit={splitEditor}
          onCloseSplit={closeSplit}
          getTool={getToolById}
        />
      </div>

      {/* Status Bar */}
      <StatusBar
        activeTabCount={editorGroups.reduce((acc, g) => acc + g.tabs.length, 0)}
        mode="DEV"
      />
    </div>
  );
};

export default DevDashboard;
