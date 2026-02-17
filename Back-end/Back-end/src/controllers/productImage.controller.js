const pool = require('../config/database');

// Add product image
exports.addProductImage = async (req, res) => {
  try {
    const { variant_id, image_url, is_primary } = req.body;

    if (is_primary) {
      await pool.query(
        'UPDATE product_images SET is_primary = false WHERE variant_id = $1',
        [variant_id]
      );
    }

    const result = await pool.query(
      'INSERT INTO product_images (variant_id, image_url, is_primary) VALUES ($1, $2, $3) RETURNING *',
      [variant_id, image_url, is_primary || false]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Add image error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get variant images
exports.getVariantImages = async (req, res) => {
  try {
    const { variantId } = req.params;

    const result = await pool.query(
      'SELECT * FROM product_images WHERE variant_id = $1 ORDER BY is_primary DESC, created_at ASC',
      [variantId]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get images error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete product image
exports.deleteProductImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const result = await pool.query(
      'DELETE FROM product_images WHERE image_id = $1 RETURNING *',
      [imageId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Image not found' });
    }

    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
