import axios from "axios";
import { MidnightNode } from "../../features/dashboard/tools/MidnightFiction/types";
import { Edge } from "@xyflow/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export interface WorkflowData {
  name: string;
  nodes: MidnightNode[];
  edges: Edge[];
}

export const midnightService = {
  saveWorkflow: async (data: WorkflowData) => {
    const response = await axios.post(`${API_URL}/midnight-fiction/save`, data);
    return response.data;
  },

  getWorkflows: async () => {
    const response = await axios.get(`${API_URL}/midnight-fiction/list`);
    return response.data;
  },

  getWorkflow: async (id: string) => {
    const response = await axios.get(`${API_URL}/midnight-fiction/load/${id}`);
    return response.data;
  },
};
