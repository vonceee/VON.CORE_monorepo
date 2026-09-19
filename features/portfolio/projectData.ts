export interface DesktopProject {
  id: string;
  title: string;
  category: string;
  badge: string;
  image: string;
  description: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  platforms: string[];
  architecture: {
    runtime: string;
    ui: string;
    storage: string;
    ipc: string;
  };
  githubUrl?: string;
  status: "Standalone Desktop Software" | "Web Application";
}

export const PROJECTS: DesktopProject[] = [
  {
    id: "NOT_CUTE_ANYMORE",
    title: "Not Cute Anymore",
    category: "Desktop Productivity Suite",
    badge: "DESKTOP APP",
    image: "assets/aes/tools/routine-manager.jpg",
    description:
      "A structured, time-based routine manager. Plan and visualize your day through a chronological timeline of activities, featuring routine cloning and focus isolation.",
    longDescription:
      "Not Cute Anymore is an offline-first desktop application designed for high-discipline daily execution. It maps tasks in real-time to the current system clock, providing an active task focus HUD, day-by-day scheduling, routine duplication across weekdays/weekends, quest logs, and an integrated event logger.",
    features: [
      "Real-time clock synchronization with active task highlight and duration timers",
      "Interactive routine editor with multi-day batch duplication and interval planning",
      "Daily Quest Log for status tracking, task progression, and checklist completion",
      "Terminal event logger for auditing routine completion history",
      "100% self-contained local JSON file storage with zero external database dependencies"
    ],
    techStack: ["Electron", "React 19", "TypeScript", "Tailwind CSS", "Electron IPC"],
    platforms: ["Windows", "macOS", "Linux"],
    architecture: {
      runtime: "Electron 34 (Frameless Native Window)",
      ui: "React 19 + TypeScript + Tailwind CSS 4",
      storage: "Local JSON Engine via OS userData path",
      ipc: "Secure ContextBridge + ipcRenderer/ipcMain"
    },
    githubUrl: "https://github.com/vonceee/not-cute-anymore-desktop",
    status: "Standalone Desktop Software"
  },
  {
    id: "NOT_ME",
    title: "Not Me",
    category: "Desktop Habit Tracker",
    badge: "DESKTOP APP",
    image: "assets/aes/tools/habit-tracker.jpg",
    description:
      "A minimalist behavior tracker designed for clarity. Monitor daily quantities and binary outcomes (Win/Loss) with precision counters and historical trends.",
    longDescription:
      "Not Me is a dedicated desktop application engineered to eliminate negative habits and monitor personal milestones. It combines strict binary tracking (Win/Clean vs Loss/Relapse) with streak calculation, milestone badges, daily journal notes, and multi-year calendar heatmaps.",
    features: [
      "Dual tracking modes: Binary victory/relapse and numeric counter tracking",
      "Dynamic clean streak calculator with automatic milestone badge unlocking",
      "Full calendar matrix visualization with historical entry review and daily notes",
      "Fast tracker creator with custom categories, icons, and target thresholds",
      "Private local disk persistence guaranteeing user data never leaves the device"
    ],
    techStack: ["Electron", "React 19", "TypeScript", "Tailwind CSS", "Electron IPC"],
    platforms: ["Windows", "macOS", "Linux"],
    architecture: {
      runtime: "Electron 34 (Frameless Native Window)",
      ui: "React 19 + TypeScript + Tailwind CSS 4",
      storage: "Local JSON Engine via OS userData path",
      ipc: "Secure ContextBridge + ipcRenderer/ipcMain"
    },
    githubUrl: "https://github.com/vonceee/not-me-desktop",
    status: "Standalone Desktop Software"
  },
  {
    id: "MY_WORLD",
    title: "My World",
    category: "Desktop Digital Garden",
    badge: "DESKTOP APP",
    image: "assets/aes/tools/note-taker.jpg",
    description:
      "A personal digital garden for organizing thoughts and documentation. Features a deep hierarchical folder structure, tabbed editing, and real-time auto-save.",
    longDescription:
      "My World is an expansive, distraction-free markdown documentation and worldbuilding desktop software. Built for writers, worldbuilders, and engineers, it features an infinite hierarchical folder tree, multi-tab document editing, favorites pinning, and instantaneous local disk autosaving.",
    features: [
      "Deep hierarchical folder tree with drag-and-drop reorganization and nesting",
      "Multi-tab editor supporting simultaneous active markdown documents",
      "Star/favorite quick-access system and tag categorization",
      "Distraction-free dark mode UI optimized for deep writing sessions",
      "Local file tree persistence with zero latency and automatic state preservation"
    ],
    techStack: ["Electron", "React 19", "TypeScript", "Tailwind CSS", "Electron IPC"],
    platforms: ["Windows", "macOS", "Linux"],
    architecture: {
      runtime: "Electron 34 (Frameless Native Window)",
      ui: "React 19 + TypeScript + Tailwind CSS 4",
      storage: "Local JSON Engine via OS userData path",
      ipc: "Secure ContextBridge + ipcRenderer/ipcMain"
    },
    githubUrl: "https://github.com/vonceee/my-world-desktop",
    status: "Standalone Desktop Software"
  }
];
