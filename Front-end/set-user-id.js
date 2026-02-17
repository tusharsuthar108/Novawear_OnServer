// QUICK FIX: Run this in browser console to set a user ID
// Then refresh the profile page

// Option 1: Set user ID 1 (if exists in database)
localStorage.setItem('userId', '1');

// Option 2: Check what users exist by calling the API
// Open browser console and run:
// fetch('http://localhost:3000/api/users').then(r => r.json()).then(console.log)

// After setting userId, refresh the page
console.log('✅ User ID set to:', localStorage.getItem('userId'));
console.log('🔄 Refresh the page now');
