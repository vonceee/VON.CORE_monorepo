import { Project } from "../../types";

export const PROJECTS: Project[] = [
  {
    id: "NOT_CUTE_ANYMORE",
    title: "NOT CUTE ANYMORE",
    category: "Productivity",
    image: "assets/yunah/yunah_12282025_2.jpg",
    description:
      "A structured, time-based routine manager. Plan and visualize your day through a chronological timeline of activities, featuring routine cloning and focus isolation.",
    techStack: ["React", "TypeScript", "Tailwind", "Dnd-Kit"],
  },
  {
    id: "NOT_ME",
    title: "NOT ME",
    category: "Habit Tracker",
    image: "assets/yunah/yunah_01072026.jpg",
    description:
      "A minimalist behavior tracker designed for clarity. Monitor daily quantities and binary outcomes (Win/Loss) with precision counters and historical trends.",
    techStack: ["React", "Recharts", "Supabase", "Framer Motion"],
  },
  {
    id: "MY_WORLD",
    title: "MY WORLD",
    category: "Digital Garden",
    image: "assets/yunah/yunah_01012026_2.jpg",
    description:
      "A personal digital garden for organizing thoughts and documentation. Features a deep hierarchical folder structure, tabbed editing, and real-time auto-save.",
    techStack: ["React", "Rich Text", "FileSystem API", "Optimistic UI"],
  },
  {
    id: "SUNDAY_MORNING",
    title: "SUNDAY MORNING",
    category: "Fan Experience",
    image: "assets/albums/SundayMorning/weverse_0-299937994.jpeg",
    description:
      "An immersive aesthetic experience. Explore tracks, lyrics, and visuals in a curated, fan-centric interface with adaptive theming.",
    techStack: ["React", "Web Audio API", "Masonry Layout", "Animation"],
  },
  {
    id: "MAGNETIC",
    title: "MAGNETIC",
    category: "Milestone Tracker",
    image: "assets/aes/aes_lnlbes.jpg",
    description:
      "Visual milestone tracking. Monitor upcoming events and reflect on your origins through a unified, fluid timeline and countdown grid.",
    techStack: ["React", "Date-fns", "Timeline Visualization"],
  },
  {
    id: "MIDNIGHT_FICTION",
    title: "MIDNIGHT FICTION",
    category: "Workflow Editor",
    image: "assets/yunah/yunah_01012026_4.jpg",
    description:
      "A node-based visual workflow editor. Map complex decisions, resources, and actions in an infinite canvas.",
    techStack: ["React Flow", "XYFlow", "State Machines"],
  },
  {
    id: "LUCKY_GIRL",
    title: "LUCKY GIRL",
    category: "Wellness",
    image: "assets/yunah/yunah_01012026_6.jpg",
    description:
      "Manifestation and self-care dashboard. Features daily affirmations, vision boards, and mood tracking to keep your vibration high.",
    techStack: ["React", "Framer Motion", "Local Storage"],
  },
];
