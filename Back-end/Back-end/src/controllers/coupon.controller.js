const pool = require('../config/database');

// Validate coupon
exports.validateCoupon = async (req, res) => {
  try {
    const { code, order_amount } = req.body;

    const result = await pool.query(
      `SELECT * FROM coupons 
       WHERE code = $1 AND is_active = true 
       AND valid_from <= CURRENT_TIMESTAMP 
       AND valid_until >= CURRENT_TIMESTAMP`,
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Invalid or expired coupon' });
    }

    const coupon = result.rows[0];

    if (order_amount < coupon.min_order_amount) {
      return res.json({ 
        success: false, 
        error: `Minimum order amount is ${coupon.min_order_amount}` 
      });
    }

    let discount = 0;
    if (coupon.discount_type === 'percentage') {
      discount = (order_amount * coupon.discount_value) / 100;
      if (coupon.max_discount && discount > coupon.max_discount) {
        discount = coupon.max_discount;
      }
    } else {
      discount = coupon.discount_value;
    }

    res.json({ success: true, coupon, discount });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all coupons (admin)
exports.getAllCoupons = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM coupons ORDER BY created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create coupon (admin)
exports.createCoupon = async (req, res) => {
  try {
    const { code, discount_type, discount_value, min_order_amount, max_discount, valid_from, valid_until } = req.body;

    const result = await pool.query(
      `INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, max_discount, valid_from, valid_until) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [code, discount_type, discount_value, min_order_amount, max_discount, valid_from, valid_until]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Create coupon error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
