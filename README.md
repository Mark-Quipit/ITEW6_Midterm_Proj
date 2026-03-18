# CCS - Comprehensive Profiling System

A web-based profiling system for the College of Computing Studies built with Laravel, React, TypeScript, Inertia.js, and TailwindCSS.

## Features

- Student Profile Management
- Faculty Profile Management
- Events Management
- Scheduling Module
- Research Repository
- Instructional Materials Management

## Tech Stack

- **Backend**: Laravel 10
- **Frontend**: React + TypeScript
- **Bridge**: Inertia.js
- **Styling**: TailwindCSS
- **Database**: PostgreSQL

## Installation

### Prerequisites

- PHP 8.1+
- Composer
- Node.js 18+
- PostgreSQL
- npm or yarn

### Setup Steps

1. Clone the repository
```bash
git clone <repository-url>
cd ccs-profiling-system
```

2. Install PHP dependencies
```bash
composer install
```

3. Install Node dependencies
```bash
npm install
```

4. Configure environment
```bash
cp .env.example .env
```

Edit `.env` and configure your database:
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ccs_database
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

5. Generate application key
```bash
php artisan key:generate
```

6. Run migrations (after creating your database schema)
```bash
php artisan migrate
```

7. Build frontend assets
```bash
npm run build
```

For development:
```bash
npm run dev
```

8. Start the development server
```bash
php artisan serve
```

Visit `http://localhost:8000`

## Project Structure

```
├── app/
│   ├── Models/              # Eloquent models
│   ├── Http/
│   │   ├── Controllers/     # Base controllers
│   │   └── Middleware/      # Middleware
│   └── Providers/           # Service providers
├── modules/                 # Modular architecture
│   ├── students/
│   ├── faculty/
│   ├── events/
│   ├── research/
│   ├── scheduling/
│   └── instructional/
├── resources/
│   ├── js/
│   │   ├── pages/          # Inertia pages
│   │   ├── components/     # React components
│   │   ├── layouts/        # Layout components
│   │   └── types/          # TypeScript types
│   └── views/              # Blade templates
├── routes/
│   ├── web.php             # Web routes
│   └── auth.php            # Auth routes
└── database/
    └── migrations/         # Database migrations

```

## Module Architecture

Each module follows a clean architecture pattern:

- **Controller**: Handles HTTP requests
- **Service**: Contains business logic
- **Repository**: Handles database operations
- **Request**: Validation rules (to be implemented)

## Development

### Running in Development Mode

Terminal 1 - Laravel server:
```bash
php artisan serve
```

Terminal 2 - Vite dev server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
php artisan optimize
```

## Database Schema

The system uses the existing database schema with tables for:
- Students and related data
- Faculty and assignments
- Academic records
- Events
- Research
- Scheduling
- Instructional materials

## Contributing

Follow the modular architecture when adding new features. Each module should maintain separation of concerns with controllers, services, and repositories.

## License

MIT