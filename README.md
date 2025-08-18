# Laravel Sail with Neon Database

A Laravel application using Laravel Sail for containerized development with Neon PostgreSQL database.

## 🎯 **Why This Setup?**

### **Environment Consistency**
- **Docker containers** ensure every developer has the exact same environment
- **No "works on my machine" issues** - same PHP, Node.js, and database versions
- **Standardized development environment** across team members

### **Reduced Setup Complexity**
- **One command setup**: `composer setup` installs everything and starts the app
- **One command start**: `composer start` starts the entire development environment
- **One command stop**: `composer stop` stops everything cleanly
- **No manual installation** of PHP, Node.js, or database required

### **Developer Experience**
- **Quick onboarding** - new developers can start coding in minutes
- **Consistent tooling** - everyone uses the same development stack
- **Easy troubleshooting** - standardized environment makes debugging easier

## 🚀 Quick Start Summary

| Task | Command | Description |
|------|---------|-------------|
| **1. Setup** | `composer setup` | Complete initial setup (.env + sail install + sail script + install + key + migrate + start) |
| **2. Start Development** | `composer start` | Start the entire development environment |
| **3. Stop Development** | `composer stop` | Stop all services |
| **4. Restart Everything** | `composer restart` | Restart all services |
| **5. Run Migrations** | `./vendor/bin/sail artisan migrate` | Apply database changes |
| **6. Add PHP Library** | `composer require package` → `composer update-php` | Install PHP package and restart |
| **7. Add JS Library** | `npm install package` → `composer update-js` | Install JS package and restart |
| **8. Create New Model** | `./vendor/bin/sail artisan make:model Name -mcr` → `composer restart` | Create model with migration, controller, routes |
| **9. Pull New Code** | `git pull` → `composer update` | Update code and dependencies |
| **10. Reset Database** | `composer reset` | Fresh database with seed data |
| **11. View Website** | `http://localhost` | Access your application |
| **12. If Something Breaks** | `composer rebuild` | Complete rebuild from scratch |

---

## Prerequisites

- Docker Desktop installed and running
- WSL2 Ubuntu (for Windows users)
- Composer installed
- Node.js and npm installed

## 1. Setup

### Initial Setup

#### Quick Setup (Recommended)
```bash
# Clone the repository
git clone <your-repo-url>
cd my-app2

# Configure your database in .env.example before running setup
# (Update DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD for your Neon database)

# One command to set up everything (includes .env, key generation, migrations)
composer setup
```

#### Manual Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd my-app2

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### What `composer setup` Does

The `composer setup` command performs these steps automatically:

1. **Install PHP dependencies** (`composer install`)
2. **Create .env file** (`cp .env.example .env`)
3. **Install Laravel Sail** (`composer require laravel/sail --dev`)
4. **Install Sail services** (`php artisan sail:install`)
5. **Fix Sail script** (`dos2unix` and create custom script)
6. **Start Docker containers** (`./vendor/bin/sail up -d`)
7. **Install npm dependencies** (`./vendor/bin/sail npm install`)
8. **Generate application key** (`./vendor/bin/sail artisan key:generate`)
9. **Run database migrations** (`./vendor/bin/sail artisan migrate`)
10. **Start development server** (`./vendor/bin/sail npm run dev`)

### Database Configuration

**Important**: Before running `composer setup`, update your `.env.example` file with your Neon database credentials:

### Sail Setup

```bash
# Install Laravel Sail
composer require laravel/sail --dev

# Install Sail services (PostgreSQL)
php artisan sail:install

# Fix Sail script line endings (WSL users)
dos2unix ./vendor/bin/sail
chmod +x ./vendor/bin/sail

# Create custom Sail script for better compatibility
cat > ./vendor/bin/sail << 'EOF'
#!/bin/bash

# Laravel Sail - Simple wrapper for Docker Compose and Laravel commands

# Check if the first argument is a Docker Compose command
case "$1" in
    up|down|build|ps|logs|exec|run|stop|start|restart|pull|push|config|create|kill|pause|unpause|port|top|stats|scale|rm|wait|watch|ls|version|volumes|events|attach|commit|cp|export|images|port|publish)
        # These are Docker Compose commands
        docker-compose "$@"
        ;;
    artisan)
        # Handle artisan commands
        docker-compose exec laravel.test php artisan "${@:2}"
        ;;
    *)
        # Everything else goes to the Laravel container
        docker-compose exec laravel.test "$@"
        ;;
esac
EOF

chmod +x ./vendor/bin/sail
```

### Database Migration

```bash
# Start Sail services
./vendor/bin/sail up -d

# Run database migrations
./vendor/bin/sail artisan migrate

# Seed database (if seeders exist)
./vendor/bin/sail artisan db:seed
```

## 2. Start Development

### Quick Start (Recommended)
```bash
# One command to start everything
composer start

# Access your application
# http://localhost
# http://localhost:8000 (alternative port)
```

### Manual Start
```bash
# Start all services
./vendor/bin/sail up -d

# Start frontend development server
./vendor/bin/sail npm run dev

# Access your application
# http://localhost
```

## 3. Stop Development

### Quick Stop (Recommended)
```bash
# One command to stop everything
composer stop
```

### Manual Stop
```bash
# Stop all services
./vendor/bin/sail down

# Stop and remove volumes (complete cleanup)
./vendor/bin/sail down -v
```

## 4. Useful Commands

### Quick Commands (Recommended)
```bash
composer start          # Start development environment
composer stop           # Stop development environment
composer restart        # Restart everything
composer setup          # Initial setup (install + start)
composer fresh          # Fresh start (reset database + start)
composer reset          # Reset database and restart
composer update         # Update all dependencies and restart
composer update-php     # Update PHP dependencies and restart
composer update-js      # Update JavaScript dependencies and restart
composer rebuild        # Rebuild containers and restart
```

### Sail Commands

```bash
# Container management
./vendor/bin/sail up -d              # Start services in background
./vendor/bin/sail down               # Stop services
./vendor/bin/sail restart            # Restart services
./vendor/bin/sail ps                 # Show running containers
./vendor/bin/sail logs               # View container logs
./vendor/bin/sail logs laravel.test  # View Laravel container logs

# Build containers
./vendor/bin/sail build              # Build containers
./vendor/bin/sail build --no-cache   # Rebuild without cache
```

### Laravel Artisan Commands

```bash
# Database
./vendor/bin/sail artisan migrate                    # Run migrations
./vendor/bin/sail artisan migrate:fresh              # Fresh migration (drop all tables)
./vendor/bin/sail artisan migrate:fresh --seed       # Fresh migration with seeding
./vendor/bin/sail artisan migrate:rollback           # Rollback last migration
./vendor/bin/sail artisan migrate:reset              # Reset all migrations
./vendor/bin/sail artisan migrate:status             # Check migration status

# Model and Migration creation
./vendor/bin/sail artisan make:model Product         # Create model
./vendor/bin/sail artisan make:model Product -m      # Create model with migration
./vendor/bin/sail artisan make:model Product -c      # Create model with controller
./vendor/bin/sail artisan make:model Product -mcr    # Create model, migration, controller, resource routes

# Cache and Config
./vendor/bin/sail artisan config:clear               # Clear config cache
./vendor/bin/sail artisan cache:clear                # Clear application cache
./vendor/bin/sail artisan route:clear                # Clear route cache
./vendor/bin/sail artisan view:clear                 # Clear view cache
./vendor/bin/sail artisan optimize:clear             # Clear all caches

# Database
./vendor/bin/sail artisan db:seed                    # Run seeders
./vendor/bin/sail artisan db:wipe                    # Drop all tables
./vendor/bin/sail artisan tinker                     # Open Laravel shell

# Testing
./vendor/bin/sail artisan test                       # Run tests
./vendor/bin/sail artisan test --filter=UserTest     # Run specific test
```

### NPM Commands

```bash
# Frontend development
./vendor/bin/sail npm install                        # Install dependencies
./vendor/bin/sail npm run dev                        # Start development server
./vendor/bin/sail npm run build                      # Build for production
./vendor/bin/sail npm run watch                      # Watch for changes
```

### Database Commands

```bash
# Connect to database
./vendor/bin/sail artisan tinker                     # Laravel shell
./vendor/bin/sail artisan db:show                    # Show database info

# Check database connection
./vendor/bin/sail artisan tinker --execute="DB::connection()->getPdo(); echo 'Connected!';"
```

### Troubleshooting Commands

```bash
# Fix transaction issues
./vendor/bin/sail artisan tinker --execute="DB::statement('ROLLBACK');"

# Check Sail script
head -3 ./vendor/bin/sail                            # Check Sail script

# Rebuild containers
./vendor/bin/sail down
./vendor/bin/sail build --no-cache
./vendor/bin/sail up -d

# Reset everything
./vendor/bin/sail down -v
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate:fresh --seed
```

## 5. Development Workflow

### Adding New Features

#### Step 1: Create New Models/Controllers
```bash
# Create model with migration
./vendor/bin/sail artisan make:model Product -m

# Create controller with resource routes
./vendor/bin/sail artisan make:controller ProductController --resource

# Create model with everything
./vendor/bin/sail artisan make:model Product -mcr
```

#### Step 2: Edit Files
```bash
# Edit migration file
# database/migrations/xxxx_create_products_table.php

# Edit controller
# app/Http/Controllers/ProductController.php

# Add routes
# routes/web.php

# Create views
# resources/views/products/
```

#### Step 3: Run Migration and Restart
```bash
# Run migration and restart
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm run dev

# Or use the quick command
composer restart
```

### Adding New Libraries/Dependencies

#### Adding PHP Libraries
```bash
# Install new PHP package
composer require package-name

# Update dependencies and restart
composer update-php
```

#### Adding JavaScript Libraries
```bash
# Install new npm package
npm install package-name

# Update dependencies and restart
composer update-js
```

#### Adding Both PHP and JavaScript Libraries
```bash
# Install both types of packages
composer require php-package-name
npm install js-package-name

# Update everything and restart
composer update
```

### Common Development Scenarios

#### After Pulling New Code
```bash
# Pull latest changes
git pull origin main

# Update dependencies and restart
composer update
```

#### After Adding New Features
```bash
# Create your feature files
./vendor/bin/sail artisan make:model NewFeature -mcr

# Edit files, then restart
composer restart
```

#### After Installing New Packages
```bash
# Install packages
composer require new-package
npm install new-js-package

# Update and restart
composer update
```

#### If Something Breaks
```bash
# Rebuild everything from scratch
composer rebuild
```

### Quick Reference - What to Run When:

| Scenario | Command |
|----------|---------|
| **Starting development** | `composer start` |
| **Stopping development** | `composer stop` |
| **Adding PHP libraries** | `composer require package` → `composer update-php` |
| **Adding JS libraries** | `npm install package` → `composer update-js` |
| **Adding both** | `composer require package` + `npm install package` → `composer update` |
| **Creating new models** | `./vendor/bin/sail artisan make:model Name -mcr` → `composer restart` |
| **Pulling new code** | `git pull` → `composer update` |
| **Something broken** | `composer rebuild` |
| **View website** | `http://localhost` or `http://localhost:8000` |

### Database Changes

```bash
# Create new migration
./vendor/bin/sail artisan make:migration add_column_to_products_table

# Run migration
./vendor/bin/sail artisan migrate

# Rollback if needed
./vendor/bin/sail artisan migrate:rollback
```

## 6. Environment Variables

Key environment variables in `.env`:

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:your-key-here
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=pgsql
DB_HOST=your-neon-host
DB_PORT=5432
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_SSLMODE=require
```

## 7. Troubleshooting

### Common Issues

**Sail script line ending errors:**
```bash
dos2unix ./vendor/bin/sail
chmod +x ./vendor/bin/sail
```

**Database connection issues:**
```bash
./vendor/bin/sail artisan config:clear
./vendor/bin/sail artisan tinker --execute="DB::connection()->getPdo();"
```

**Container not starting:**
```bash
./vendor/bin/sail down
./vendor/bin/sail build --no-cache
./vendor/bin/sail up -d
```

**Migration transaction errors:**
```bash
./vendor/bin/sail artisan tinker --execute="DB::statement('ROLLBACK');"
./vendor/bin/sail artisan migrate
```

## 8. Useful Aliases

Add these to your `~/.bashrc` for convenience:

```bash
alias sail='./vendor/bin/sail'
alias artisan='./vendor/bin/sail artisan'
alias migrate='./vendor/bin/sail artisan migrate'
alias fresh='./vendor/bin/sail artisan migrate:fresh --seed'
alias tinker='./vendor/bin/sail artisan tinker'
```

Then reload: `source ~/.bashrc`

## 9. Production Deployment

For production deployment, ensure:

1. Set `APP_ENV=production`
2. Set `APP_DEBUG=false`
3. Generate production key: `php artisan key:generate`
4. Run `npm run build`
5. Set up proper database credentials
6. Configure web server (Nginx/Apache)

## Support

For issues related to:
- **Laravel Sail**: [Laravel Sail Documentation](https://laravel.com/docs/sail)
- **Neon Database**: [Neon Documentation](https://neon.tech/docs)
- **Docker**: [Docker Documentation](https://docs.docker.com/)
