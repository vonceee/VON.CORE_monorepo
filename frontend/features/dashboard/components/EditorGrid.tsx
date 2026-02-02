import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
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

const MIN_WIDTH_PERCENT = 15;

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [widths, setWidths] = useState<number[]>([]);
  const isResizing = useRef(false);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  // keep track of previous groups to detect changes (add/remove)
  const prevGroupsRef = useRef<EditorGroupType[]>(groups);

  // initialize widths if empty
  useEffect(() => {
    if (widths.length === 0 && groups.length > 0) {
      setWidths(new Array(groups.length).fill(100 / groups.length));
    }
  }, []); // only on mount if empty

  // handle group changes (split/close) with smart widths
  useLayoutEffect(() => {
    const prevGroups = prevGroupsRef.current;

    // if no change in count, just ensure widths match length if something weird happened, or do nothing.
    // we only want to react to additions/removals typically.
    if (prevGroups.length === groups.length) {
      if (widths.length !== groups.length && groups.length > 0) {
        // fallback sync
        setWidths(new Array(groups.length).fill(100 / groups.length));
      }
      return;
    }

    setWidths((currentWidths) => {
      // base case: if we have no widths yet, distribute evenly
      if (currentWidths.length === 0) {
        return new Array(groups.length).fill(100 / groups.length);
      }

      // 1. handle addition (split)
      if (groups.length > prevGroups.length) {
        // find which group was added.
        // we assume the new group is inserted effectively.
        // let's identify the new ID.
        const prevIds = new Set(prevGroups.map((g) => g.id));
        const newGroupIndex = groups.findIndex((g) => !prevIds.has(g.id));

        if (newGroupIndex !== -1) {
          // the new group is at newGroupIndex.
          // the "parent" it split from is essentially arguably the one at the same position or the one before it?
          // "useDashboard" logic: splice(currentGroupIndex + 1, 0, newGroup).
          // so if newGroupIndex is the new guy, the one at newGroupIndex was taking up the space before,
          // OR the one possibly at newGroupIndex-1 was the parent.
          // actually, if we insert at K, then indices 0..K-1 are same.
          // the item at K (new) and K+1 (old K)... wait.
          // let's look at useDashboard logic: `newGroups.splice(currentGroupIndex + 1, 0, newGroup);`
          // so new group is at `currentGroupIndex + 1`.
          // the original group is at `currentGroupIndex`.
          // so the split happened between `newGroupIndex - 1` and `newGroupIndex`.
          // the space previously occupied by `currentWidths[newGroupIndex - 1]` should now be shared between `newGroupIndex - 1` and `newGroupIndex`.

          // wait, existing widths align with prevGroups.
          // prevGroups: [A, B]. widths: [50, 50].
          // add C after A. groups: [A, C, B].
          // new index of C is 1.
          // parent is groups[0] (A).
          // we want A and C to share A's old width (50).
          // so A becomes 25, C becomes 25. B stays 50.

          // logic:
          // the parent index in the *new* array is newGroupIndex - 1.
          // the parent index in the *old* array is also newGroupIndex - 1.
          // correct?
          // if newGroupIndex = 1. parent is at 0.
          // prevGroups[0] is A. groups[0] is A.

          // exceptions: what if inserted at 0? (not possible with current logic unless active is -1? logic defaults to 0).
          // if active was 0, inserted at 1. parent 0.

          const parentIndex = Math.max(0, newGroupIndex - 1);
          // however, we must be careful if we just appended?
          // if appended, newGroupIndex = length-1. parent = length-2.

          const oldParentWidth =
            currentWidths[parentIndex] || 100 / prevGroups.length;
          const halfWidth = oldParentWidth / 2;

          const nextWidths = [...currentWidths];
          // update parent width
          nextWidths[parentIndex] = halfWidth;
          // insert new group width
          nextWidths.splice(newGroupIndex, 0, halfWidth);

          return nextWidths;
        } else {
          // fallback: append equal share?
          return new Array(groups.length).fill(100 / groups.length);
        }
      }

      // 2. handle removal (close)
      if (groups.length < prevGroups.length) {
        // find which index was removed from prevGroups.
        // we can't use prevIds check easily to find *index* map.
        // let's iterate.
        let removedIndex = -1;
        for (let i = 0; i < prevGroups.length; i++) {
          if (!groups.find((g) => g.id === prevGroups[i].id)) {
            removedIndex = i;
            break;
          }
        }

        if (removedIndex !== -1) {
          // we have currentWidths matching prevGroups.
          // we need to remove the width at removedIndex and give it to a neighbor.
          // give to right neighbor if exists, else left.
          const widthResult = [...currentWidths];
          const freed = widthResult[removedIndex];

          // remove the item
          widthResult.splice(removedIndex, 1);

          // distribute:
          if (removedIndex < widthResult.length) {
            // give to the new item at this index (which was previously to the right)
            widthResult[removedIndex] += freed;
          } else if (removedIndex - 1 >= 0) {
            // give to left neighbor
            widthResult[removedIndex - 1] += freed;
          }

          return widthResult;
        }
      }

      return currentWidths;
    });

    prevGroupsRef.current = groups;
  }, [groups]);

  const dragInfo = useRef<{
    index: number;
    startX: number;
    startLeftWidth: number;
    startRightWidth: number;
    containerWidth: number;
  } | null>(null);

  const onMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!containerRef.current) return;

    isResizing.current = true;
    const containerRect = containerRef.current.getBoundingClientRect();

    dragInfo.current = {
      index,
      startX: e.clientX,
      startLeftWidth: widths[index],
      startRightWidth: widths[index + 1],
      containerWidth: containerRect.width,
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !dragInfo.current) return;

    // use requestAnimationFrame for smoothness if needed, but direct DOM is usually fine.
    // for extreme performance, we can skip if delta is small, but let's just do it.

    const { index, startX, startLeftWidth, startRightWidth, containerWidth } =
      dragInfo.current;

    const deltaPixels = e.clientX - startX;
    const deltaPercent = (deltaPixels / containerWidth) * 100;

    const sum = startLeftWidth + startRightWidth;

    // calculate new widths with constraints
    // left
    let newLeft = startLeftWidth + deltaPercent;
    // right
    let newRight = startRightWidth - deltaPercent;

    // clamp
    if (newLeft < MIN_WIDTH_PERCENT) {
      newLeft = MIN_WIDTH_PERCENT;
      newRight = sum - MIN_WIDTH_PERCENT;
    } else if (newRight < MIN_WIDTH_PERCENT) {
      newRight = MIN_WIDTH_PERCENT;
      newLeft = sum - MIN_WIDTH_PERCENT;
    }

    // direct DOM manipulation
    const leftNode = groupRefs.current[index];
    const rightNode = groupRefs.current[index + 1];

    if (leftNode) {
      leftNode.style.width = `${newLeft}%`;
      leftNode.style.flex = "none";
    }
    if (rightNode) {
      rightNode.style.width = `${newRight}%`;
      rightNode.style.flex = "none";
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    if (!isResizing.current || !dragInfo.current) return;

    // finalize state
    const { index, startX, startLeftWidth, startRightWidth, containerWidth } =
      dragInfo.current;
    const deltaPixels = e.clientX - startX;
    const deltaPercent = (deltaPixels / containerWidth) * 100;

    const sum = startLeftWidth + startRightWidth;
    let newLeft = startLeftWidth + deltaPercent;
    let newRight = startRightWidth - deltaPercent;

    if (newLeft < MIN_WIDTH_PERCENT) {
      newLeft = MIN_WIDTH_PERCENT;
      newRight = sum - MIN_WIDTH_PERCENT;
    } else if (newRight < MIN_WIDTH_PERCENT) {
      newRight = MIN_WIDTH_PERCENT;
      newLeft = sum - MIN_WIDTH_PERCENT;
    }

    setWidths((prev) => {
      const next = [...prev];
      next[index] = newLeft;
      next[index + 1] = newRight;
      return next;
    });

    isResizing.current = false;
    dragInfo.current = null;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 flex bg-[#1e1e1e] overflow-hidden"
    >
      {groups.map((group, index) => (
        <React.Fragment key={group.id}>
          <EditorGroupComponent
            ref={(el) => (groupRefs.current[index] = el)}
            group={group}
            isActive={activeGroupId === group.id}
            width={widths[index]}
            onActivate={() => onActivateGroup(group.id)}
            onTabClick={(tabId) => onActivateTab(group.id, tabId)}
            onTabClose={(e, tabId) => onCloseTab(e, group.id, tabId)}
            onSplit={(e) => {
              // prevent bubbling if necessary, though button handles it
              onSplit();
            }}
            onCloseGroup={(e) => onCloseSplit(e, group.id)}
            canSplit={groups.length < 3} // match logic in useDashboard
            canClose={groups.length > 1}
            getTool={getTool}
          />

          {/* Divider */}
          {index < groups.length - 1 && (
            <div
              className={`w-1 hover:w-1.5 -mr-0.5 z-50 cursor-col-resize hover:bg-[#007fd4] transition-all bg-transparent relative flex-none`}
              onMouseDown={(e) => onMouseDown(e, index)}
            >
              {/* use absolute positioning to create a larger hit area without affecting layout much */}
              <div className="absolute inset-y-0 -left-2 -right-2 bg-transparent z-40" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
