import React, { useState, useEffect } from "react";
import { TOOLS_CONFIG } from "../toolRegistry";
import {
  EditorGroup,
  DashboardState,
  DashboardActions,
} from "../types/dashboard";

export const useDashboard = (): {
  state: DashboardState;
  actions: DashboardActions;
} => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSecondarySidebarOpen, setIsSecondarySidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [activeSidebarToolId, setActiveSidebarToolId] = useState<string>(
    TOOLS_CONFIG[0].id,
  );

  const [editorGroups, setEditorGroups] = useState<EditorGroup[]>([
    {
      id: "group-1",
      tabs: [TOOLS_CONFIG[0].id],
      activeTabId: TOOLS_CONFIG[0].id,
    },
  ]);
  const [activeGroupId, setActiveGroupId] = useState("group-1");

  const activeSidebarTool =
    TOOLS_CONFIG.find((t) => t.id === activeSidebarToolId) || TOOLS_CONFIG[0];

  const handleToolClick = (toolId: string) => {
    // Sidebar Toggle Logic
    if (toolId === activeSidebarToolId) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setActiveSidebarToolId(toolId);
      setIsSidebarOpen(true);
    }

    // Open/Focus Tab in Active Group
    setEditorGroups((prev) => {
      const activeGroupIndex = prev.findIndex((g) => g.id === activeGroupId);

      let targetGroupIndex = activeGroupIndex;

      if (targetGroupIndex === -1) {
        if (prev.length > 0) {
          targetGroupIndex = 0;
        } else {
          return prev;
        }
      }

      const group = prev[targetGroupIndex];
      const alreadyOpen = group.tabs.includes(toolId);

      // if already open, just set active. Else add and set active.
      const newTabs = alreadyOpen ? group.tabs : [...group.tabs, toolId];

      const newGroups = [...prev];
      newGroups[targetGroupIndex] = {
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

        // if closing the active tab, switch to the previous one if exists
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
      prev.map((g) => (g.id === groupId ? { ...g, activeTabId: tabId } : g)),
    );
  };

  const splitEditor = () => {
    // Increased limit to 3 as requested
    if (editorGroups.length >= 3) return;

    // get current active tab from active group to duplicate it into new split
    const currentGroupIndex = editorGroups.findIndex(
      (g) => g.id === activeGroupId,
    );
    const currentGroup = editorGroups[currentGroupIndex];

    // fallback if something is wrong with state
    if (currentGroupIndex === -1 || !currentGroup) return;

    const tabToOpen = currentGroup.activeTabId || TOOLS_CONFIG[0].id;

    const newGroup: EditorGroup = {
      id: `group-${Date.now()}`,
      tabs: [tabToOpen],
      activeTabId: tabToOpen,
    };

    setEditorGroups((prev) => {
      const newGroups = [...prev];
      // Insert after current group
      newGroups.splice(currentGroupIndex + 1, 0, newGroup);
      return newGroups;
    });
    setActiveGroupId(newGroup.id);
  };

  const closeSplit = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    // don't close if it's the only group
    if (editorGroups.length <= 1) return;

    const newGroups = editorGroups.filter((g) => g.id !== groupId);
    setEditorGroups(newGroups);
    // reset active group to the remaining one if necessary
    if (activeGroupId === groupId) {
      setActiveGroupId(newGroups[0].id);
    }
  };

  const setSidebarOpen = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  const updateSidebarWidth = (width: number) => {
    setSidebarWidth(width);
  };

  const togglePrimarySidebar = () => setIsSidebarOpen((prev) => !prev);
  const togglePanel = () => setIsPanelOpen((prev) => !prev);
  const toggleSecondarySidebar = () =>
    setIsSecondarySidebarOpen((prev) => !prev);

  useEffect(() => {
    const activeGroup = editorGroups.find((g) => g.id === activeGroupId);
    if (!activeGroup) return;

    if (activeGroup.activeTabId) {
      if (activeGroup.activeTabId !== activeSidebarToolId) {
        setActiveSidebarToolId(activeGroup.activeTabId);
      }
    } else {
      // if no tab is active (all closed), close the sidebar
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    }
  }, [
    activeGroupId,
    editorGroups,
    activeSidebarToolId,
    isSidebarOpen,
    setActiveSidebarToolId,
    setIsSidebarOpen,
  ]);

  return {
    state: {
      isSidebarOpen,
      activeSidebarToolId,
      editorGroups,
      activeGroupId,
      activeSidebarTool,
      sidebarWidth,
      isPanelOpen,
      isSecondarySidebarOpen,
    },
    actions: {
      handleToolClick,
      closeTab,
      activateTab,
      splitEditor,
      closeSplit,
      setSidebarOpen,
      setActiveGroupId,
      setSidebarWidth: updateSidebarWidth,
      togglePrimarySidebar,
      togglePanel,
      toggleSecondarySidebar,
    },
  };
};
