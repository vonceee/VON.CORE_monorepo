import React from "react";
import { NodeProps, Handle, Position } from "@xyflow/react";
import { Copy, Plus } from "lucide-react";
import classNames from "classnames";
import { useMidnightStore } from "../hooks/useMidnightStore";
import { MidnightNode, NodeType } from "../types";

const BaseNode = ({
  id,
  data,
  type,
  isConnectable,
  selected,
}: NodeProps<MidnightNode> & { type: NodeType }) => {
  const isLocked = useMidnightStore((state) => state.isLocked);
  const addAndConnect = useMidnightStore((state) => state.addAndConnect);

  // prevent selection when locked
  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.stopPropagation();
      if (data.description) {
        navigator.clipboard.writeText(data.description);
        // TODO: add toast notification here
      }
    }
  };

  return (
    <div
      className={classNames(
        "px-4 py-2 rounded-md min-w-[150px] bg-[#1B1B1F] border border-[#2C2C30] transition-all relative",
        selected ? "ring-1 ring-white" : "",
      )}
      onClick={handleClick}
      title={
        isLocked
          ? data.description
            ? "click to copy description"
            : "unlock to edit"
          : "double-click to edit"
      }
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!bg-gray-400"
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-200 font-mono text-sm">{data.label}</span>
          {data.description && <Copy className="w-3 h-3 text-gray-500 ml-2" />}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!bg-gray-400"
      >
        {!isLocked && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addAndConnect(id);
            }}
            className="absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg z-50 cursor-pointer"
            title="Add node"
          >
            <Plus className="w-3 h-3" />
          </button>
        )}
      </Handle>

      {/* Description */}
      {data.description && (
        <div className="absolute top-full left-0 pt-2 w-max pointer-events-none">
          <p className="text-[10px] text-gray-500 font-mono whitespace-pre leading-tight opacity-75">
            {data.description}
          </p>
        </div>
      )}
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
