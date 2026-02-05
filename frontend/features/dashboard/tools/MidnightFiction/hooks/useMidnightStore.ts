import { create } from "zustand";
import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";
import { MidnightNode, NodeData, Template } from "../types";

// --- Default Templates ---
const DEFAULT_TEMPLATES: Template[] = [
  {
    id: "chess-improvement",
    name: "Chess Improvement",
    description: "Study plan and practice drill workflow.",
    data: {
      nodes: [
        {
          id: "1",
          type: "action",
          position: { x: 250, y: 0 },
          data: { label: "Daily Puzzle" },
        },
        {
          id: "2",
          type: "decision",
          position: { x: 250, y: 100 },
          data: { label: "Solved Correctly?" },
        },
        {
          id: "3",
          type: "resource",
          position: { x: 100, y: 200 },
          data: {
            label: "Analyze Mistakes",
            description: "https://lichess.org/analysis",
          },
        },
        {
          id: "4",
          type: "action",
          position: { x: 400, y: 200 },
          data: { label: "Play Rapid Game" },
        },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3", label: "No" },
        { id: "e2-4", source: "2", target: "4", label: "Yes" },
      ],
    },
  },
  {
    id: "git-workflow",
    name: "Git Workflow",
    description: "Standard branching and merging strategy.",
    data: {
      nodes: [
        {
          id: "1",
          type: "action",
          position: { x: 250, y: 0 },
          data: { label: "git checkout -b feature" },
        },
        {
          id: "2",
          type: "action",
          position: { x: 250, y: 100 },
          data: { label: "Code & Commit" },
        },
        {
          id: "3",
          type: "decision",
          position: { x: 250, y: 200 },
          data: { label: "Tests Pass?" },
        },
        {
          id: "4",
          type: "resource",
          position: { x: 100, y: 300 },
          data: { label: "Fix Bugs" },
        },
        {
          id: "5",
          type: "action",
          position: { x: 400, y: 300 },
          data: { label: "git push" },
        },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
        { id: "e3-4", source: "3", target: "4", label: "No" },
        { id: "e3-5", source: "3", target: "5", label: "Yes" },
        { id: "e4-2", source: "4", target: "2" },
      ],
    },
  },
  {
    id: "laravel-feature",
    name: "Laravel Feature Start",
    description: "Checklist for new feature implementation.",
    data: {
      nodes: [
        {
          id: "1",
          type: "action",
          position: { x: 250, y: 0 },
          data: { label: "php artisan make:model -mcr" },
        },
        {
          id: "2",
          type: "action",
          position: { x: 250, y: 100 },
          data: { label: "Define Migration" },
        },
        {
          id: "3",
          type: "action",
          position: { x: 250, y: 200 },
          data: { label: "Define Factory/Seeder" },
        },
        {
          id: "4",
          type: "resource",
          position: { x: 250, y: 300 },
          data: { label: "API Routes", description: "Route::apiResource(...)" },
        },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
        { id: "e3-4", source: "3", target: "4" },
      ],
    },
  },
];

interface MidnightState {
  nodes: MidnightNode[];
  edges: Edge[];
  isLocked: boolean;
  savedTemplates: Template[];
  workflowName: string;
  currentTemplateId: string | null;

  // Actions
  onNodesChange: OnNodesChange<MidnightNode>;
  onEdgesChange: OnEdgesChange;
  setNodes: (nodes: MidnightNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  toggleLock: () => void;
  loadTemplate: (id: string, nodes: MidnightNode[], edges: Edge[]) => void;
  resetCanvas: () => void;
  cloneCanvas: () => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
  saveCurrentAsTemplate: () => void;
  setWorkflowName: (name: string) => void;
  deleteTemplate: (id: string) => void;
  addAndConnect: (sourceNodeId: string) => void;
}

const STORAGE_KEY = "midnight-fiction-templates";

const getInitialTemplates = (): Template[] => {
  if (typeof window === "undefined") return DEFAULT_TEMPLATES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : DEFAULT_TEMPLATES;
    }
  } catch (e) {
    console.error("Failed to load templates from local storage", e);
  }
  return DEFAULT_TEMPLATES;
};

export const useMidnightStore = create<MidnightState>((set, get) => ({
  nodes: [],
  edges: [],
  isLocked: true,
  savedTemplates: getInitialTemplates(),
  workflowName: "Untitled Workflow",
  currentTemplateId: null,

  setWorkflowName: (name: string) => set({ workflowName: name }),

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

  loadTemplate: (id, nodes, edges) => {
    set({ currentTemplateId: id, nodes, edges, isLocked: true });
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
      workflowName: "Untitled Workflow",
      currentTemplateId: null,
    });
  },

  cloneCanvas: () => {
    set({
      isLocked: false,
      workflowName: `${get().workflowName} (Copy)`,
      currentTemplateId: null,
    });
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

  saveCurrentAsTemplate: () => {
    const { nodes, edges, savedTemplates, workflowName, currentTemplateId } =
      get();

    // If we have a current template ID, update existing
    if (currentTemplateId) {
      const updatedTemplates = savedTemplates.map((t) => {
        if (t.id === currentTemplateId) {
          return {
            ...t,
            name: workflowName,
            data: { nodes, edges },
          };
        }
        return t;
      });
      set({ savedTemplates: updatedTemplates });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTemplates));
    } else {
      // Create new
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString();

      const newTemplate: Template = {
        id,
        name: workflowName,
        description: "Custom saved template",
        isCustom: true,
        data: {
          nodes,
          edges,
        },
      };
      const updatedTemplates = [...savedTemplates, newTemplate];
      set({
        savedTemplates: updatedTemplates,
        currentTemplateId: id,
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTemplates));
    }
  },

  deleteTemplate: (id: string) => {
    const { savedTemplates, currentTemplateId } = get();
    const updatedTemplates = savedTemplates.filter((t) => t.id !== id);
    set({
      savedTemplates: updatedTemplates,
      // If we deleted the current template, reset the ID tracking
      currentTemplateId: currentTemplateId === id ? null : currentTemplateId,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTemplates));
  },

  addAndConnect: (sourceNodeId: string) => {
    const { nodes, edges } = get();
    const sourceNode = nodes.find((n) => n.id === sourceNodeId);

    if (!sourceNode) return;

    const newNodeId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString();

    const position = {
      x: sourceNode.position.x + 250,
      y: sourceNode.position.y,
    };

    const newNode: MidnightNode = {
      id: newNodeId,
      type: "action", // Default to action, user can change type later if we add that feature
      position,
      data: { label: "New Node" },
      selected: true,
    };

    const newEdge: Edge = {
      id: `e${sourceNodeId}-${newNodeId}`,
      source: sourceNodeId,
      target: newNodeId,
    };

    set({
      nodes: [...nodes.map((n) => ({ ...n, selected: false })), newNode],
      edges: [...edges, newEdge],
    });
  },
}));
