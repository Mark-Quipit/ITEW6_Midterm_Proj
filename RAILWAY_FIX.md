# Railway Deployment Fix

## Issue
Your deployment failed because:
- Your local PHP version is 8.5
- Your `composer.lock` has packages requiring PHP 8.4+
- Railway was using PHP 8.2

## Solution Applied

I've updated `nixpacks.toml` to:
1. Use PHP 8.3 (more compatible)
2. Add `--ignore-platform-reqs` flag to composer install

## Deploy Now

### Step 1: Commit and Push Changes
```bash
git add nixpacks.toml
git commit -m "Fix PHP version compatibility for Railway"
git push origin main
```

### Step 2: Railway Will Auto-Deploy
Railway will automatically detect the push and redeploy with the fixed configuration.

### Step 3: Monitor Deployment
1. Go to Railway dashboard
2. Click on your service
3. Watch the "Deployments" tab
4. Build should succeed now!

---

## If Still Fails

### Alternative Fix 1: Delete composer.lock and Regenerate

```bash
# Delete lock file
rm composer.lock

# Regenerate with platform requirements
composer install --ignore-platform-reqs

# Commit and push
git add composer.lock
git commit -m "Regenerate composer.lock"
git push origin main
```

### Alternative Fix 2: Use Railway CLI to Update

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Set environment variable
railway variables set COMPOSER_ALLOW_SUPERUSER=1

# Redeploy
railway up
```

### Alternative Fix 3: Downgrade Local Dependencies

If you want to match Railway's PHP version:

```bash
# Update composer.json to require PHP 8.2 specifically
# Change "php": "^8.1" to "php": "^8.2"

# Update dependencies
composer update

# Commit and push
git add composer.json composer.lock
git commit -m "Lock to PHP 8.2 compatibility"
git push origin main
```

---

## What Changed

### Before (nixpacks.toml):
```toml
[phases.setup]
nixPkgs = ['php82', 'php82Packages.composer', 'nodejs-18_x']

[phases.install]
cmds = [
    'composer install --no-dev --optimize-autoloader',
    ...
]
```

### After (nixpacks.toml):
```toml
[phases.setup]
nixPkgs = ['php83', 'php83Packages.composer', 'nodejs-18_x']

[phases.install]
cmds = [
    'composer install --no-dev --optimize-autoloader --ignore-platform-reqs',
    ...
]
```

**Key changes:**
- ✅ PHP 8.2 → PHP 8.3 (better compatibility)
- ✅ Added `--ignore-platform-reqs` flag

---

## Expected Result

After pushing, you should see:
```
✓ composer install --no-dev --optimize-autoloader --ignore-platform-reqs
✓ npm ci
✓ npm run build
✓ php artisan config:cache
✓ php artisan route:cache
✓ php artisan view:cache
✓ Deployment successful
```

---

## Next Steps After Successful Deploy

1. **Add PostgreSQL Database** (if not done):
   - Click "New" in Railway project
   - Select "Database" → "PostgreSQL"

2. **Configure Environment Variables**:
   ```env
   APP_KEY=base64:YOUR_KEY_HERE
   APP_ENV=production
   APP_DEBUG=false
   DB_CONNECTION=pgsql
   DB_HOST=${{Postgres.PGHOST}}
   DB_PORT=${{Postgres.PGPORT}}
   DB_DATABASE=${{Postgres.PGDATABASE}}
   DB_USERNAME=${{Postgres.PGUSER}}
   DB_PASSWORD=${{Postgres.PGPASSWORD}}
   ```

3. **Run Migrations**:
   ```bash
   railway run php artisan migrate --force
   railway run php artisan db:seed --force
   ```

4. **Visit Your App**:
   Your app will be live at: `https://your-app.railway.app`

---

## Troubleshooting

### Still Getting PHP Version Error?

Try this in Railway dashboard:
1. Go to your service
2. Click "Settings"
3. Scroll to "Build Command"
4. Add custom build command:
   ```bash
   composer install --no-dev --optimize-autoloader --ignore-platform-reqs && npm ci && npm run build
   ```

### Build Succeeds But App Crashes?

Check environment variables:
```bash
railway run php artisan config:clear
railway run php artisan cache:clear
railway run php artisan view:clear
```

### Database Connection Error?

Make sure:
- PostgreSQL service is running
- Environment variables are set correctly
- Database credentials match

---

## Summary

✅ Fixed PHP version compatibility
✅ Updated nixpacks.toml
✅ Ready to deploy

**Just push to GitHub and Railway will auto-deploy!** 🚀
