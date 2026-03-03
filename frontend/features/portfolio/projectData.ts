import { Project } from "../../types";

export const PROJECTS: Project[] = [
  {
    id: "NOT_CUTE_ANYMORE",
    title: "Routine Manager",
    category: "Productivity",
    image: "assets/aes/tools/routine-manager.jpg",
    description:
      "A structured, time-based routine manager. Plan and visualize your day through a chronological timeline of activities, featuring routine cloning and focus isolation.",
    techStack: ["React", "TypeScript", "Tailwind", "Dnd-Kit"],
  },
  {
    id: "NOT_ME",
    title: "Habit Tracker",
    category: "Habit Tracker",
    image: "assets/aes/tools/habit-tracker.jpg",
    description:
      "A minimalist behavior tracker designed for clarity. Monitor daily quantities and binary outcomes (Win/Loss) with precision counters and historical trends.",
    techStack: ["React", "Recharts", "Supabase", "Framer Motion"],
  },
  {
    id: "MY_WORLD",
    title: "Note Taker",
    category: "Digital Garden",
    image: "assets/aes/tools/note-taker.jpg",
    description:
      "A personal digital garden for organizing thoughts and documentation. Features a deep hierarchical folder structure, tabbed editing, and real-time auto-save.",
    techStack: ["React", "Rich Text", "FileSystem API", "Optimistic UI"],
  },
  {
    id: "SUNDAY_MORNING",
    title: "Brochureware",
    category: "Fan Experience",
    image: "assets/aes/tools/brochureware.jpg",
    description:
      "An immersive aesthetic experience. Explore tracks, lyrics, and visuals in a curated, fan-centric interface with adaptive theming.",
    techStack: ["React", "Web Audio API", "Masonry Layout", "Animation"],
  },
  {
    id: "MAGNETIC",
    title: "Birthday Tracker",
    category: "Birthday Tracker",
    image: "assets/aes/tools/birthday-tracker.jpg",
    description:
      "Visual milestone tracking. Monitor upcoming events and reflect on your origins through a unified, fluid timeline and countdown grid.",
    techStack: ["React", "Date-fns", "Timeline Visualization"],
  },
];
