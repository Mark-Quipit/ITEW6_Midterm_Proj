# Quick Start Guide

## ✅ What's Already Done

1. ✅ npm packages installed
2. ✅ Database configured (.env file)
3. ✅ All code written (frontend + backend)
4. ✅ Migration files created

## 🚀 What You Need to Do Now

### Step 1: Install PHP & Composer

**Easiest Method - Laravel Herd (Recommended):**
1. Download from: https://herd.laravel.com/
2. Install it (includes PHP, Composer, Nginx, everything)
3. Done! Skip to Step 2.

**Alternative - Using Homebrew:**
```bash
# Install PHP
brew install php@8.2

# Install Composer
brew install composer
```

### Step 2: Install Laravel Dependencies

```bash
composer install
```

### Step 3: Generate Application Key

```bash
php artisan key:generate
```

### Step 4: Run Database Migrations

```bash
php artisan migrate
```

This will create all the tables in your Neon PostgreSQL database.

### Step 5: Start the Application

**Terminal 1 - Backend:**
```bash
php artisan serve
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 6: Open in Browser

Visit: http://localhost:8000

## 🎉 That's It!

Your CCS Profiling System should now be running.

## 📝 Notes

- Your database is already configured (Neon PostgreSQL)
- All frontend assets are ready
- All backend code is written
- You just need PHP/Composer to run it

## ⚠️ If You Get Errors

### "composer not found"
- Make sure Composer is installed
- Restart your terminal
- Try: `which composer`

### "php not found"
- Make sure PHP is installed
- Restart your terminal
- Try: `which php`

### Database connection error
- Check your Neon database is accessible
- Verify credentials in .env file
- Make sure your IP is whitelisted in Neon

### Migration errors
- Make sure database exists
- Check database credentials
- Try: `php artisan migrate:fresh` (warning: drops all tables)

## 🆘 Need Help?

Check these files:
- INSTALLATION_STATUS.md - Current project status
- SETUP_GUIDE.md - Detailed setup instructions
- README.md - Full project documentation
