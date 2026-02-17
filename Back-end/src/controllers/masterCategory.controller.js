const pool = require("../config/database");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/categories/master';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.getMasterCategories = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        master_category_id,
        name,
        slug,
        image_url,
        icon_url,
        is_active,
        created_at
      FROM master_categories
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createMasterCategory = async (req, res) => {
  try {
    console.log('POST request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    const { name, slug, is_active } = req.body;
    const image_url = req.file ? `/uploads/categories/master/${req.file.filename}` : null;
    
    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO master_categories (name, slug, image_url, is_active) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, slug, image_url, is_active === 'true']
    );

    console.log('Database result:', result.rows[0]);
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */
exports.deleteMasterCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM master_categories WHERE master_category_id=$1",
      [id]
    );
    res.json({ success: true, message: "Master category deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateMasterCategory = async (req, res) => {
  const { id } = req.params;
  const { name, slug, icon_url, is_active } = req.body;
  
  try {
    let image_url = req.body.image_url;
    if (req.file) {
      image_url = `/uploads/categories/master/${req.file.filename}`;
    }
    
    const result = await pool.query(
      `UPDATE master_categories 
       SET name = $1, slug = $2, image_url = COALESCE($3, image_url), 
           icon_url = $4, is_active = $5 
       WHERE master_category_id = $6 
       RETURNING *`,
      [name, slug, image_url, icon_url, is_active === 'true' || is_active === true, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.upload = upload;