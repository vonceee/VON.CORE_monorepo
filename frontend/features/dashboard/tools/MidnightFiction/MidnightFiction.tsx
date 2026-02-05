import React, { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Lock,
  Unlock,
  Copy as CopyIcon,
  Plus,
  Save,
  Network,
} from "lucide-react";
import { useMidnightStore } from "./hooks/useMidnightStore";
import { MidnightNode } from "./types";
import {
  ActionNode,
  ResourceNode,
  DecisionNode,
} from "./components/CustomNodes";
import { NodeEditorModal } from "./components/NodeEditorModal";
import { midnightService } from "../../../../services/api/midnight";

const MidnightFictionContent: React.FC = () => {
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
    saveCurrentAsTemplate,
    setNodes,
    setEdges,
    workflowName,
    setWorkflowName,
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

  const handleAddAction = () => {
    // Find selected node
    const selectedNode = nodes.find((n) => n.selected);

    // Calculate position
    let position = { x: 250, y: 100 };
    if (selectedNode) {
      position = {
        x: selectedNode.position.x,
        y: selectedNode.position.y + 150,
      };
    } else if (nodes.length > 0) {
      // Place below the last node
      const lastNode = nodes[nodes.length - 1];
      position = {
        x: lastNode.position.x,
        y: lastNode.position.y + 150,
      };
    }

    const newNode: MidnightNode = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString(),
      type: "action",
      position,
      data: { label: "New Action" },
      selected: true, // Select the new node
    };

    // deselect others and add new node
    const updatedNodes = [
      ...nodes.map((n) => ({ ...n, selected: false })),
      newNode,
    ];
    setNodes(updatedNodes);

    if (selectedNode) {
      const newEdge = {
        id: `e${selectedNode.id}-${newNode.id}`,
        source: selectedNode.id,
        target: newNode.id,
      };
      setEdges([...edges, newEdge]);
    }
  };

  return (
    <div className="w-full h-full bg-[#0F0F12] relative font-sans">
      <style>
        {`
          .react-flow__attribution {
            background: transparent !important;
          }
        `}
      </style>
      {editingNode && (
        <NodeEditorModal
          node={editingNode}
          onSave={handleSaveNode}
          onCancel={() => setEditingNode(null)}
        />
      )}
      {/* Header / Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
        <div className="flex gap-2 items-center">
          <input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="bg-[#1B1B1F] border border-[#2C2C30] px-3 py-2 rounded text-[#C78BA1] text-sm focus:outline-none focus:border-pink-500 w-48"
            placeholder="Workflow Name..."
          />

          {!isLocked && (
            <>
              <button
                onClick={handleAddAction}
                className="bg-[#1B1B1F] border border-[#2C2C30] p-2 rounded text-[#C78BA1] hover:bg-[#2C2C30] transition-colors"
                title="Add Action Node"
              >
                <Plus className="w-4 h-4" />
              </button>
              <div className="w-px h-8 bg-[#2C2C30] mx-1" />
            </>
          )}

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
            onClick={saveCurrentAsTemplate}
            className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
          >
            Save
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
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export const MidnightFiction: React.FC = () => {
  return (
    <ReactFlowProvider>
      <MidnightFictionContent />
    </ReactFlowProvider>
  );
};
