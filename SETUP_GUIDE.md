# CCS Setup Guide

## Current Status

✅ Frontend dependencies installed (npm packages)
✅ Database credentials configured in .env
❌ PHP not installed
❌ Composer not installed

## Installation Steps for macOS

### 1. Install PHP

You have several options:

**Option A: Using Homebrew (Recommended)**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PHP 8.2
brew install php@8.2

# Add to PATH
echo 'export PATH="/opt/homebrew/opt/php@8.2/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify installation
php --version
```

**Option B: Using Laravel Herd (Easiest for Laravel development)**
```bash
# Download from: https://herd.laravel.com/
# Herd includes PHP, Composer, and everything you need for Laravel
```

### 2. Install Composer

**If using Homebrew:**
```bash
brew install composer
```

**If using manual installation:**
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
```

### 3. Install PostgreSQL (if not already installed)

```bash
brew install postgresql@15
brew services start postgresql@15
```

Your database is already configured to use Neon (cloud PostgreSQL), so local PostgreSQL is optional.

### 4. Complete Laravel Setup

Once PHP and Composer are installed:

```bash
# Install Laravel dependencies
composer install

# Generate application key
php artisan key:generate

# Run migrations (after creating migration files)
php artisan migrate

# Link storage
php artisan storage:link
```

### 5. Start Development Servers

**Terminal 1 - Laravel Backend:**
```bash
php artisan serve
```

**Terminal 2 - Vite Frontend:**
```bash
npm run dev
```

Then visit: http://localhost:8000

## Database Setup

Your .env is configured with Neon PostgreSQL:
- Host: ep-solitary-recipe-a1mhlozz-pooler.ap-southeast-1.aws.neon.tech
- Database: profiling_db
- User: neondb_owner

The database is already accessible. You just need to create the migration files.

## Next Steps After PHP/Composer Installation

1. Create migration files for your existing schema
2. Run migrations
3. Create seeders (optional)
4. Set up authentication
5. Test the application

## Quick Start with Laravel Herd (Recommended)

1. Download Laravel Herd: https://herd.laravel.com/
2. Install it (includes PHP, Composer, everything)
3. Run `composer install` in project directory
4. Run `php artisan key:generate`
5. Run `php artisan migrate`
6. Open the project in Herd
7. Run `npm run dev` in terminal
8. Visit the local URL provided by Herd

## Troubleshooting

### If you get "composer not found"
- Make sure Composer is in your PATH
- Try: `which composer`
- Restart your terminal after installation

### If you get "php not found"
- Make sure PHP is in your PATH
- Try: `which php`
- Restart your terminal after installation

### Database connection issues
- Verify your Neon database credentials
- Check if your IP is whitelisted in Neon dashboard
- Test connection: `php artisan tinker` then `DB::connection()->getPdo();`
