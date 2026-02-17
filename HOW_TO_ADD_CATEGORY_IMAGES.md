# How to Add Images to Women Categories

## Method 1: Using Admin Dashboard (Recommended)

1. **Login to Admin Dashboard**
   - Go to: `http://localhost:5173/admin/dashboard`
   - Login with admin credentials

2. **Navigate to Categories**
   - Click on "Categories" in the sidebar
   - Find the Women categories:
     - Bags Collection
     - Footwear Collection
     - Accessories Collection
     - Sleepwear & Loungewear

3. **Upload Images**
   - Click "Edit" on each category
   - Upload an icon/image (recommended size: 200x200px or 300x300px)
   - Click "Save"

4. **Verify**
   - Go to homepage
   - Scroll to "Explore Women" section
   - Images should now appear in the circular category icons

---

## Method 2: Using SQL (Direct Database Update)

If you have images in your uploads folder:

```sql
-- Update Bags Collection
UPDATE categories 
SET icon_url = '/uploads/categories/bags-icon.jpg'
WHERE slug = 'bags-collection';

-- Update Footwear Collection
UPDATE categories 
SET icon_url = '/uploads/categories/footwear-icon.jpg'
WHERE slug = 'footwear-collection';

-- Update Accessories Collection
UPDATE categories 
SET icon_url = '/uploads/categories/accessories-icon.jpg'
WHERE slug = 'accessories-collection';

-- Update Sleepwear & Loungewear
UPDATE categories 
SET icon_url = '/uploads/categories/sleepwear-icon.jpg'
WHERE slug = 'sleepwear-loungewear';
```

---

## Method 3: Using Node.js Script

Create a file `update-category-images.js`:

```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const categoryImages = [
  { slug: 'bags-collection', icon_url: '/uploads/categories/bags.jpg' },
  { slug: 'footwear-collection', icon_url: '/uploads/categories/footwear.jpg' },
  { slug: 'accessories-collection', icon_url: '/uploads/categories/accessories.jpg' },
  { slug: 'sleepwear-loungewear', icon_url: '/uploads/categories/sleepwear.jpg' }
];

async function updateImages() {
  for (const cat of categoryImages) {
    await pool.query(
      'UPDATE categories SET icon_url = $1 WHERE slug = $2',
      [cat.icon_url, cat.slug]
    );
    console.log(`✓ Updated ${cat.slug}`);
  }
  await pool.end();
}

updateImages();
```

Run: `node update-category-images.js`

---

## Method 4: Using External URLs (Quick Test)

```sql
-- Use external image URLs for testing
UPDATE categories SET icon_url = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' WHERE slug = 'bags-collection';
UPDATE categories SET icon_url = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300' WHERE slug = 'footwear-collection';
UPDATE categories SET icon_url = 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300' WHERE slug = 'accessories-collection';
UPDATE categories SET icon_url = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300' WHERE slug = 'sleepwear-loungewear';
```

---

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: 200x200px to 500x500px (square recommended)
- **File Size**: Under 500KB for fast loading
- **Location**: Place in `Back-end/uploads/categories/` folder

---

## Where Images Are Stored

Local images should be placed in:
```
Back-end/uploads/categories/
├── bags.jpg
├── footwear.jpg
├── accessories.jpg
└── sleepwear.jpg
```

---

## Troubleshooting

**Images not showing?**
1. Check if file exists in `uploads/categories/` folder
2. Verify database has correct path: `SELECT icon_url FROM categories WHERE slug = 'bags-collection';`
3. Make sure backend server is serving static files from uploads folder
4. Check browser console for 404 errors
5. Clear browser cache

**Image path format:**
- Local: `/uploads/categories/image.jpg`
- External: `https://example.com/image.jpg`

The CategorySlider component automatically handles both formats!
