import React from "react";
import { NodeProps, Handle, Position } from "@xyflow/react";
import { Copy } from "lucide-react";
import classNames from "classnames";
import { useMidnightStore } from "../hooks/useMidnightStore";
import { MidnightNode, NodeType } from "../types";

const BaseNode = ({
  data,
  type,
  isConnectable,
  selected,
}: NodeProps<MidnightNode> & { type: NodeType }) => {
  const isLocked = useMidnightStore((state) => state.isLocked);

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.stopPropagation(); // Prevent selection when locked
      if (data.description) {
        navigator.clipboard.writeText(data.description);
        // Could add toast notification here
      }
    }
  };

  const borderColor = {
    action: "border-pink-500",
    resource: "border-blue-400",
    decision: "border-yellow-400",
  }[type];

  const bgColor = {
    action: "bg-[#1B1B1F]",
    resource: "bg-[#1B1B1F]",
    decision: "bg-[#1B1B1F]",
  }[type];

  return (
    <div
      className={classNames(
        "px-4 py-2 rounded-md border-l-4 shadow-lg min-w-[150px] transition-all",
        borderColor,
        bgColor,
        selected ? "ring-1 ring-white" : "",
      )}
      onClick={handleClick}
      title={
        isLocked
          ? data.description
            ? "Click to copy description"
            : "Unlock to edit"
          : "Double-click to edit"
      }
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="!bg-gray-400"
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-200 font-medium text-sm">
            {data.label}
          </span>
          {data.description && <Copy className="w-3 h-3 text-gray-500 ml-2" />}
        </div>
        {data.description && (
          <p className="text-[10px] text-gray-400 max-w-[200px] whitespace-pre-wrap font-mono">
            {data.description}
          </p>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="!bg-gray-400"
      />
    </div>
  );
};

export const ActionNode = (props: NodeProps<MidnightNode>) => (
  <BaseNode {...props} type="action" />
);
export const ResourceNode = (props: NodeProps<MidnightNode>) => (
  <BaseNode {...props} type="resource" />
);
export const DecisionNode = (props: NodeProps<MidnightNode>) => (
  <BaseNode {...props} type="decision" />
);
