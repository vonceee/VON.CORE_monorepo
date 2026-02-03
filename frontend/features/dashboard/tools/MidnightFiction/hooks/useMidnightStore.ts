import { create } from "zustand";
import {
  Edge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";
import { MidnightNode, NodeData } from "../types";

interface MidnightState {
  nodes: MidnightNode[];
  edges: Edge[];
  isLocked: boolean;

  // Actions
  onNodesChange: OnNodesChange<MidnightNode>;
  onEdgesChange: OnEdgesChange;
  setNodes: (nodes: MidnightNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  toggleLock: () => void;
  loadTemplate: (nodes: MidnightNode[], edges: Edge[]) => void;
  resetCanvas: () => void;
  cloneCanvas: () => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
}

export const useMidnightStore = create<MidnightState>((set, get) => ({
  nodes: [],
  edges: [],
  isLocked: true,

  onNodesChange: (changes: NodeChange<MidnightNode>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  toggleLock: () => set((state) => ({ isLocked: !state.isLocked })),

  loadTemplate: (nodes, edges) => {
    set({ nodes, edges, isLocked: true }); // Default to locked when loading a template
  },

  resetCanvas: () => {
    set({
      nodes: [
        {
          id: "start-1",
          type: "action",
          position: { x: 0, y: 0 },
          data: { label: "Add First Action" },
        },
      ],
      edges: [],
      isLocked: false,
    });
  },

  cloneCanvas: () => {
    const { nodes, edges } = get();
    // In a real app, this would create a new entry in a DB.
    // For now, we just unlock it and maybe shift positions slightly to indicate "new copy" logic if we were appending.
    // Actually, "Clone" usually means "Save As". For now, we'll just unlock and notify.
    set({ isLocked: false });
    alert("Workflow cloned! You are now editing a copy.");
  },

  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
  },
}));
