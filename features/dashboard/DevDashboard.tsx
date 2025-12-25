import React, { useState } from "react";
import { TOOLS_CONFIG } from "./toolRegistry";

interface DevDashboardProps {
  onExit: () => void;
}

interface EditorGroup {
  id: string;
  tabs: string[]; // Tool IDs
  activeTabId: string | null;
}

const DevDashboard: React.FC<DevDashboardProps> = ({ onExit }) => {
  // --- State ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSidebarToolId, setActiveSidebarToolId] = useState<string>(
    TOOLS_CONFIG[0].id
  );

  const [editorGroups, setEditorGroups] = useState<EditorGroup[]>([
    {
      id: "group-1",
      tabs: [TOOLS_CONFIG[0].id],
      activeTabId: TOOLS_CONFIG[0].id,
    },
  ]);
  const [activeGroupId, setActiveGroupId] = useState("group-1");

  // --- Helpers ---
  const activeSidebarTool =
    TOOLS_CONFIG.find((t) => t.id === activeSidebarToolId) || TOOLS_CONFIG[0];

  const getToolById = (id: string) => TOOLS_CONFIG.find((t) => t.id === id);

  // --- Handlers ---
  const handleToolClick = (toolId: string) => {
    // 1. Sidebar Toggle Logic
    if (toolId === activeSidebarToolId) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setActiveSidebarToolId(toolId);
      setIsSidebarOpen(true);
    }

    // 2. Open/Focus Tab in Active Group
    setEditorGroups((prev) => {
      const activeGroupIndex = prev.findIndex((g) => g.id === activeGroupId);
      if (activeGroupIndex === -1) return prev;

      const group = prev[activeGroupIndex];
      const alreadyOpen = group.tabs.includes(toolId);

      // If already open, just set active. Else add and set active.
      const newTabs = alreadyOpen ? group.tabs : [...group.tabs, toolId];

      const newGroups = [...prev];
      newGroups[activeGroupIndex] = {
        ...group,
        tabs: newTabs,
        activeTabId: toolId,
      };
      return newGroups;
    });
  };

  const closeTab = (e: React.MouseEvent, groupId: string, tabId: string) => {
    e.stopPropagation();
    setEditorGroups((prev) => {
      return prev.map((group) => {
        if (group.id !== groupId) return group;

        const newTabs = group.tabs.filter((t) => t !== tabId);
        let newActiveId = group.activeTabId;

        // If closing the active tab, switch to the previous one if exists
        if (group.activeTabId === tabId) {
          newActiveId = newTabs.length > 0 ? newTabs[newTabs.length - 1] : null;
        }

        return { ...group, tabs: newTabs, activeTabId: newActiveId };
      });
    });
  };

  const activateTab = (groupId: string, tabId: string) => {
    setActiveGroupId(groupId);
    setEditorGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, activeTabId: tabId } : g))
    );
  };

  const splitEditor = () => {
    if (editorGroups.length >= 2) return;

    // Get current active tab from active group to duplicate it into new split
    const currentGroup = editorGroups.find((g) => g.id === activeGroupId);
    const tabToOpen = currentGroup?.activeTabId || TOOLS_CONFIG[0].id;

    const newGroup: EditorGroup = {
      id: `group-${Date.now()}`,
      tabs: [tabToOpen],
      activeTabId: tabToOpen,
    };

    setEditorGroups((prev) => [...prev, newGroup]);
    setActiveGroupId(newGroup.id);
  };

  const closeSplit = (groupId: string) => {
    // Don't close if it's the only group
    if (editorGroups.length <= 1) return;

    const newGroups = editorGroups.filter((g) => g.id !== groupId);
    setEditorGroups(newGroups);
    // Reset active group to the remaining one if necessary
    if (activeGroupId === groupId) {
      setActiveGroupId(newGroups[0].id);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#1e1e1e] text-[#cccccc] flex flex-col font-sans select-none overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 space-y-4 z-20">
          {TOOLS_CONFIG.map((tool) => (
            <button
              key={tool.id}
              title={tool.label}
              onClick={() => handleToolClick(tool.id)}
              className={`p-2 transition-colors relative ${
                activeSidebarToolId === tool.id && isSidebarOpen
                  ? "text-white"
                  : "text-[#858585] hover:text-white"
              }`}
            >
              {/* Active Border Indicator */}
              {activeSidebarToolId === tool.id && isSidebarOpen && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-orange-500" />
              )}
              {tool.icon}
            </button>
          ))}

          <div className="flex-1"></div>
          <button
            onClick={onExit}
            className="p-2 text-[#858585] hover:text-white"
            title="Exit Dev Mode"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-64 bg-[#252526] border-r border-black/20 flex flex-col animate-slideRight">
            <div className="h-9 flex items-center px-4 text-[11px] font-bold text-[#bbbbbb] tracking-wider uppercase bg-[#252526]">
              Explorer
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Sidebar Header for Tool */}
              <div className="group px-2 py-1 cursor-pointer flex items-center text-xs font-bold text-white hover:bg-[#37373d]">
                <span className="text-white/60 mr-1 transform rotate-90">
                  ›
                </span>
                {activeSidebarTool.label.toUpperCase()}
              </div>

              {/* Sidebar Content */}
              <div className="px-0">
                {activeSidebarTool.sidebarComponent ? (
                  <activeSidebarTool.sidebarComponent />
                ) : (
                  <div className="p-4 text-xs text-[#858585] italic">
                    No explorer view ({activeSidebarTool.label})
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Editor Area (Flex Row for Split Views) */}
        <div className="flex-1 flex bg-[#1e1e1e] overflow-hidden">
          {editorGroups.map((group, index) => (
            <div
              key={group.id}
              className={`flex-1 flex flex-col min-w-0 border-r border-black/20 last:border-r-0 ${
                activeGroupId === group.id
                  ? ""
                  : "opacity-80 hover:opacity-100 transition-opacity"
              }`}
              onClick={() => setActiveGroupId(group.id)}
            >
              {/* Editor Tabs Header */}
              <div className="h-9 bg-[#252526] flex items-center overflow-x-auto no-scrollbar relative">
                {/* Tabs */}
                {group.tabs.map((tabId) => {
                  const tool = getToolById(tabId);
                  if (!tool) return null;
                  const isActive = group.activeTabId === tabId;

                  return (
                    <div
                      key={tabId}
                      onClick={(e) => {
                        e.stopPropagation();
                        activateTab(group.id, tabId);
                      }}
                      className={`
                        h-full flex items-center px-3 pr-2 space-x-2 text-xs cursor-pointer border-r border-black/10 min-w-fit
                        ${
                          isActive
                            ? "bg-[#1e1e1e] text-white border-t border-t-orange-500"
                            : "bg-[#2d2d2d] text-[#969696] hover:bg-[#2d2d2d]/80"
                        }
                      `}
                    >
                      <span
                        className={`${
                          isActive ? "text-orange-400" : "text-blue-400"
                        }`}
                      >
                        TSX
                      </span>
                      <span>{tool.label}</span>
                      <button
                        onClick={(e) => closeTab(e, group.id, tabId)}
                        className={`ml-1 p-0.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white/20 ${
                          isActive ? "opacity-100" : ""
                        }`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}

                {/* Split / Actions Area (Right aligned in header) */}
                <div className="ml-auto flex items-center px-2 space-x-1 h-full bg-[#252526]">
                  {/* Only show split button on the first group or if we can split */}
                  {editorGroups.length < 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        splitEditor();
                      }}
                      title="Split Editor"
                      className="p-1 text-[#858585] hover:text-white rounded"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7v10M16 7v10M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
                        />
                      </svg>
                    </button>
                  )}
                  {/* Allow closing a split pane if it's not the only one */}
                  {editorGroups.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeSplit(group.id);
                      }}
                      title="Close Group"
                      className="p-1 text-[#858585] hover:text-white rounded"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Editor Content */}
              <div className="flex-1 bg-[#1e1e1e] relative overflow-hidden">
                {group.activeTabId ? (
                  <div className="absolute inset-0 overflow-y-auto p-8 animate-fadeIn">
                    {/* Render Active Tool */}
                    {(() => {
                      const ActiveComponent = getToolById(
                        group.activeTabId
                      )?.component;
                      return ActiveComponent ? <ActiveComponent /> : null;
                    })()}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-[#333333]">
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-24 h-24 mb-4 opacity-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                      </svg>
                      <span className="font-mono text-sm">NO EDITORS OPEN</span>
                      <span className="font-mono text-xs opacity-50 mt-2">
                        Select a tool from the Activity Bar
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-orange-600 text-black text-[11px] flex items-center px-4 justify-between font-medium z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-1">⎇</span> dev-branch
          </div>
          <div className="flex items-center space-x-1">
            <span>
              {editorGroups.reduce((acc, g) => acc + g.tabs.length, 0)} Active
              Tabs
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="uppercase tracking-tighter">
            VON.CORE CORE-ENGINE-1.0
          </div>
          <div>UTF-8</div>
          <div className="font-bold">MODE: DEV</div>
        </div>
      </div>
    </div>
  );
};

export default DevDashboard;
