# Adding Women Categories Guide

## New Categories Added
1. Bags Collection
2. Footwear Collection
3. Accessories Collection
4. Sleepwear & Loungewear

## How to Add to Database

### Option 1: Using Node.js Script (Recommended)
```bash
cd Back-end
node add-women-categories.js
```

### Option 2: Using SQL Script
```bash
# Connect to your PostgreSQL database
psql -U your_username -d your_database_name

# Run the SQL file
\i add-women-categories.sql
```

### Option 3: Manual SQL (Copy and paste in your database client)
```sql
-- Get Women master category ID first
SELECT master_category_id FROM master_categories WHERE LOWER(name) = 'women';

-- Then insert categories (replace X with the actual master_category_id)
INSERT INTO categories (master_category_id, name, slug, description, is_active) VALUES
(X, 'Bags Collection', 'bags-collection', 'Stylish bags for every occasion', true),
(X, 'Footwear Collection', 'footwear-collection', 'Trendy footwear for women', true),
(X, 'Accessories Collection', 'accessories-collection', 'Complete your look with accessories', true),
(X, 'Sleepwear & Loungewear', 'sleepwear-loungewear', 'Comfortable sleepwear and loungewear', true);
```

## Verification

After adding, verify the categories appear:
1. Restart your backend server
2. Visit your homepage
3. Look for "Explore Women" section
4. You should see the 4 new categories displayed

## Frontend Changes
No frontend code changes needed! The CategorySlider component automatically fetches and displays all active categories from the database.

## Adding Category Images (Optional)
To add icons/images for these categories:
1. Go to Admin Dashboard → Categories
2. Find the new categories
3. Edit and upload icon images
4. Images will automatically appear in the CategorySlider

## Troubleshooting

**Categories not showing?**
- Check if Women master category exists: `SELECT * FROM master_categories WHERE LOWER(name) = 'women';`
- Verify categories were inserted: `SELECT * FROM categories WHERE master_category_id = X;`
- Make sure `is_active = true`
- Restart backend server

**Need to delete a category?**
```sql
DELETE FROM categories WHERE slug = 'category-slug-here';
```
