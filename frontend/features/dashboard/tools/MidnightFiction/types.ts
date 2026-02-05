import React from "react";
import { Node, Edge } from "@xyflow/react";

export type NodeType = "action" | "resource" | "decision";

export interface NodeData extends Record<string, unknown> {
  label: string;
  description?: string;
}

export type MidnightNode = Node<NodeData>;

export interface Template {
  id: string;
  name: string;
  description: string;
  isCustom?: boolean;
  data: { nodes: MidnightNode[]; edges: Edge[] };
}
