const pool = require('./src/config/database');

(async () => {
  try {
    const result = await pool.query(`
      SELECT p.name, c.name as category 
      FROM products p 
      JOIN categories c ON p.category_id = c.category_id 
      JOIN master_categories mc ON c.master_category_id = mc.master_category_id 
      WHERE mc.name = 'Women''s Clothing' 
      ORDER BY c.name
    `);
    
    console.log('Products in Women\'s Clothing:');
    if (result.rows.length === 0) {
      console.log('❌ No products found in Women\'s Clothing categories');
      console.log('\nYou need to add products through the admin panel:');
      console.log('1. Go to Admin Dashboard');
      console.log('2. Click "Add Product"');
      console.log('3. Select Women\'s Clothing as Master Category');
      console.log('4. Select a category (Dresses, Tops, Skirts, etc.)');
      console.log('5. Fill in product details and save');
    } else {
      result.rows.forEach(row => console.log(`  ${row.category} -> ${row.name}`));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
