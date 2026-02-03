# VON.CORE Frontend

The **VON.CORE Frontend** is a modern React application built with **React 19**, **Vite**, and **Tailwind CSS 4**. It serves as the visual interface for the VON.CORE platform, combining a polished developer portfolio with a powerful dashboard of creative tools.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Latest LTS recommended (v20+).
- **Laravel Backend**: Ensure the backend API is running for full functionality.

### Installation

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Start the development server:
    ```bash
    npm run dev
    ```

## 🛠️ Features

### 1. Developer Dashboard

A comprehensive workspace for productivity, featuring a **resizable split-pane grid**.

- **Magnetic**: A timeline-based scheduling tool for tracking upcoming and past events.
- **Midnight Fiction**: A node-based editor for narrative planning and brainstorming.
- **Not Cute Anymore**: A structured task management system with "Quest Log" and "Terminal Log".

### 2. Portfolio

A multi-language capabilities showcase designed for "Digital Architects".

### 3. Terminal Interface

A retro-futuristic command line interface accessible throughout the web experience.

## 🏗️ Project Structure

- **`/features`**: Core application logic grouped by domain.
  - **`/dashboard`**: Contains the Editor Grid, Dashboard tools (Magnetic, Midnight Fiction, etc.).
  - **`/portfolio`**: Portfolio pages and components.
  - **`/terminal`**: Terminal emulator logic and components.
- **`/components`**: Shared UI components (Buttons, Inputs, Modals).
- **`/context`**: Global state management (Auth, Theme, etc.).
- **`/services`**: API clients and data fetching logic.
- **`/assets`**: Static assets (images, fonts).

## 🧪 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Languages**: TypeScript, CSS
- **Utilities**:
  - `@dnd-kit`: specific drag-and-drop interactions.
  - `axios`: HTTP requests.
  - `lucide-react`: Iconography.

## 📄 License

Part of the **VON.CORE** monorepo. MIT License.
