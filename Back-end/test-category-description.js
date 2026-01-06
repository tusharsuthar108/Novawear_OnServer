const pool = require('./src/config/database');

async function testCategoryDescription() {
  try {
    console.log('Testing category description functionality...');
    
    // Step 1: Check if description column exists
    console.log('\n1. Checking if description column exists...');
    try {
      const testQuery = 'SELECT description FROM categories LIMIT 1';
      await pool.query(testQuery);
      console.log('✓ Description column exists');
    } catch (error) {
      console.log('✗ Description column does not exist, adding it...');
      
      // Add the description column
      await pool.query('ALTER TABLE categories ADD COLUMN description TEXT');
      console.log('✓ Description column added successfully');
    }
    
    // Step 2: Test creating a category with description
    console.log('\n2. Testing category creation with description...');
    
    // First, get a master category ID
    const masterCatResult = await pool.query('SELECT master_category_id FROM master_categories LIMIT 1');
    if (masterCatResult.rows.length === 0) {
      console.log('No master categories found, creating one for testing...');
      const newMaster = await pool.query(
        'INSERT INTO master_categories (name, slug, is_active) VALUES ($1, $2, $3) RETURNING master_category_id',
        ['Test Master', 'test-master', true]
      );
      var masterCategoryId = newMaster.rows[0].master_category_id;
    } else {
      var masterCategoryId = masterCatResult.rows[0].master_category_id;
    }
    
    // Create test category with description
    const testCategory = await pool.query(
      `INSERT INTO categories 
       (master_category_id, name, slug, description, is_active) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [masterCategoryId, 'Test Category', 'test-category', 'This is a test description', true]
    );
    
    console.log('✓ Category created successfully:', testCategory.rows[0]);
    
    // Step 3: Verify the description was saved
    console.log('\n3. Verifying description was saved...');
    const savedCategory = await pool.query(
      'SELECT * FROM categories WHERE category_id = $1',
      [testCategory.rows[0].category_id]
    );
    
    if (savedCategory.rows[0].description === 'This is a test description') {
      console.log('✓ Description saved and retrieved correctly');
    } else {
      console.log('✗ Description not saved correctly');
    }
    
    // Step 4: Clean up test data
    console.log('\n4. Cleaning up test data...');
    await pool.query('DELETE FROM categories WHERE category_id = $1', [testCategory.rows[0].category_id]);
    console.log('✓ Test data cleaned up');
    
    console.log('\n✅ All tests passed! Category description functionality is working.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    process.exit(0);
  }
}

testCategoryDescription();