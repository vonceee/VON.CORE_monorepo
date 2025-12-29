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
  } = state;
  const {
    handleToolClick,
    closeTab,
    activateTab,
    splitEditor,
    closeSplit,
    setActiveGroupId,
  } = actions;

  const getToolById = (id: string) => TOOLS_CONFIG.find((t) => t.id === id);

  return (
    <div className="fixed inset-0 z-[60] bg-[#1e1e1e] text-[#cccccc] flex flex-col font-sans select-none overflow-hidden">
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
        {isSidebarOpen && <Sidebar activeTool={activeSidebarTool} />}

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
