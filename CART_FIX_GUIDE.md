# Cart Not Adding Items - Fix Guide

## Problem
Items are not being added to cart from home page.

## Root Cause
User must be logged in (have user_id in localStorage) for cart to work with database.

## Quick Fix - Test Cart Without Login

### Step 1: Set Test User in Browser
1. Open your website in browser
2. Press **F12** to open Developer Console
3. Go to **Console** tab
4. Paste this code and press Enter:

```javascript
localStorage.setItem('user', JSON.stringify({
  user_id: 1,
  full_name: "Test User",
  email: "test@example.com"
}));
console.log('✅ Test user set! Refresh the page.');
```

### Step 2: Refresh Page
- Press **Ctrl+R** or **F5** to refresh
- Cart will now load from database

### Step 3: Add Items to Cart
- Hover over any product
- Click "Add" button
- You should see "Added to cart!" alert
- Check browser console for any errors

### Step 4: Verify Cart Persists
1. Add some items to cart
2. Refresh the page (F5)
3. Cart items should still be there!

## Check if it's Working

### In Browser Console (F12):
```javascript
// Check if user is set
console.log('User:', JSON.parse(localStorage.getItem('user')));

// Check cart items
console.log('Cart items:', /* check cart icon count */);
```

### Check Backend Logs:
- Look for "Add to cart error" messages
- Check if API calls are being made to /api/cart/add

## Common Issues

### Issue 1: "Please login to add items to cart" alert
**Solution**: Run the localStorage code above to set test user

### Issue 2: No alert appears when clicking Add
**Solution**: 
- Check browser console for errors
- Make sure backend is running on http://localhost:3000
- Check if product has variants

### Issue 3: Alert shows but item not in cart
**Solution**:
- Check backend console for errors
- Verify database tables exist (cart, cart_items)
- Check if user_id exists in users table

## Verify Database

Run this in backend folder:
```bash
node test-product-images.js
```

Or check database directly:
```sql
-- Check if cart tables exist
SELECT * FROM cart LIMIT 1;
SELECT * FROM cart_items LIMIT 1;

-- Check if user exists
SELECT * FROM users WHERE user_id = 1;
```

## For Production

For real users, implement proper login:
1. User logs in via login page
2. Backend returns user data including user_id
3. Frontend stores user in localStorage
4. Cart automatically works for logged-in users
