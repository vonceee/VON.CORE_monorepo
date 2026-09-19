# VON.CORE | Digital Portfolio & Software Suite

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**VON.CORE** is the personal portfolio and digital showcase for **Von Cedric Rañola** (Full-Stack Engineer). Built with zero unnecessary bloat and strict visual hierarchy, it showcases web applications and independent standalone desktop software suites.

---

## 🖥️ Featured Standalone Desktop Applications

The developer tools and productivity systems originally prototyped within this project have been extracted into independent, standalone desktop software repositories powered by **Electron**, **React 19**, and **Local JSON File Persistence**:

| Desktop Application | Description | Technology Stack | Repository |
| :--- | :--- | :--- | :--- |
| **Not Cute Anymore** | High-discipline routine manager, active task HUD, and daily quest logger. | Electron 34, React 19, TypeScript, Local JSON IPC | [`not-cute-anymore-desktop`](../not-cute-anymore-desktop) |
| **Not Me** | Minimalist habit, vice, and relapse tracking app with milestone badges. | Electron 34, React 19, TypeScript, Local JSON IPC | [`not-me-desktop`](../not-me-desktop) |
| **My World** | Hierarchical tree folder organizer and distraction-free markdown canvas. | Electron 34, React 19, TypeScript, Local JSON IPC | [`my-world-desktop`](../my-world-desktop) |

---

## 🚀 Getting Started with the Portfolio

### Prerequisites
- **Node.js**: `v20+` recommended

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for static production hosting
npm run build

# 4. Preview the production build
npm run preview
```

---

## 🏗️ Portfolio Architecture

- **`App.tsx`**: Primary portfolio entry point with smooth Lenis scroll management and view transitions.
- **`components/`**: Core design system components, interactive 3D spheres, particle canvas, and layout elements.
- **`features/portfolio/`**:
  - `HeroSection.tsx`: Brutalist introduction and interactive 3D sphere.
  - `AboutSection.tsx`: Background, technical proficiencies, and contact details.
  - `ExperienceSection.tsx`: Professional timeline and milestones.
  - `PortfolioSection.tsx`: Showcase carousel featuring standalone desktop applications.
  - `ProjectDetailModal.tsx`: High-resolution system specification and architecture modal viewer.
  - `ContactSection.tsx`: Minimalist contact and collaboration channel.

---

## 🧪 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

---

## 📄 License
MIT License. Open-sourced software.
