require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'NovaWear_db',
  password: process.env.DB_PASSWORD || 'admin',
  port: process.env.DB_PORT || 5432,
});

async function fixDatabase() {
  try {
    console.log('🔍 Checking existing table structure...');
    
    // Check if table exists and get its structure
    const tableInfo = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'master_categories'
    `);
    
    console.log('📋 Current columns:', tableInfo.rows);
    
    // Drop and recreate table with correct structure
    await pool.query('DROP TABLE IF EXISTS master_categories CASCADE');
    
    await pool.query(`
      CREATE TABLE master_categories (
        master_category_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        icon_url VARCHAR(500),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert sample data
    await pool.query(`
      INSERT INTO master_categories (name, slug, description, is_active) VALUES 
      ('Clothing', 'clothing', 'All clothing items', true),
      ('Accessories', 'accessories', 'Fashion accessories', true),
      ('Footwear', 'footwear', 'Shoes and sandals', true)
    `);
    
    console.log('✅ Table recreated successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixDatabase();