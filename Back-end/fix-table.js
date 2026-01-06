const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'NovaWear_db',
  password: 'admin',
  port: 5432,
});

async function fixTable() {
  try {
    const client = await pool.connect();
    
    console.log('Adding missing columns...');
    
    // Add missing columns
    await client.query(`
      ALTER TABLE master_categories 
      ADD COLUMN IF NOT EXISTS description TEXT,
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `);
    
    console.log('✅ Columns added successfully!');
    
    // Verify columns
    const result = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'master_categories' 
      ORDER BY ordinal_position;
    `);
    
    console.log('📋 Updated table structure:');
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });
    
    client.release();
    pool.end();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    pool.end();
  }
}

fixTable();