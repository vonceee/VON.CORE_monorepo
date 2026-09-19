export type Theme = "dark" | "valentines" | "snow";
export type SectionId =
  | "HERO"
  | "ABOUT"
  | "EXPERIENCE"
  | "PORTFOLIO"
  | "DEEP_DIVE"
  | "CONTACT";

export type AppMode = "public" | "dev";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface ScheduleItem {
  id: string;
  time: string; // "09:00"
  activity: string; // "Deep Work"
  intention?: string; // "I create value effortlessly"
  completed: boolean;
  type?: "routine" | "work" | "wellness";
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  techStack: string[];
}
