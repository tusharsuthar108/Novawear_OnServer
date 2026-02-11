const pool = require('../config/database');

// Create order
exports.createOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { user_id, items, shipping_address, payment_method, total_amount } = req.body;

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, payment_method, status) 
       VALUES ($1, $2, $3, 'Pending') RETURNING order_id`,
      [user_id, total_amount, payment_method]
    );
    const order_id = orderResult.rows[0].order_id;

    // Insert order items
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, variant_id, quantity, price) 
         VALUES ($1, $2, $3, $4)`,
        [order_id, item.variant_id, item.quantity, item.price]
      );
    }

    // Insert shipping address
    await client.query(
      `INSERT INTO order_addresses (order_id, address_line1, city, state, pincode, country) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [order_id, shipping_address.address_line1, shipping_address.city, 
       shipping_address.state, shipping_address.pincode, shipping_address.country]
    );

    await client.query('COMMIT');
    res.json({ success: true, order_id });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create order error:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(`
      SELECT 
        o.order_id,
        o.total_amount,
        o.status,
        o.payment_method,
        o.tracking_number,
        o.created_at,
        oa.address_line1,
        oa.city,
        oa.state,
        oa.pincode,
        oa.country
      FROM orders o
      LEFT JOIN order_addresses oa ON o.order_id = oa.order_id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
    `, [userId]);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get order details
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const orderResult = await pool.query(`
      SELECT 
        o.*,
        u.name as customer_name,
        u.email as customer_email,
        u.phone as customer_phone,
        oa.address_line1,
        oa.city,
        oa.state,
        oa.pincode,
        oa.country
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      LEFT JOIN order_addresses oa ON o.order_id = oa.order_id
      WHERE o.order_id = $1
    `, [orderId]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const itemsResult = await pool.query(`
      SELECT 
        oi.*,
        p.name as product_name,
        p.image_url,
        s.size_name,
        c.color_name
      FROM order_items oi
      JOIN product_variants pv ON oi.variant_id = pv.variant_id
      JOIN products p ON pv.product_id = p.product_id
      LEFT JOIN sizes s ON pv.size_id = s.size_id
      LEFT JOIN colors c ON pv.color_id = c.color_id
      WHERE oi.order_id = $1
    `, [orderId]);

    res.json({ 
      success: true, 
      data: { 
        ...orderResult.rows[0], 
        items: itemsResult.rows 
      } 
    });
  } catch (error) {
    console.error('Get order details error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, tracking_number } = req.body;

    const result = await pool.query(
      `UPDATE orders 
       SET status = $1, tracking_number = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE order_id = $3 RETURNING *`,
      [status, tracking_number, orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Track order
exports.trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const result = await pool.query(`
      SELECT 
        order_id,
        status,
        tracking_number,
        created_at,
        updated_at
      FROM orders
      WHERE order_id = $1
    `, [orderId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.order_id,
        o.user_id,
        o.total_amount,
        o.status,
        o.payment_method,
        o.tracking_number,
        o.created_at,
        u.full_name as customer_name,
        u.email as customer_email,
        u.phone as customer_phone,
        oa.address_line1,
        oa.city,
        oa.state,
        oa.pincode,
        oa.country,
        COUNT(oi.order_item_id) as item_count
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      LEFT JOIN order_addresses oa ON o.order_id = oa.order_id
      LEFT JOIN order_items oi ON o.order_id = oi.order_id
      GROUP BY o.order_id, u.full_name, u.email, u.phone, oa.address_line1, oa.city, oa.state, oa.pincode, oa.country
      ORDER BY o.created_at DESC
    `);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
