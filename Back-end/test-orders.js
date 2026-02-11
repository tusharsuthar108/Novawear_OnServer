const axios = require('axios');

async function testOrderAPI() {
  console.log('Testing Order API...\n');

  try {
    // Test 1: Get all orders
    console.log('1. Testing GET /api/orders/all');
    const response = await axios.get('http://localhost:3000/api/orders/all');
    console.log('✅ Success:', response.data);
    console.log('Orders count:', response.data.data?.length || 0);
  } catch (error) {
    console.log('❌ Error:', error.message);
    if (error.response) {
      console.log('Response:', error.response.data);
    }
  }

  console.log('\n---\n');

  try {
    // Test 2: Check if orders table exists
    console.log('2. Checking database connection...');
    const pool = require('./src/config/database');
    const result = await pool.query('SELECT COUNT(*) FROM orders');
    console.log('✅ Orders in database:', result.rows[0].count);
  } catch (error) {
    console.log('❌ Database error:', error.message);
  }
}

testOrderAPI();
