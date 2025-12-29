This README covers the **VON.CORE Monorepo**, which consists of a Laravel-based backend and a React/Vite-based frontend portfolio and developer dashboard.

---

# VON.CORE Monorepo

VON.CORE is a creative development platform and portfolio designed with a minimalist aesthetic, functioning as both a personal showcase and a suite of digital tools. The project is structured as a monorepo containing a high-performance Laravel backend and a modern React frontend.

## 🏗️ Project Structure

- **`/backend`**: Laravel 12 API providing data services and system health monitoring.
- **`/frontend`**: React 19 application featuring a portfolio, terminal interface, and developer dashboard.

---

## 🚀 Getting Started

### Prerequisites

- **PHP**: ^8.2
- **Node.js**: Latest LTS recommended
- **Composer**: For PHP dependency management

### Backend Setup (Laravel)

1. Navigate to the backend directory:

```bash
cd backend

```

2. Install dependencies:

```bash
composer install

```

3. Initialize the environment:

```bash
php -r "file_exists('.env') || copy('.env.example', '.env');"
php artisan key:generate

```

4. Run migrations and start the server:

```bash
php artisan migrate
php artisan serve

```

### Frontend Setup (React + Vite)

1. Navigate to the frontend directory:

```bash
cd frontend

```

2. Install dependencies:

```bash
npm install

```

3. Configure the environment:

- Create a `.env.local` file.
- Add your `GEMINI_API_KEY`.

4. Start the development server:

```bash
npm run dev

```

---

## 🛠️ Features

### Digital Portfolio

A multi-language portfolio (ENG, JPN, KOR, RUS, PH) showcasing projects like **NEO-STRUCT** and **CORE_SYSTEM**. It is built for "Digital Architects" who push the boundaries between art and technology.

### Developer Dashboard

A centralized interface (`toolRegistry.tsx`) providing access to various internal tools:

- **Magnetic**: A specialized utility tool.
- **Midnight Fiction**: Time-based or narrative tool.
- **Not Cute Anymore**: A comprehensive task and routine management system featuring a Quest Log and Terminal Log.

### API Services

The backend provides essential endpoints for the ecosystem:

- `GET /api/health`: Monitor service status.
- `GET /api/posts`: Retrieve portfolio or system updates.

---

## 🧪 Tech Stack

| Component    | Technology                                 |
| ------------ | ------------------------------------------ |
| **Backend**  | Laravel 12, PHP 8.2, Sanctum               |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS 4 |
| **Icons**    | Lucide React                               |
| **Testing**  | PHPUnit 11                                 |

---

## 📄 License

This project is open-sourced software licensed under the **MIT license**.
