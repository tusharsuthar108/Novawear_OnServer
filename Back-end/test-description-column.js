const pool = require('./src/config/database');

async function testDescriptionColumn() {
  try {
    console.log('Testing categories table structure...');
    
    // Check table structure
    const tableInfo = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'categories' 
      ORDER BY ordinal_position
    `);
    
    console.log('Categories table columns:');
    tableInfo.rows.forEach(col => {
      console.log(`- ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });
    
    // Check if description column exists
    const hasDescription = tableInfo.rows.some(col => col.column_name === 'description');
    
    if (!hasDescription) {
      console.log('\n❌ Description column is missing! Adding it now...');
      await pool.query('ALTER TABLE categories ADD COLUMN description TEXT');
      console.log('✅ Description column added successfully');
    } else {
      console.log('\n✅ Description column exists');
    }
    
    // Test insert with description
    console.log('\nTesting insert with description...');
    const testResult = await pool.query(`
      INSERT INTO categories (master_category_id, name, slug, description, is_active)
      VALUES (20, 'Test Category', 'test-category', 'Test description', true)
      RETURNING *
    `);
    
    console.log('Insert result:', testResult.rows[0]);
    
    // Clean up
    await pool.query('DELETE FROM categories WHERE name = $1', ['Test Category']);
    console.log('Test data cleaned up');
    
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    process.exit(0);
  }
}

testDescriptionColumn();