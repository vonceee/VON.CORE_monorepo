import React from "react";
import { Tool } from "../../types";
import { Magnetic, MagneticSidebar } from "./tools/Magnetic";
import { MidnightFiction } from "./tools/MidnightFiction";

const Icons = {
  Magnetic: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      a
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  ),
  LuckyGirl: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  MidnightFiction: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export const TOOLS_CONFIG: Tool[] = [
  {
    id: "MAGNETIC",
    label: "Magnetic",
    icon: Icons.Magnetic,
    component: Magnetic,
    sidebarComponent: MagneticSidebar,
  },
  {
    id: "MIDNIGHT_FICTION",
    label: "Midnight Fiction",
    icon: Icons.MidnightFiction,
    component: MidnightFiction,
  },
];
