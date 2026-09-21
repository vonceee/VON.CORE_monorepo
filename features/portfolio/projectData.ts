export interface DesktopProject {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  techStack: string[];
  githubUrl?: string;
}

export const PROJECTS: DesktopProject[] = [
  {
    id: "VON.CLOCK",
    title: "Productivity App",
    category: "Personal Project",
    image: "assets/aes/tools/VON.CLOCK_portfolio.webp",
    description:
      "A desktop productivity app I built to solve my own time-management. I often lost track of time while programming, so I designed this tool to send active reminders, keep me on schedule, and build better time management habits.",
    features: [
      "Real-time clock synchronization with active task highlight and duration timers",
      "Routine editor with batch duplication",
      "Local JSON file storage"
    ],
    techStack: ["Electron", "React 19", "TypeScript", "Tailwind CSS", "Electron IPC"],
    githubUrl: "https://github.com/vonceee/not-cute-anymore-desktop"
  },
  {
    id: "VON.CHESS",
    title: "Chess Study Tool",
    category: "Personal Project",
    image: "assets/aes/tools/VON.CHESS_portfolio.webp",
    description:
      "A chess study web application I built to support my father's chess tutoring sessions. It provides an all-in-one coaching toolkit that simplifies lesson delivery for instructors and helps students master chess concepts through interactive learning tools.",
    features: [
      "Chess Study Notebook",
      "Real-Time Chess Classroom Lobby",
      "Chess Puzzles",
      "Chess Engine",
      "Other Chess Mini-Games"
    ],
    techStack: ["Angular", "TypeScript", "Tailwind CSS", "WebSocket", "Laravel"],
    githubUrl: "https://vonchess.net/home"
  },
  {
    id: "Hazard Awareness Information Platform",
    title: "Hazard Awareness Information Platform",
    category: "Freelance Project",
    image: "assets/aes/tools/HAIP_portfolio.webp",
    description:
      "A web-based information platform for academic purposes. It is a platform that provides information about hazards and risks.",
    features: [
      "Informative web pages about different hazards",
      "Modules in Hazard Awareness",
      "3D Animated Illustrations"
    ],
    techStack: ["Vercel", "React 19", "TypeScript", "Tailwind CSS", "Spline3D"],
    githubUrl: "https://haip-monorepo.vercel.app/"
  }
];
