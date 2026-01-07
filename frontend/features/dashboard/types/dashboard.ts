import React from "react";
import { Tool } from "../../../types/index";

/**
 * Represents a group of tabs (editors) in the dashboard
 */
export interface EditorGroup {
  id: string;
  tabs: string[]; // Tool IDs
  activeTabId: string | null;
}

/**
 * Actions available for the dashboard
 */
export interface DashboardActions {
  handleToolClick: (toolId: string) => void;
  closeTab: (e: React.MouseEvent, groupId: string, tabId: string) => void;
  activateTab: (groupId: string, tabId: string) => void;
  splitEditor: () => void;
  closeSplit: (e: React.MouseEvent, groupId: string) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setActiveGroupId: (groupId: string) => void;
  setSidebarWidth: (width: number) => void;
  togglePrimarySidebar: () => void;
  togglePanel: () => void;
  toggleSecondarySidebar: () => void;
}

/**
 * The state shape exposed by useDashboard hook
 */
export interface DashboardState {
  isSidebarOpen: boolean;
  sidebarWidth: number;
  activeSidebarToolId: string;
  editorGroups: EditorGroup[];
  activeGroupId: string;
  activeSidebarTool: Tool;
  isPanelOpen: boolean;
  isSecondarySidebarOpen: boolean;
}
