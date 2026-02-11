const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'NovaWear_db',
  password: 'admin',
  port: 5432,
});

async function addPriceColumns() {
  try {
    await pool.query(`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS price NUMERIC(10,2),
      ADD COLUMN IF NOT EXISTS discount_price NUMERIC(10,2)
    `);
    
    console.log('✓ Price columns added successfully to products table');
    
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'products' 
      ORDER BY ordinal_position
    `);
    
    console.log('\nUpdated products table columns:');
    result.rows.forEach(row => {
      console.log(`  ${row.column_name}: ${row.data_type}`);
    });
    
  } catch (error) {
    console.error('Error adding price columns:', error);
  } finally {
    await pool.end();
  }
}

addPriceColumns();
