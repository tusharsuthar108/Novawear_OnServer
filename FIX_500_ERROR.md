# Fix for 500 Internal Server Error

## What Was Fixed:
The 500 error was caused by a SQL query issue in the product controller where there was a table alias conflict between the `categories` table (aliased as `c`) and the `colors` table (also trying to use `c2`).

## Changes Made:
1. Fixed the `getAllProducts` function in `product.controller.js`
2. Changed colors table alias from `c2` to `col` to avoid conflicts
3. Selected specific columns instead of `p.*` for better performance
4. Ensured proper GROUP BY clause

## To Apply the Fix:

### Step 1: Restart Backend Server
```bash
# Stop the current backend server (Ctrl+C)
cd Back-end
npm start
```

### Step 2: Test the Fix
1. Open browser: `http://localhost:5173`
2. Go to any category page (e.g., `/shop/women/bags-collection`)
3. Products should load without 500 error
4. Prices should display correctly
5. Add to cart should work

## Verification:
- ✅ Products API returns data without errors
- ✅ Prices display from variants
- ✅ Images show correctly
- ✅ Add to cart works
- ✅ Category filtering works

## If Error Persists:

1. **Check Backend Console** for error messages
2. **Check Browser Console** (F12) for specific error
3. **Verify Database Connection**:
   ```bash
   cd Back-end
   node -e "require('./src/config/database').query('SELECT 1').then(() => console.log('DB OK')).catch(e => console.error(e))"
   ```

4. **Test Products Endpoint Directly**:
   Open: `http://localhost:3000/api/products`
   Should return JSON with products array

## Common Issues:

### Backend Not Running
```bash
cd Back-end
npm start
```

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Error
Check `.env` file in Back-end folder:
```
DB_USER=your_user
DB_HOST=localhost
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432
```

## Success Indicators:
When working correctly, you should see:
- Products load on homepage
- Category pages show products with prices
- No 500 errors in browser console
- Backend console shows no errors
