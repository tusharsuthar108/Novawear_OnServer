const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'NovaWear_db',
  password: 'admin',
  port: 5432,
});

async function addImageColumn() {
  try {
    await pool.query('ALTER TABLE product_types ADD COLUMN IF NOT EXISTS image_url VARCHAR(255)');
    console.log('✅ Successfully added image_url column to product_types table');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding column:', error.message);
    process.exit(1);
  }
}

addImageColumn();
