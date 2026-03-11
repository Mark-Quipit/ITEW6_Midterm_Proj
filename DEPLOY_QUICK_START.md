# 🚀 Quick Deploy Guide - Railway.app

## TL;DR - Deploy in 5 Steps (15 minutes)

### Step 1: Push to GitHub (2 min)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Sign Up Railway (1 min)
- Go to https://railway.app
- Click "Login with GitHub"
- Authorize Railway

### Step 3: Create Project (2 min)
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Wait for initial deploy

### Step 4: Add Database (2 min)
1. Click "New" in your project
2. Select "Database"
3. Choose "PostgreSQL"
4. Railway auto-connects it

### Step 5: Configure & Deploy (8 min)

#### 5.1 Generate APP_KEY locally:
```bash
php artisan key:generate --show
```
Copy the output (starts with `base64:`)

#### 5.2 Add Environment Variables:
Click your web service → Variables → Add these:

```env
APP_NAME=CCS Profiling System
APP_ENV=production
APP_KEY=base64:YOUR_KEY_FROM_STEP_5.1
APP_DEBUG=false
APP_URL=https://your-app.railway.app

DB_CONNECTION=pgsql
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_DATABASE=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}

SESSION_DRIVER=file
CACHE_DRIVER=file
```

#### 5.3 Redeploy:
Click "Deploy" button

#### 5.4 Run Migrations:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and link
railway login
railway link

# Run migrations
railway run php artisan migrate --force
railway run php artisan db:seed --force
```

### Done! 🎉
Your app is live at: `https://your-app.railway.app`

---

## Files Already Created ✅

These files are already in your project:
- ✅ `Procfile` - Tells Railway how to start your app
- ✅ `nixpacks.toml` - Build configuration
- ✅ `railway.json` - Railway settings

You don't need to create anything else!

---

## Troubleshooting

### Build Failed?
**Check:** Settings → Deployments → View logs

**Common fixes:**
```bash
# Clear caches
railway run php artisan config:clear
railway run php artisan cache:clear
railway run php artisan view:clear
```

### 500 Error?
**Fix:**
1. Check APP_KEY is set correctly
2. Make sure migrations ran
3. Check database connection

### Assets Not Loading?
**Fix:**
1. Make sure `npm run build` completed
2. Check APP_URL matches your Railway URL
3. Redeploy

---

## Update Your App

```bash
# Make changes
git add .
git commit -m "Update message"
git push origin main
```

Railway auto-deploys on push!

---

## Cost

**Free Tier:**
- $5 credit per month
- ~500 hours runtime
- Perfect for testing/learning

**If you exceed:**
- Pay-as-you-go
- ~$5-10/month for small apps

---

## Alternative: Can't Use Railway?

See `DEPLOYMENT_OPTIONS.md` for alternatives:
- Render.com (similar to Railway)
- DigitalOcean App Platform ($12/month)
- Shared hosting ($5/month)

---

## Why Not Vercel?

❌ Vercel doesn't support PHP
❌ Your Laravel app needs PHP runtime
✅ Use Railway instead (supports PHP)

---

## Need Help?

1. Read `DEPLOYMENT_RAILWAY.md` for detailed guide
2. Check Railway docs: https://docs.railway.app
3. Join Railway Discord: https://discord.gg/railway

---

**Your app will be live in 15 minutes!** 🚀
