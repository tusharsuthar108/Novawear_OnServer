-- Add new categories for Women collection
-- First, get the master_category_id for Women (assuming it exists)

-- Insert Bags Collection
INSERT INTO categories (master_category_id, name, slug, description, is_active)
SELECT master_category_id, 'Bags Collection', 'bags-collection', 'Stylish bags for every occasion', true
FROM master_categories WHERE LOWER(name) = 'women' LIMIT 1;

-- Insert Footwear Collection
INSERT INTO categories (master_category_id, name, slug, description, is_active)
SELECT master_category_id, 'Footwear Collection', 'footwear-collection', 'Trendy footwear for women', true
FROM master_categories WHERE LOWER(name) = 'women' LIMIT 1;

-- Insert Accessories Collection
INSERT INTO categories (master_category_id, name, slug, description, is_active)
SELECT master_category_id, 'Accessories Collection', 'accessories-collection', 'Complete your look with accessories', true
FROM master_categories WHERE LOWER(name) = 'women' LIMIT 1;

-- Insert Sleepwear & Loungewear
INSERT INTO categories (master_category_id, name, slug, description, is_active)
SELECT master_category_id, 'Sleepwear & Loungewear', 'sleepwear-loungewear', 'Comfortable sleepwear and loungewear', true
FROM master_categories WHERE LOWER(name) = 'women' LIMIT 1;

-- Verify the insertions
SELECT c.category_id, c.name, c.slug, m.name as master_category
FROM categories c
JOIN master_categories m ON c.master_category_id = m.master_category_id
WHERE c.name IN ('Bags Collection', 'Footwear Collection', 'Accessories Collection', 'Sleepwear & Loungewear')
ORDER BY c.created_at DESC;
