import React from "react";
import { EditorGroup as EditorGroupType } from "../types/dashboard";
import { Tool } from "../../../types/index";

interface EditorGroupProps {
  group: EditorGroupType;
  isActive: boolean;
  onActivate: () => void;
  onTabClick: (tabId: string) => void;
  onTabClose: (e: React.MouseEvent, tabId: string) => void;
  onSplit: (e: React.MouseEvent) => void;
  onCloseGroup: (e: React.MouseEvent) => void;
  canSplit: boolean;
  canClose: boolean;
  getTool: (id: string) => Tool | undefined;
}

export const EditorGroupComponent: React.FC<EditorGroupProps> = ({
  group,
  isActive,
  onActivate,
  onTabClick,
  onTabClose,
  onSplit,
  onCloseGroup,
  canSplit,
  canClose,
  getTool,
}) => {
  return (
    <div
      className={`flex-1 flex flex-col min-w-0 border-r border-black/20 last:border-r-0 ${
        isActive ? "" : "opacity-80 hover:opacity-100 transition-opacity"
      }`}
      onClick={onActivate}
    >
      {/* Editor Tabs Header */}
      <div className="h-9 bg-[#252526] flex items-center overflow-x-auto no-scrollbar relative">
        {/* Tabs */}
        {group.tabs.map((tabId) => {
          const tool = getTool(tabId);
          if (!tool) return null;
          const isTabActive = group.activeTabId === tabId;

          return (
            <div
              key={tabId}
              onClick={(e) => {
                e.stopPropagation();
                onTabClick(tabId);
              }}
              className={`
                h-full flex items-center px-3 pr-2 space-x-2 text-xs cursor-pointer border-r border-black/10 min-w-fit
                ${
                  isTabActive
                    ? "bg-[#1e1e1e] text-white border-t border-t-orange-500"
                    : "bg-[#2d2d2d] text-[#969696] hover:bg-[#2d2d2d]/80"
                }
              `}
            >
              <span
                className={`${
                  isTabActive ? "text-orange-400" : "text-blue-400"
                }`}
              >
                TSX
              </span>
              <span>{tool.label}</span>
              <button
                onClick={(e) => onTabClose(e, tabId)}
                className={`ml-1 p-0.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white/20 ${
                  isTabActive ? "opacity-100" : ""
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
          {canSplit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSplit(e);
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
          {canClose && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseGroup(e);
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
              const ActiveComponent = getTool(group.activeTabId)?.component;
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
  );
};
