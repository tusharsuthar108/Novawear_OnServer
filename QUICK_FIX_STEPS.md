# Quick Fix Steps

## The Issue
Products don't have main images set (image_url is NULL), they only have variant images.

## Solution Applied
1. ✅ Added image_url column to products table
2. ✅ Updated backend to fallback to variant images if no main image
3. ✅ Updated backend to save images when editing products

## To See Images Now:

### Step 1: Restart Backend Server
```bash
cd Back-end
# Stop the current server (Ctrl+C)
# Then restart it
node src/server.js
# OR
npm start
```

### Step 2: Refresh Frontend
- Go to your browser
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Images should now appear on home page (using variant images as fallback)

### Step 3: Test Image Update
1. Go to Admin → Product List
2. Click "Edit" on any product
3. Upload a new image
4. Click "Update Product"
5. Go to Home page
6. The product should show the new image

## What Changed in Code:

### Backend (product.controller.js)
- `getAllProducts` now uses COALESCE to fallback to variant images
- `updateProduct` now saves uploaded images to image_url column

### Frontend (CardSlider.jsx)
- Already configured to display product.image_url

## If Images Still Don't Show:
1. Check browser console for errors
2. Check if backend is running on http://localhost:3000
3. Check if uploads/products folder has images
4. Verify the backend query returns image_url in the response
