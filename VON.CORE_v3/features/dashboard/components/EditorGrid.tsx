import React from "react";
import { EditorGroup as EditorGroupType } from "../types/dashboard";
import { EditorGroupComponent } from "./EditorGroup";
import { Tool } from "../../../types/index";

interface EditorGridProps {
  groups: EditorGroupType[];
  activeGroupId: string;
  onActivateGroup: (groupId: string) => void;
  onActivateTab: (groupId: string, tabId: string) => void;
  onCloseTab: (e: React.MouseEvent, groupId: string, tabId: string) => void;
  onSplit: () => void;
  onCloseSplit: (e: React.MouseEvent, groupId: string) => void;
  getTool: (id: string) => Tool | undefined;
}

export const EditorGrid: React.FC<EditorGridProps> = ({
  groups,
  activeGroupId,
  onActivateGroup,
  onActivateTab,
  onCloseTab,
  onSplit,
  onCloseSplit,
  getTool,
}) => {
  return (
    <div className="flex-1 flex bg-[#1e1e1e] overflow-hidden">
      {groups.map((group) => (
        <EditorGroupComponent
          key={group.id}
          group={group}
          isActive={activeGroupId === group.id}
          onActivate={() => onActivateGroup(group.id)}
          onTabClick={(tabId) => onActivateTab(group.id, tabId)}
          onTabClose={(e, tabId) => onCloseTab(e, group.id, tabId)}
          onSplit={(e) => {
            e.stopPropagation();
            onSplit();
          }}
          onCloseGroup={(e) => onCloseSplit(e, group.id)}
          canSplit={groups.length < 2}
          canClose={groups.length > 1}
          getTool={getTool}
        />
      ))}
    </div>
  );
};
