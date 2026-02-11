const pool = require('../config/database');

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const existing = await pool.query(
      'SELECT * FROM wishlist WHERE user_id = $1 AND product_id = $2',
      [user_id, product_id]
    );

    if (existing.rows.length > 0) {
      return res.json({ success: true, message: 'Already in wishlist' });
    }

    const result = await pool.query(
      'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) RETURNING *',
      [user_id, product_id]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user wishlist
exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(`
      SELECT 
        w.wishlist_id,
        w.product_id,
        p.name as product_name,
        p.image_url,
        p.description,
        b.brand_name,
        MIN(pv.price) as price,
        MIN(pv.discount_price) as discount_price,
        w.created_at
      FROM wishlist w
      JOIN products p ON w.product_id = p.product_id
      LEFT JOIN brands b ON p.brand_id = b.brand_id
      LEFT JOIN product_variants pv ON p.product_id = pv.product_id
      WHERE w.user_id = $1
      GROUP BY w.wishlist_id, w.product_id, p.name, p.image_url, p.description, b.brand_name, w.created_at
      ORDER BY w.created_at DESC
    `, [userId]);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const { user_id } = req.body;

    const result = await pool.query(
      'DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [user_id, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Item not found in wishlist' });
    }

    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
