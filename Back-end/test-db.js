const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'NovaWear_db',
  password: process.env.DB_PASSWORD || 'admin',
  port: process.env.DB_PORT || 5432,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully!');
    
    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database query successful:', result.rows[0]);
    
    // Check if master_categories table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'master_categories'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ master_categories table exists');
      
      // Check table structure
      const columns = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'master_categories'
      `);
      console.log('📋 Table columns:', columns.rows);
    } else {
      console.log('❌ master_categories table does not exist');
    }
    
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  } finally {
    pool.end();
  }
}

testConnection();