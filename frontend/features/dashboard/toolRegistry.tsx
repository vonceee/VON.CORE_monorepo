import React from "react";
import { Tool } from "../../types/index";
import NotCuteAnymore from "./tools/NotCuteAnymore/NotCuteAnymore";
import { NotCuteAnymoreSidebar } from "./tools/NotCuteAnymore/NotCuteAnymoreSidebar";
import { EyeClosed, ShieldOff } from "lucide-react";
import NotMe from "./tools/NotMe/NotMe";
import { NotMeSidebar } from "./tools/NotMe/NotMeSidebar";
import MyWorld from "./tools/MyWorld/MyWorld";
import { MyWorldSidebar } from "./tools/MyWorld/MyWorldSidebar";
import SundayMorning from "./tools/SundayMorning/SundayMorning";
import { SundayMorningSidebar } from "./tools/SundayMorning/SundayMorningSidebar";
import { Globe, Sun } from "lucide-react";

const Icons = {
  Terminal: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  NotCuteAnymore: <EyeClosed className="w-4 h-4" strokeWidth={1.5} />,
  NotMe: <ShieldOff className="w-4 h-4" strokeWidth={1.5} />,
  MyWorld: <Globe className="w-4 h-4" strokeWidth={1.5} />,
  SundayMorning: <Sun className="w-4 h-4" strokeWidth={1.5} />,
};

export const TOOLS_CONFIG: Tool[] = [
  {
    id: "NOT_CUTE_ANYMORE",
    label: "Not Cute Anymore",
    icon: Icons.NotCuteAnymore,
    component: NotCuteAnymore,
    sidebarComponent: NotCuteAnymoreSidebar,
  },
  {
    id: "NOT_ME",
    label: "Not Me",
    icon: Icons.NotMe,
    component: NotMe,
    sidebarComponent: NotMeSidebar,
  },
  {
    id: "MY_WORLD",
    label: "My World",
    icon: Icons.MyWorld,
    component: MyWorld,
    sidebarComponent: MyWorldSidebar,
  },
  {
    id: "SUNDAY_MORNING",
    label: "Sunday Morning",
    icon: Icons.SundayMorning,
    component: SundayMorning,
    sidebarComponent: SundayMorningSidebar,
  },
];
