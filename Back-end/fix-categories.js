const pool = require('./src/config/database');

(async () => {
  try {
    // Move kids categories to Kids & Baby master category
    await pool.query('UPDATE categories SET master_category_id = 4 WHERE category_id IN (11, 12, 13, 14)');
    console.log('✅ Moved kids categories to Kids & Baby');
    
    // Move women's categories to Women's Clothing master category
    await pool.query("UPDATE categories SET master_category_id = 3 WHERE name IN ('Blouses', 'Dresses', 'Leggings', 'Skirts', 'Tops')");
    console.log('✅ Moved women categories to Women\'s Clothing');
    
    // Verify
    const result = await pool.query(`
      SELECT mc.name as master, c.name as category 
      FROM categories c 
      JOIN master_categories mc ON c.master_category_id = mc.master_category_id 
      WHERE mc.master_category_id IN (2, 3, 4) 
      ORDER BY mc.name, c.name
    `);
    
    console.log('\n📋 Updated Categories:');
    result.rows.forEach(r => console.log(`  ${r.master} -> ${r.category}`));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
