const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'NovaWear_db',
  password: 'admin',
  port: 5432,
});

async function checkProductsTable() {
  try {
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'products'
      ORDER BY ordinal_position
    `);
    
    console.log('Products table columns:');
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });
    
    const hasImageUrl = result.rows.some(row => row.column_name === 'image_url');
    
    if (!hasImageUrl) {
      console.log('\n❌ image_url column NOT found in products table');
      console.log('Adding image_url column...');
      await pool.query('ALTER TABLE products ADD COLUMN image_url VARCHAR(255)');
      console.log('✅ image_url column added successfully');
    } else {
      console.log('\n✅ image_url column exists in products table');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkProductsTable();
