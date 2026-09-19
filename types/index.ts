import React from "react";

export type Theme = "dark" | "valentines" | "snow";
export type SectionId = "HERO" | "ABOUT" | "EXPERIENCE" | "PORTFOLIO" | "CONTACT";
export type AppMode = "public" | "dev";
export type ToolId =
  | "MAGNETIC"
  | "LUCKY_GIRL"
  | "MIDNIGHT_FICTION"
  | "NOT_ME"
  | "NOT_CUTE_ANYMORE"
  | "MY_WORLD"
  | "SUNDAY_MORNING";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface ScheduleItem {
  id: string;
  time: string;
  activity: string;
  intention?: string;
  completed: boolean;
  type?: "routine" | "work" | "wellness";
}

export interface Tool {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType;
  sidebarComponent?: React.ComponentType;
  description?: string;
}
