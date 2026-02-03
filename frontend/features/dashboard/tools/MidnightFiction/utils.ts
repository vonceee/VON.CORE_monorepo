import React from "react";
import { LayoutTemplate, GitGraph, Box } from "lucide-react";
import { Template } from "./types";

export const TEMPLATES: Template[] = [
  {
    id: "chess-improvement",
    name: "Chess Improvement",
    icon: React.createElement(Box, { className: "w-4 h-4" }),
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
    icon: React.createElement(GitGraph, { className: "w-4 h-4" }),
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
    icon: React.createElement(LayoutTemplate, { className: "w-4 h-4" }),
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
