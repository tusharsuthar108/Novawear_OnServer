const pool = require('../config/database');

// Dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await pool.query('SELECT COUNT(*) as count FROM orders');
    const totalRevenue = await pool.query('SELECT SUM(total_amount) as revenue FROM orders WHERE status != $1', ['Cancelled']);
    const totalUsers = await pool.query('SELECT COUNT(*) as count FROM users');
    const totalProducts = await pool.query('SELECT COUNT(*) as count FROM products');
    
    const pendingOrders = await pool.query('SELECT COUNT(*) as count FROM orders WHERE status = $1', ['Pending']);
    const shippedOrders = await pool.query('SELECT COUNT(*) as count FROM orders WHERE status = $1', ['Shipped']);
    const deliveredOrders = await pool.query('SELECT COUNT(*) as count FROM orders WHERE status = $1', ['Delivered']);

    res.json({
      success: true,
      data: {
        totalOrders: parseInt(totalOrders.rows[0].count),
        totalRevenue: parseFloat(totalRevenue.rows[0].revenue || 0),
        totalUsers: parseInt(totalUsers.rows[0].count),
        totalProducts: parseInt(totalProducts.rows[0].count),
        pendingOrders: parseInt(pendingOrders.rows[0].count),
        shippedOrders: parseInt(shippedOrders.rows[0].count),
        deliveredOrders: parseInt(deliveredOrders.rows[0].count)
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Sales reports
exports.getSalesReport = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    let query = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as orders_count,
        SUM(total_amount) as revenue
      FROM orders
      WHERE status != 'Cancelled'
    `;

    const params = [];
    if (start_date) {
      params.push(start_date);
      query += ` AND created_at >= $${params.length}`;
    }
    if (end_date) {
      params.push(end_date);
      query += ` AND created_at <= $${params.length}`;
    }

    query += ' GROUP BY DATE(created_at) ORDER BY date DESC';

    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Sales report error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Revenue analytics
exports.getRevenueAnalytics = async (req, res) => {
  try {
    const monthlyRevenue = await pool.query(`
      SELECT 
        TO_CHAR(created_at, 'YYYY-MM') as month,
        SUM(total_amount) as revenue,
        COUNT(*) as orders
      FROM orders
      WHERE status != 'Cancelled'
      GROUP BY TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY month DESC
      LIMIT 12
    `);

    const revenueByStatus = await pool.query(`
      SELECT 
        status,
        COUNT(*) as count,
        SUM(total_amount) as revenue
      FROM orders
      GROUP BY status
    `);

    res.json({
      success: true,
      data: {
        monthlyRevenue: monthlyRevenue.rows,
        revenueByStatus: revenueByStatus.rows
      }
    });
  } catch (error) {
    console.error('Revenue analytics error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Popular products
exports.getPopularProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.product_id,
        p.name,
        p.image_url,
        b.brand_name,
        COUNT(oi.order_item_id) as order_count,
        SUM(oi.quantity) as total_sold,
        SUM(oi.price * oi.quantity) as revenue
      FROM order_items oi
      JOIN product_variants pv ON oi.variant_id = pv.variant_id
      JOIN products p ON pv.product_id = p.product_id
      LEFT JOIN brands b ON p.brand_id = b.brand_id
      GROUP BY p.product_id, p.name, p.image_url, b.brand_name
      ORDER BY total_sold DESC
      LIMIT 10
    `);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Popular products error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Low stock alerts
exports.getLowStockAlerts = async (req, res) => {
  try {
    const threshold = req.query.threshold || 10;

    const result = await pool.query(`
      SELECT 
        p.product_id,
        p.name as product_name,
        pv.variant_id,
        pv.variant_sku,
        s.size_name,
        c.color_name,
        i.stock_quantity
      FROM inventory i
      JOIN product_variants pv ON i.variant_id = pv.variant_id
      JOIN products p ON pv.product_id = p.product_id
      LEFT JOIN sizes s ON pv.size_id = s.size_id
      LEFT JOIN colors c ON pv.color_id = c.color_id
      WHERE i.stock_quantity <= $1
      ORDER BY i.stock_quantity ASC
    `, [threshold]);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Low stock alerts error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
