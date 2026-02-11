const pool = require('./src/config/database');

async function testDatabase() {
  console.log('Testing Database...\n');

  try {
    // Check orders table
    console.log('1. Checking orders table...');
    const orders = await pool.query('SELECT * FROM orders LIMIT 5');
    console.log('✅ Orders found:', orders.rows.length);
    console.log('Orders:', JSON.stringify(orders.rows, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n---\n');

  try {
    // Check users table
    console.log('2. Checking users table...');
    const users = await pool.query('SELECT user_id, full_name, email FROM users LIMIT 5');
    console.log('✅ Users found:', users.rows.length);
    console.log('Users:', JSON.stringify(users.rows, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n---\n');

  try {
    // Check order_addresses table
    console.log('3. Checking order_addresses table...');
    const addresses = await pool.query('SELECT * FROM order_addresses LIMIT 5');
    console.log('✅ Addresses found:', addresses.rows.length);
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  process.exit(0);
}

testDatabase();
