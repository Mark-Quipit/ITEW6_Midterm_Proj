# Deploy CCS System to Railway.app

Railway.app is the easiest way to deploy your Laravel + React application. It supports PHP, PostgreSQL, and has a free tier.

## Why Railway?

- ✅ Supports PHP (Laravel)
- ✅ Built-in PostgreSQL database
- ✅ Free tier available ($5 credit/month)
- ✅ Automatic HTTPS
- ✅ Easy deployment from GitHub
- ✅ Environment variables management
- ✅ Automatic builds

---

## Prerequisites

1. GitHub account
2. Railway account (sign up at https://railway.app)
3. Your code pushed to GitHub

---

## Step 1: Prepare Your Project

### 1.1 Create Procfile

Create a file named `Procfile` (no extension) in your project root:

```
web: vendor/bin/heroku-php-apache2 public/
```

### 1.2 Create nixpacks.toml

Create `nixpacks.toml` in your project root:

```toml
[phases.setup]
nixPkgs = ['php82', 'php82Packages.composer', 'nodejs-18_x']

[phases.install]
cmds = [
    'composer install --no-dev --optimize-autoloader',
    'npm ci',
    'npm run build'
]

[phases.build]
cmds = [
    'php artisan config:cache',
    'php artisan route:cache',
    'php artisan view:cache'
]

[start]
cmd = 'php artisan serve --host=0.0.0.0 --port=$PORT'
```

### 1.3 Update .gitignore

Make sure these are in your `.gitignore`:

```
/node_modules
/public/hot
/public/storage
/public/build
/storage/*.key
/vendor
.env
.env.backup
.phpunit.result.cache
Homestead.json
Homestead.yaml
npm-debug.log
yarn-error.log
```

### 1.4 Create railway.json

Create `railway.json` in your project root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## Step 2: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Railway deployment"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Railway

### 3.1 Create New Project

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select your repository

### 3.2 Add PostgreSQL Database

1. In your Railway project, click "New"
2. Select "Database"
3. Choose "PostgreSQL"
4. Railway will create and connect the database automatically

### 3.3 Configure Environment Variables

Click on your web service, go to "Variables" tab, and add:

```env
APP_NAME="CCS Profiling System"
APP_ENV=production
APP_KEY=base64:YOUR_KEY_HERE
APP_DEBUG=false
APP_URL=https://your-app.railway.app

LOG_CHANNEL=stack
LOG_LEVEL=error

# Database (Railway provides these automatically)
DB_CONNECTION=pgsql
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_DATABASE=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}

SESSION_DRIVER=file
SESSION_LIFETIME=120

CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

**Important:** Generate APP_KEY locally:
```bash
php artisan key:generate --show
```
Copy the output and paste it as APP_KEY value.

### 3.4 Deploy

1. Railway will automatically start building
2. Wait for the build to complete (5-10 minutes first time)
3. Once deployed, you'll get a URL like: `https://your-app.railway.app`

---

## Step 4: Run Migrations

### 4.1 Using Railway CLI

Install Railway CLI:
```bash
# macOS
brew install railway

# Or using npm
npm i -g @railway/cli
```

Login and run migrations:
```bash
railway login
railway link
railway run php artisan migrate --force
railway run php artisan db:seed --force
```

### 4.2 Alternative: Using Railway Dashboard

1. Go to your project in Railway
2. Click on your web service
3. Go to "Settings" tab
4. Scroll to "Deploy Triggers"
5. Add a custom start command temporarily:
   ```
   php artisan migrate --force && php artisan db:seed --force && php artisan serve --host=0.0.0.0 --port=$PORT
   ```
6. Redeploy
7. After migration, remove the migration commands from start command

---

## Step 5: Configure Domain (Optional)

### 5.1 Use Railway Domain
Railway provides a free domain: `your-app.railway.app`

### 5.2 Use Custom Domain
1. Go to "Settings" in your Railway service
2. Click "Generate Domain" or "Add Custom Domain"
3. Follow the DNS configuration instructions

---

## Troubleshooting

### Build Fails

**Check logs:**
1. Go to Railway dashboard
2. Click on your service
3. View "Deployments" tab
4. Click on failed deployment to see logs

**Common issues:**
- Missing `composer.json` or `package.json`
- PHP version mismatch
- Missing environment variables

### Database Connection Error

**Fix:**
1. Make sure PostgreSQL service is running
2. Check environment variables are correctly set
3. Verify database credentials in Railway dashboard

### 500 Error After Deployment

**Fix:**
```bash
# Clear all caches
railway run php artisan config:clear
railway run php artisan cache:clear
railway run php artisan view:clear
railway run php artisan route:clear

# Then cache again
railway run php artisan config:cache
railway run php artisan route:cache
railway run php artisan view:cache
```

### Assets Not Loading

**Fix:**
1. Make sure `npm run build` ran successfully
2. Check `public/build` directory exists
3. Verify `APP_URL` in environment variables

---

## Updating Your Application

### Push Updates

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

Railway will automatically detect the push and redeploy.

### Run New Migrations

```bash
railway run php artisan migrate --force
```

---

## Cost Estimation

Railway Free Tier:
- $5 credit per month
- Enough for small projects
- ~500 hours of runtime

If you exceed free tier:
- Pay-as-you-go pricing
- ~$5-10/month for small apps

---

## Alternative: Deploy to Render.com

If Railway doesn't work, try Render.com (similar process):

1. Create `render.yaml`:

```yaml
services:
  - type: web
    name: ccs-system
    env: php
    buildCommand: |
      composer install --no-dev --optimize-autoloader
      npm ci
      npm run build
      php artisan config:cache
      php artisan route:cache
      php artisan view:cache
    startCommand: php artisan serve --host=0.0.0.0 --port=$PORT
    envVars:
      - key: APP_KEY
        generateValue: true
      - key: APP_ENV
        value: production
      - key: APP_DEBUG
        value: false
      - key: DATABASE_URL
        fromDatabase:
          name: ccs-db
          property: connectionString

databases:
  - name: ccs-db
    plan: free
```

2. Push to GitHub
3. Connect to Render.com
4. Deploy

---

## Security Checklist

Before going live:

- [ ] Set `APP_DEBUG=false`
- [ ] Set `APP_ENV=production`
- [ ] Generate new `APP_KEY`
- [ ] Use strong database password
- [ ] Enable HTTPS (automatic on Railway)
- [ ] Set up proper CORS if needed
- [ ] Review `.env` for sensitive data
- [ ] Set up database backups
- [ ] Configure proper logging

---

## Monitoring

### Railway Dashboard
- View logs in real-time
- Monitor resource usage
- Check deployment history

### Laravel Logs
```bash
railway run tail -f storage/logs/laravel.log
```

---

## Backup Strategy

### Database Backups

**Manual backup:**
```bash
railway run pg_dump $DATABASE_URL > backup.sql
```

**Automated backups:**
- Railway Pro plan includes automatic backups
- Or use a cron job to backup to S3/Dropbox

---

## Summary

✅ Railway.app is the easiest way to deploy your Laravel + React app
✅ Free tier available
✅ Automatic HTTPS and domain
✅ Built-in PostgreSQL
✅ Easy updates via Git push

**Deployment time:** 15-30 minutes
**Cost:** Free tier ($5 credit/month) or ~$5-10/month

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Laravel Deployment: https://laravel.com/docs/deployment

---

**Your app will be live at:** `https://your-app.railway.app` 🚀
