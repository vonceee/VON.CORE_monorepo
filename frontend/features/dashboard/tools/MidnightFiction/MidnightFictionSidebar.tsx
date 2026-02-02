import React from "react";
import { LayoutTemplate, GitGraph, Box } from "lucide-react";
import { useMidnightStore, MidnightNode } from "./store";
import { Edge } from "@xyflow/react";

interface Template {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  data: { nodes: MidnightNode[]; edges: Edge[] };
}

const TEMPLATES: Template[] = [
  {
    id: "chess-improvement",
    name: "Chess Improvement",
    icon: <Box className="w-4 h-4" />,
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
    icon: <GitGraph className="w-4 h-4" />,
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
    icon: <LayoutTemplate className="w-4 h-4" />,
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

export const MidnightFictionSidebar: React.FC = () => {
  const loadTemplate = useMidnightStore((state) => state.loadTemplate);

  const handleTemplateClick = (template: Template) => {
    loadTemplate(template.data.nodes, template.data.edges);
  };

  return (
    <div className="flex flex-col h-full bg-[#0F0F12] border-l border-[#2C2C30] w-full animate-fade-in font-sans">
      <div className="p-4 border-b border-[#2C2C30]">
        <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-wider flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-[#C78BA1]" />
          Templates
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateClick(template)}
            className="w-full text-left p-3 rounded-lg border border-[#2C2C30] bg-[#1B1B1F] hover:border-[#C78BA1] hover:bg-[#2C2C30] transition-all group focus:outline-none focus:ring-2 focus:ring-[#C78BA1]/50"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-200 group-hover:text-[#C78BA1] transition-colors">
                {template.name}
              </span>
              <span className="text-gray-500 group-hover:text-[#C78BA1]">
                {template.icon}
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2 group-hover:text-gray-400">
              {template.description}
            </p>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-[#2C2C30] text-xs text-center text-gray-500">
        Select a template to load
      </div>
    </div>
  );
};
