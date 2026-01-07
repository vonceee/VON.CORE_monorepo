import React from "react";
import { TOOLS_CONFIG } from "./toolRegistry";
import { useDashboard } from "./hooks/useDashboard";
import { ActivityBar } from "./components/ActivityBar";
import { Sidebar } from "./components/Sidebar";
import { EditorGrid } from "./components/EditorGrid";
import { StatusBar } from "./components/StatusBar";
import { TopBar } from "./components/TopBar";
import { Panel } from "./components/Panel";
import { SecondarySidebar } from "./components/SecondarySidebar";

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
    isPanelOpen,
    isSecondarySidebarOpen,
  } = state;
  const {
    handleToolClick,
    closeTab,
    activateTab,
    splitEditor,
    closeSplit,
    setActiveGroupId,
    setSidebarWidth,
    togglePrimarySidebar,
    togglePanel,
    toggleSecondarySidebar,
  } = actions;

  const [isResizing, setIsResizing] = React.useState(false);

  // --- Keyboard Shortcuts ---
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Primary Sidebar: Ctrl + B
      if (e.ctrlKey && !e.altKey && (e.key === "b" || e.key === "B")) {
        e.preventDefault();
        togglePrimarySidebar();
      }
      // Toggle Secondary Sidebar: Ctrl + Alt + B
      else if (e.ctrlKey && e.altKey && (e.key === "b" || e.key === "B")) {
        e.preventDefault();
        toggleSecondarySidebar();
      }
      // Toggle Panel: Ctrl + J
      else if (e.ctrlKey && (e.key === "j" || e.key === "J")) {
        e.preventDefault();
        togglePanel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePrimarySidebar, toggleSecondarySidebar, togglePanel]);

  // --- Resize Handler ---
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
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
      {/* Top Bar */}
      <TopBar
        onTogglePrimarySidebar={togglePrimarySidebar}
        onTogglePanel={togglePanel}
        onToggleSecondarySidebar={toggleSecondarySidebar}
        isPrimarySidebarOpen={isSidebarOpen}
        isPanelOpen={isPanelOpen}
        isSecondarySidebarOpen={isSecondarySidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar
          tools={TOOLS_CONFIG}
          activeToolId={activeSidebarToolId}
          isSidebarOpen={isSidebarOpen}
          onToolClick={handleToolClick}
          onExit={onExit}
        />

        {/* Primary Sidebar */}
        {isSidebarOpen && (
          <Sidebar
            activeTool={activeSidebarTool}
            width={sidebarWidth}
            onResizeStart={handleResizeStart}
          />
        )}

        {/* Center Region: Editor + Panel */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
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
          {isPanelOpen && <Panel />}
        </div>

        {/* Secondary Sidebar (Agent) */}
        {isSecondarySidebarOpen && <SecondarySidebar />}
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
