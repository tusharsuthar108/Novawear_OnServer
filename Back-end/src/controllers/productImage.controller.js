const pool = require('../config/database');

exports.addProductImage = async (req, res) => {
  try {
    const { variant_id } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const imageUrl = `/uploads/products/${req.file.filename}`;
    
    const result = await pool.query(
      'INSERT INTO product_images (variant_id, image_url, is_primary) VALUES ($1, $2, $3) RETURNING *',
      [variant_id, imageUrl, false]
    );
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Add image error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query('DELETE FROM product_images WHERE image_id = $1', [id]);
    
    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
