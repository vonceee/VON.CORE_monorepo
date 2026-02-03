# Personal Website Backend

The backend API for the Personal Website project, built with **Laravel**. This system powers the dashboard, productivity tools, and content management features of the frontend application.

## 🚀 Tech Stack

- **Framework**: [Laravel 12.x](https://laravel.com/)
- **Language**: PHP 8.2+
- **Database**: MySQL / MariaDB
- **Authentication**: Laravel Sanctum
- **Package Manager**: Composer

## 📂 Project Structure

Verified directory structure and key components:

```
backend/
├── app/
│   ├── Http/Controllers/       # API Controllers
│   │   ├── Api/               # API specific controllers (Milestones, V1/*)
│   │   ├── NoteController.php # Notes management
│   │   └── PostController.php # Blog/Feed posts
│   └── Models/                # Eloquent Models
├── database/
│   ├── migrations/            # Database schema definitions
│   └── seeders/               # Initial data population
├── routes/
│   ├── api.php                # API route definitions
│   └── web.php                # Web route definitions
└── tests/                     # Automated tests
```

## ✨ Key Features

- **Notes System**: Full CRUD for notes with folder organization and "favoriting" capabilities.
- **Productivity Suite**:
    - **Routines**: Manage daily habits and recurring tasks.
    - **Trackers**: Log and monitor arbitrary data points (habit tracking).
    - **Milestones**: Countdown and event tracking.
- **System Logging**: Internal logging for system events and debugging.
- **RESTful API**: Standardized JSON responses for all resources.

## 🛠️ Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [PHP](https://www.php.net/) (v8.2 or higher)
- [Composer](https://getcomposer.org/)
- [MariaDB](https://mariadb.org/) or [MySQL](https://www.mysql.com/)

### Steps

1.  **Clone the repository** (if you haven't already):

    ```bash
    git clone <repository_url>
    cd backend
    ```

2.  **Install PHP Dependencies**:

    ```bash
    composer install
    ```

3.  **Environment Configuration**:
    Copy the example environment file and configure your database settings:

    ```bash
    cp .env.example .env
    ```

    Then, open `.env` and update the `DB_*` settings to match your local database credentials.

4.  **Generate Application Key**:

    ```bash
    php artisan key:generate
    ```

5.  **Run Database Migrations & Seeders**:
    Set up the database tables and populate them with initial data:
    ```bash
    php artisan migrate
    php artisan db:seed
    ```

## 🏃 Running the Application

Start the local development server:

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`.

Alternatively, you can use the custom composer script:

```bash
composer run dev
```

## 🔌 API Endpoints Overview

| Resource        | Base Endpoint         | Description                 |
| :-------------- | :-------------------- | :-------------------------- |
| **Notes**       | `/api/notes`          | Manage notes and content    |
| **Folders**     | `/api/folders`        | Organize notes into folders |
| **Routines**    | `/api/v1/routines`    | Daily routine management    |
| **Trackers**    | `/api/v1/trackers`    | Habit and data tracking     |
| **Milestones**  | `/api/milestones`     | Event countdowns            |
| **System Logs** | `/api/v1/system-logs` | Backend activity logs       |

## 🧪 Testing

Run the automated test suite to ensure system stability:

```bash
php artisan test
```
