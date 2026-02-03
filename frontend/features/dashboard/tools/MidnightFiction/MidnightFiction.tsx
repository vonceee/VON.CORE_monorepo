import React, { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  NodeProps,
  Handle,
  Position,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Lock, Unlock, Copy, Plus, Copy as CopyIcon } from "lucide-react";
import classNames from "classnames";
import { useMidnightStore, MidnightNode, NodeData, NodeType } from "./store";

// --- Custom Nodes ---
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

const ActionNode = (props: NodeProps<MidnightNode>) => (
  <BaseNode {...props} type="action" />
);
const ResourceNode = (props: NodeProps<MidnightNode>) => (
  <BaseNode {...props} type="resource" />
);
const DecisionNode = (props: NodeProps<MidnightNode>) => (
  <BaseNode {...props} type="decision" />
);

// --- Main Component ---
const MidnightFiction: React.FC = () => {
  // Graph State from Store
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    isLocked,
    toggleLock,
    resetCanvas,
    cloneCanvas,
    updateNodeData, // New Action
  } = useMidnightStore();

  // Local State for Editing
  const [editingNode, setEditingNode] = useState<MidnightNode | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: MidnightNode) => {
      if (!isLocked) {
        setEditingNode(node);
        setEditLabel(node.data.label);
        setEditDescription(node.data.description || "");
      }
    },
    [isLocked],
  );

  const handleSaveNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNode) {
      updateNodeData(editingNode.id, {
        label: editLabel,
        description: editDescription,
      });
      setEditingNode(null);
    }
  };

  // Define node types
  const nodeTypes = useMemo(
    () => ({
      action: ActionNode,
      resource: ResourceNode,
      decision: DecisionNode,
    }),
    [],
  );

  // --- Data Persistence (Mock) ---
  const handleSave = useCallback(() => {
    const graphData = {
      nodes,
      edges,
    };
    console.log("Saving Graph Data:", JSON.stringify(graphData, null, 2));
    // TODO: Replace with axios.post('/api/midnight-fiction/save', graphData)
    alert("Graph saved to console! (Backend integration pending)");
  }, [nodes, edges]);

  return (
    <div className="w-full h-full bg-[#0F0F12] relative font-sans">
      {/* Editor Modal */}
      {editingNode && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1B1B1F] border border-[#2C2C30] p-6 rounded-lg shadow-2xl w-96 animate-fade-in">
            <h3 className="text-[#C78BA1] font-semibold mb-4 flex items-center gap-2">
              <span className="uppercase text-xs tracking-wider text-gray-500">
                {editingNode.type}
              </span>
              Edit Node
            </h3>
            <form onSubmit={handleSaveNode} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="w-full bg-[#0F0F12] border border-[#2C2C30] rounded px-3 py-2 text-gray-200 focus:border-[#C78BA1] focus:outline-none"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Description
                </label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0F0F12] border border-[#2C2C30] rounded px-3 py-2 text-gray-200 font-mono text-xs focus:border-[#C78BA1] focus:outline-none"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setEditingNode(null)}
                  className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#C78BA1] hover:bg-[#C78BA1]/90 text-black font-semibold text-xs rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header / Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
        <div className="flex gap-2">
          <button
            onClick={resetCanvas}
            className="bg-[#1B1B1F] border border-[#2C2C30] p-2 rounded text-[#C78BA1] hover:bg-[#2C2C30] transition-colors"
            title="New Workflow"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={cloneCanvas}
            className="bg-[#1B1B1F] border border-[#2C2C30] p-2 rounded text-[#C78BA1] hover:bg-[#2C2C30] transition-colors"
            title="Clone Workflow"
          >
            <CopyIcon className="w-4 h-4" />
          </button>

          <div className="w-px h-8 bg-[#2C2C30] mx-1" />

          <button
            onClick={handleSave}
            className="bg-[#1B1B1F] border border-[#2C2C30] px-3 py-2 rounded text-[#C78BA1] hover:bg-[#2C2C30] transition-colors text-sm font-medium"
          >
            Save Map
          </button>

          <button
            onClick={toggleLock}
            className="bg-[#1B1B1F] border border-[#2C2C30] p-2 rounded text-[#C78BA1] hover:bg-[#2C2C30] transition-colors"
            title={isLocked ? "Unlock Canvas" : "Lock Canvas"}
          >
            {isLocked ? (
              <Lock className="w-4 h-4" />
            ) : (
              <Unlock className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
          nodesDraggable={!isLocked}
          nodesConnectable={!isLocked}
          elementsSelectable={!isLocked}
          fitView
          className="bg-[#0F0F12]"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#2C2C30"
          />
          <Controls
            className="rounded-lg overflow-hidden border border-[#2C2C30] shadow-xl"
            style={
              {
                backgroundColor: "#1B1B1F",
                "--xy-controls-button-bg": "#1B1B1F",
                "--xy-controls-button-bg-hover": "#2C2C30",
                "--xy-controls-button-color": "#C78BA1",
                "--xy-controls-button-border-color": "#2C2C30",
              } as React.CSSProperties
            }
          />
        </ReactFlow>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-4 left-4 z-10 text-xs text-gray-500 font-mono">
        {nodes.length} nodes • {edges.length} edges •{" "}
        {isLocked ? "READ-ONLY" : "EDIT MODE"}
      </div>
    </div>
  );
};

export default MidnightFiction;
