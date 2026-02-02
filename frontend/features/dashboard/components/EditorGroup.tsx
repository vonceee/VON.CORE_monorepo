import React from "react";
import { EditorGroup as EditorGroupType } from "../types/dashboard";
import { Tool } from "../../../types/index";
import ScrollableHeader from "./ScrollableHeader";

interface EditorGroupProps {
  group: EditorGroupType;
  isActive: boolean;
  width?: number;
  onActivate: () => void;
  onTabClick: (tabId: string) => void;
  onTabClose: (e: React.MouseEvent, tabId: string) => void;
  onSplit: (e: React.MouseEvent) => void;
  onCloseGroup: (e: React.MouseEvent) => void;
  canSplit: boolean;
  canClose: boolean;
  getTool: (id: string) => Tool | undefined;
}

export const EditorGroupComponent = React.forwardRef<
  HTMLDivElement,
  EditorGroupProps
>(
  (
    {
      group,
      isActive,
      width,
      onActivate,
      onTabClick,
      onTabClose,
      onSplit,
      onCloseGroup,
      canSplit,
      canClose,
      getTool,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col min-w-0 border-r border-black/20 last:border-r-0 ${
          isActive ? "" : "opacity-80 hover:opacity-100 transition-opacity"
        }`}
        style={{
          width: width ? `${width}%` : undefined,
          flex: width ? "none" : "1 1 0%",
        }}
        onClick={onActivate}
      >
        {/* Editor Tabs Header */}
        <div className="h-9 bg-[#252526] flex items-center relative">
          <ScrollableHeader
            group={group}
            getTool={getTool}
            onTabClick={onTabClick}
            onTabClose={onTabClose}
          />

          {/* split / actions area (fixed right) */}
          <div className="flex-none flex items-center px-2 space-x-1 h-full bg-[#252526] border-l border-black/20 z-20 shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.3)]">
            {/* only show split button on the first group or if we can split */}
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
            {/* allow closing a split pane if it's not the only one */}
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
            <div className="absolute inset-0 overflow-y-auto p-2 animate-fadeIn">
              {/* Render Active Tool */}
              {(() => {
                const ActiveComponent = getTool(group.activeTabId)?.component;
                return (
                  <div className="flex items-center justify-center h-full text-[#333333] rounded-lg border border-white/20 p-1">
                    {ActiveComponent ? <ActiveComponent /> : null}
                  </div>
                );
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
  },
);
