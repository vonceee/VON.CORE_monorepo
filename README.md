# VON.CORE Monorepo

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**VON.CORE** is a creative development platform and portfolio designed with a minimalist aesthetic, functioning as both a personal showcase and a suite of digital tools. The project is structured as a monorepo containing a high-performance Laravel backend and a modern React frontend.

---

## 🏗️ Project Structure

- **`/backend`**: Laravel 12 API providing data services and system health monitoring.
- **`/frontend`**: React 19 application featuring a portfolio, terminal interface, and developer dashboard.
- **`/scripts`**: Windows automation scripts for easy development workflow.

---

## 🚀 Getting Started

### Prerequisites

- **PHP**: ^8.2
- **Node.js**: Latest LTS recommended
- **Composer**: For PHP dependency management

### Quick Start (Windows)

The easiest way to run the entire stack (Frontend + Backend + Database) is using the included VBS scripts.

1. **Start the Application**:
   Double-click `scripts/launch_app.vbs`.
   - Starts XAMPP/MariaDB (if configured).
   - Serves the Laravel Backend (`localhost:8000`).
   - Starts the Vite Frontend Dev Server (`localhost:5173`).
   - Opens the browser automatically.

2. **Stop the Application**:
   Double-click `scripts/kill_app.vbs`.
   - Safely terminates all related Node.js and PHP processes.

### Manual Setup

#### Backend (Laravel)

```bash
cd backend
composer install
php -r "file_exists('.env') || copy('.env.example', '.env');"
php artisan key:generate
php artisan migrate
php artisan serve
```

#### Frontend (React + Vite)

```bash
cd frontend
npm install
# Configure .env.local with your GEMINI_API_KEY if needed
npm run dev
```

---

## 🛠️ Features

### Digital Portfolio

A multi-language portfolio (ENG, JPN, KOR, RUS, PH) showcasing projects like **NEO-STRUCT** and **CORE_SYSTEM**. Built for "Digital Architects" who push the boundaries between art and technology.

### Developer Dashboard

A centralized powerhouse for productivity and creativity, featuring a **resizable split-pane grid** layout for multitasking.

- **Magnetic**: A specialized scheduling and utility tool for tracking upcoming and past events with a timeline view.
- **Midnight Fiction**: A creative node-based editor for narrative planning, featuring drag-and-drop nodes and locked/unlocked states.
- **Not Cute Anymore**: A comprehensive task and routine management system featuring a "Quest Log" for daily objectives and a "Terminal Log" for tracking history.

### System & Architecture

- **Terminal Interface**: A retro-futuristic command line interface integrated into the web experience.
- **API Services**: Robust Laravel 12 API endpoints for data persistence and health monitoring (`GET /api/health`).

---

## 🧪 Tech Stack

| Component         | Technology                                                 |
| :---------------- | :--------------------------------------------------------- |
| **Backend**       | Laravel 12, PHP 8.2, Sanctum                               |
| **Frontend**      | React 19, TypeScript, Vite 6, Tailwind CSS 4               |
| **State & Logic** | React Hooks, Context API                                   |
| **UI / UX**       | `@dnd-kit` (Drag & Drop), Lucide React (Icons), Classnames |
| **HTTP Client**   | Axios                                                      |
| **Testing**       | PHPUnit 11                                                 |

---

## 📄 License

This project is open-sourced software licensed under the **MIT license**.
