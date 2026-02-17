# How to Add Products to Bags Collection

## Method 1: Admin Dashboard (Easiest)

1. Go to `http://localhost:5173/admin/dashboard`
2. Click "Products" → "Add Product"
3. Fill in the form:
   - **Product Name**: e.g., "Leather Handbag"
   - **Master Category**: Select "Women"
   - **Category**: Select "Bags Collection"
   - **Brand**: Select a brand
   - **Price**: Enter price
   - **Upload Images**: Add product images
   - **Description**: Add details
4. Click "Save Product"

## Method 2: Update Existing Products

If you have existing products, update their category:

```sql
-- Get the category_id for Bags Collection
SELECT category_id FROM categories WHERE slug = 'bags-collection';

-- Update products to be in Bags Collection (replace X with category_id)
UPDATE products 
SET category_id = X 
WHERE product_id IN (1, 2, 3); -- Replace with your product IDs
```

## Method 3: Create Sample Bag Products

Run this SQL to create sample bag products:

```sql
-- Get category and brand IDs
DO $$
DECLARE
    bags_category_id INT;
    brand_id INT;
BEGIN
    -- Get Bags Collection category ID
    SELECT category_id INTO bags_category_id 
    FROM categories WHERE slug = 'bags-collection' LIMIT 1;
    
    -- Get a brand ID (or use your preferred brand)
    SELECT brand_id INTO brand_id 
    FROM brands LIMIT 1;
    
    -- Insert sample bag products
    INSERT INTO products (name, category_id, brand_id, description, image_url, is_active)
    VALUES 
    ('Leather Tote Bag', bags_category_id, brand_id, 'Spacious leather tote bag', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500', true),
    ('Crossbody Bag', bags_category_id, brand_id, 'Stylish crossbody bag', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500', true),
    ('Backpack', bags_category_id, brand_id, 'Casual backpack for daily use', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', true),
    ('Clutch Bag', bags_category_id, brand_id, 'Evening clutch bag', 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500', true),
    ('Shoulder Bag', bags_category_id, brand_id, 'Classic shoulder bag', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500', true);
    
END $$;
```

## Method 4: Node.js Script

Create `add-bag-products.js`:

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

const bagProducts = [
  { name: 'Leather Tote Bag', description: 'Spacious leather tote', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' },
  { name: 'Crossbody Bag', description: 'Stylish crossbody', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500' },
  { name: 'Backpack', description: 'Casual daily backpack', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
  { name: 'Clutch Bag', description: 'Evening clutch', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500' },
  { name: 'Shoulder Bag', description: 'Classic shoulder bag', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500' }
];

async function addBagProducts() {
  try {
    // Get Bags Collection category
    const catResult = await pool.query(
      "SELECT category_id FROM categories WHERE slug = 'bags-collection' LIMIT 1"
    );
    
    if (catResult.rows.length === 0) {
      console.error('Bags Collection category not found!');
      return;
    }
    
    const categoryId = catResult.rows[0].category_id;
    
    // Get a brand
    const brandResult = await pool.query('SELECT brand_id FROM brands LIMIT 1');
    const brandId = brandResult.rows[0]?.brand_id || 1;
    
    console.log(`Adding products to Bags Collection (category_id: ${categoryId})...\n`);
    
    for (const product of bagProducts) {
      const result = await pool.query(
        `INSERT INTO products (name, category_id, brand_id, description, image_url, is_active)
         VALUES ($1, $2, $3, $4, $5, true)
         RETURNING product_id, name`,
        [product.name, categoryId, brandId, product.description, product.image]
      );
      
      console.log(`✓ Added: ${result.rows[0].name} (ID: ${result.rows[0].product_id})`);
    }
    
    console.log('\n✓ All bag products added successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

addBagProducts();
```

Run: `node add-bag-products.js`

## Verify Products

Check if products were added:

```sql
SELECT p.product_id, p.name, c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.category_id
WHERE c.slug = 'bags-collection';
```

## View on Website

1. Go to homepage
2. Scroll to "Explore Women"
3. Click "Bags Collection"
4. You should see all bag products!

## Important Notes

- Products need variants (size, color, price) to be fully functional
- Add product variants through Admin Dashboard after creating products
- Make sure products have images for better display
- Set `is_active = true` to make products visible
