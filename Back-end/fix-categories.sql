-- Fix Women's Clothing categories (currently has kids items)
-- Move Boys Clothing, Girls Clothing, Baby Wear, School Uniforms to Kids & Baby (ID: 4)
UPDATE categories SET master_category_id = 4 WHERE category_id IN (11, 12, 13, 14);

-- Fix Men's Clothing categories (currently has women's items)
-- Move Blouses, Dresses, Leggings, Skirts, Tops to Women's Clothing (ID: 3)
UPDATE categories SET master_category_id = 3 WHERE name IN ('Blouses', 'Dresses', 'Leggings', 'Skirts', 'Tops');

-- Verify the changes
SELECT mc.name as master_category, c.name as category_name
FROM categories c
JOIN master_categories mc ON c.master_category_id = mc.master_category_id
WHERE mc.master_category_id IN (2, 3, 4)
ORDER BY mc.name, c.name;
