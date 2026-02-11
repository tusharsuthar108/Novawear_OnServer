const pool = require('../config/database');

// Create review
exports.createReview = async (req, res) => {
  try {
    const { user_id, product_id, rating, comment } = req.body;

    const result = await pool.query(
      'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, product_id, rating, comment]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get product reviews
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await pool.query(`
      SELECT 
        r.review_id,
        r.rating,
        r.comment,
        r.created_at,
        u.name as user_name,
        u.email as user_email
      FROM reviews r
      JOIN users u ON r.user_id = u.user_id
      WHERE r.product_id = $1
      ORDER BY r.created_at DESC
    `, [productId]);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const result = await pool.query(
      'UPDATE reviews SET rating = $1, comment = $2, updated_at = CURRENT_TIMESTAMP WHERE review_id = $3 RETURNING *',
      [rating, comment, reviewId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const result = await pool.query(
      'DELETE FROM reviews WHERE review_id = $1 RETURNING *',
      [reviewId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
