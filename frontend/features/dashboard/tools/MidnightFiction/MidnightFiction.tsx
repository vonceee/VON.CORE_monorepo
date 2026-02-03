import React, { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Lock, Unlock, Copy as CopyIcon, Plus } from "lucide-react";
import { useMidnightStore } from "./hooks/useMidnightStore";
import { MidnightNode } from "./types";
import {
  ActionNode,
  ResourceNode,
  DecisionNode,
} from "./components/CustomNodes";
import { NodeEditorModal } from "./components/NodeEditorModal";

export const MidnightFiction: React.FC = () => {
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
    updateNodeData,
  } = useMidnightStore();

  const [editingNode, setEditingNode] = useState<MidnightNode | null>(null);

  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: MidnightNode) => {
      if (!isLocked) {
        setEditingNode(node);
      }
    },
    [isLocked],
  );

  const handleSaveNode = (label: string, description: string) => {
    if (editingNode) {
      updateNodeData(editingNode.id, {
        label,
        description,
      });
      setEditingNode(null);
    }
  };

  const nodeTypes = useMemo(
    () => ({
      action: ActionNode,
      resource: ResourceNode,
      decision: DecisionNode,
    }),
    [],
  );

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
        <NodeEditorModal
          node={editingNode}
          onSave={handleSaveNode}
          onCancel={() => setEditingNode(null)}
        />
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
