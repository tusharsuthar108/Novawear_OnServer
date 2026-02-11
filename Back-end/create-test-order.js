const pool = require('./src/config/database');

async function setupTestOrder() {
  console.log('Setting up test order...\n');

  try {
    // Check orders table structure
    console.log('1. Checking orders table structure...');
    const structure = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'orders'
    `);
    console.log('Orders table columns:');
    structure.rows.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type}`);
    });
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n---\n');

  try {
    // Check if we have products and variants
    console.log('2. Checking products...');
    const products = await pool.query('SELECT product_id FROM products LIMIT 1');
    console.log('Products found:', products.rows.length);

    if (products.rows.length > 0) {
      const variants = await pool.query('SELECT variant_id FROM product_variants WHERE product_id = $1 LIMIT 1', [products.rows[0].product_id]);
      console.log('Variants found:', variants.rows.length);

      if (variants.rows.length > 0) {
        console.log('\n3. Creating test order...');
        
        // Create order
        const orderResult = await pool.query(`
          INSERT INTO orders (user_id, total_amount, payment_method, status, payment_status)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING order_id
        `, [1, 2499, 'Credit Card', 'Pending', 'Paid']);
        
        const order_id = orderResult.rows[0].order_id;
        console.log('✅ Order created with ID:', order_id);

        // Create order item
        await pool.query(`
          INSERT INTO order_items (order_id, variant_id, quantity, price)
          VALUES ($1, $2, $3, $4)
        `, [order_id, variants.rows[0].variant_id, 1, 2499]);
        console.log('✅ Order item created');

        // Create order address
        await pool.query(`
          INSERT INTO order_addresses (order_id, address_line1, city, state, pincode, country)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [order_id, '123 Test Street', 'Mumbai', 'Maharashtra', '400001', 'India']);
        console.log('✅ Order address created');

        console.log('\n✅ Test order created successfully!');
      }
    }
  } catch (error) {
    console.log('❌ Error creating order:', error.message);
  }

  process.exit(0);
}

setupTestOrder();
