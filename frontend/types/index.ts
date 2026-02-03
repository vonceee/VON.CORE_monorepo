import React from "react";

export type Language = "ENG" | "JPN" | "KOR" | "RUS" | "PH";
export type Theme = "dark" | "light";
export type SectionId = "HERO" | "ABOUT" | "PORTFOLIO" | "CONTACT";
export type AppMode = "public" | "dev";
export type ToolId =
  | "MAGNETIC"
  | "LUCKY_GIRL"
  | "MIDNIGHT_FICTION"
  | "NOT_ME"
  | "NOT_CUTE_ANYMORE"
  | "MY_WORLD"
  | "SUNDAY_MORNING";

export interface Translation {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    description: string;
  };
  portfolio: {
    title: string;
    items: { title: string; category: string }[];
  };
  contact: {
    title: string;
    email: string;
    social: string;
  };
}

export type Translations = Record<Language, Translation>;

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
