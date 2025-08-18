# Laravel Sail Project - Claude Code Assistant Guide

## Project Overview
Laravel application with React/TypeScript frontend using Inertia.js, Tailwind CSS, and shadcn/ui components.

## Development Commands

### Installing Dependencies
**PHP dependencies (Composer):**
```bash
./vendor/bin/sail composer require package-name
./vendor/bin/sail composer require --dev package-name  # for dev dependencies
```

**JavaScript dependencies (npm):**
```bash
./vendor/bin/sail npm install package-name
./vendor/bin/sail npm install --save-dev package-name  # for dev dependencies
```

### Development Server
```bash
./vendor/bin/sail up -d  # Start containers
./vendor/bin/sail npm run dev  # Start Vite dev server
```

### Code Quality
```bash
./vendor/bin/sail npm run lint  # ESLint
./vendor/bin/sail npm run format  # Prettier
./vendor/bin/sail npm run types  # TypeScript check
```

### Testing
```bash
./vendor/bin/sail test  # PHPUnit tests
./vendor/bin/sail artisan test  # Laravel tests
```

### Database
```bash
./vendor/bin/sail artisan migrate  # Run migrations
./vendor/bin/sail artisan db:seed  # Run seeders
./vendor/bin/sail artisan migrate:fresh --seed  # Fresh migration with seed
```

### Laravel Commands
```bash
./vendor/bin/sail artisan make:model ModelName
./vendor/bin/sail artisan make:controller ControllerName
./vendor/bin/sail artisan make:migration create_table_name
```

### Container Access
```bash
./vendor/bin/sail shell  # Access container shell
./vendor/bin/sail root-shell  # Access as root
```

## Important Notes
- Always use `./vendor/bin/sail` prefix for commands to run inside Docker container
- Frontend assets built with Vite (React/TypeScript)
- Using Inertia.js for SPA-like experience with Laravel backend
- shadcn/ui component library with Tailwind CSS