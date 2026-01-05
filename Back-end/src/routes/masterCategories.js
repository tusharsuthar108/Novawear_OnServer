const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const pool = require('../config/database');

// Ensure upload directories exist
const uploadDirs = [
  'uploads/categories/master',
  'uploads/categories/sub', 
  'uploads/products',
  'uploads/brands',
  'uploads/icons'
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/categories/master/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// GET all master categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM master_categories ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching master categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create new master category with file upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('📝 Received data:', req.body);
    console.log('📁 Received file:', req.file);
    
    const { name, slug, description, icon_url, is_active } = req.body;
    const image_url = req.file ? `/uploads/categories/master/${req.file.filename}` : null;
    
    console.log('💾 Inserting into database:', { name, slug, description, image_url, icon_url, is_active });
    
    const result = await pool.query(
      'INSERT INTO master_categories (name, slug, description, image_url, icon_url, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, slug, description, image_url, icon_url, is_active === 'true']
    );
    
    console.log('✅ Category created:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error creating master category:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// PUT update master category
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, icon_url, is_active } = req.body;
    let image_url = req.body.image_url;
    
    if (req.file) {
      image_url = `/uploads/categories/master/${req.file.filename}`;
    }
    
    const result = await pool.query(
      'UPDATE master_categories SET name = $1, slug = $2, description = $3, image_url = $4, icon_url = $5, is_active = $6 WHERE master_category_id = $7 RETURNING *',
      [name, slug, description, image_url, icon_url, is_active === 'true', id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Master category not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating master category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE master category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM master_categories WHERE master_category_id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Master category not found' });
    }
    
    res.json({ message: 'Master category deleted successfully' });
  } catch (error) {
    console.error('Error deleting master category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;