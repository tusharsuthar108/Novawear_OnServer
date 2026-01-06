const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins during development
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test database connection
try {
  require('./src/config/database');
} catch (error) {
  console.error('❌ Database module error:', error.message);
}

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'NovaWear Backend API is running!', timestamp: new Date().toISOString() });
});

// Test route
app.get('/test', (req, res) => {
  res.json({ status: 'OK', message: 'Server is working!' });
});

// Direct POST route
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    if (req.originalUrl.includes('/master-categories')) {
      uploadPath = 'uploads/categories/master';
    } else if (req.originalUrl.includes('/categories')) {
      uploadPath = 'uploads/categories';
    } else if (req.originalUrl.includes('/subcategories')) {
      uploadPath = 'uploads/subcategories';
    } else if (req.originalUrl.includes('/product-types')) {
      uploadPath = 'uploads/product-types';
    } else {
      uploadPath = 'uploads/misc';
    }
    
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

// GET route for master categories with proper response format
app.get('/api/master-categories', async (req, res) => {
  try {
    const pool = require('./src/config/database');
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
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST route for master categories
app.post('/api/master-categories', upload.single('image'), async (req, res) => {
  try {
    console.log('POST route hit:', req.body);
    const pool = require('./src/config/database');
    const { name, slug, is_active } = req.body;
    const image_url = req.file ? `/uploads/categories/master/${req.file.filename}` : null;
    
    const result = await pool.query(
      'INSERT INTO master_categories (name, slug, image_url, is_active) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, slug, image_url, is_active === 'true']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('POST error:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE route for master categories
app.delete('/api/master-categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = require('./src/config/database');
    const result = await pool.query(
      'DELETE FROM master_categories WHERE master_category_id = $1',
      [id]
    );
    res.json({ success: true, message: 'Master category deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Import and use category routes
try {
  const categoryRoutes = require('./src/routes/category.routes');
  app.use('/api/categories', categoryRoutes);
  console.log('✅ Category routes loaded');
} catch (error) {
  console.error('❌ Failed to load category routes:', error.message);
  
  // Add category routes directly as fallback
  app.get('/api/categories', async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const result = await pool.query(`
        SELECT 
          c.*,
          m.name AS master_category_name
        FROM categories c
        LEFT JOIN master_categories m 
          ON m.master_category_id = c.master_category_id
        ORDER BY c.created_at DESC
      `);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });
  
  app.post('/api/categories', upload.single('image'), async (req, res) => {
    const { master_category_id, name, slug, is_active } = req.body;
    let icon_url = null;
    if (req.file) {
      icon_url = `/uploads/categories/${req.file.filename}`;
    }
    
    try {
      const pool = require('./src/config/database');
      const result = await pool.query(
        'INSERT INTO categories (master_category_id, name, slug, icon_url, is_active) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [master_category_id, name, slug, icon_url, is_active ?? true]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });
  
  console.log('✅ Category routes added directly');
}

// Import and use subcategory routes
try {
  const subCategoryRoutes = require('./src/routes/subCategory.routes');
  app.use('/api/subcategories', subCategoryRoutes);
  console.log('✅ SubCategory routes loaded');
} catch (error) {
  console.error('❌ Failed to load subcategory routes:', error.message);
  
  // Add subcategory routes directly as fallback
  app.get('/api/subcategories', async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const result = await pool.query(`
        SELECT 
          sc.sub_category_id,
          sc.category_id,
          sc.name,
          sc.slug,
          sc.image_url,
          sc.is_active,
          sc.created_at,
          c.name as category_name,
          mc.name as master_category_name
        FROM sub_categories sc
        LEFT JOIN categories c ON sc.category_id = c.category_id
        LEFT JOIN master_categories mc ON c.master_category_id = mc.master_category_id
        ORDER BY sc.created_at DESC
      `);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      console.error('Error fetching subcategories:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });
  
  app.post('/api/subcategories', upload.single('image'), async (req, res) => {
    const { category_id, name, slug, is_active } = req.body;
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/subcategories/${req.file.filename}`;
    }
    
    try {
      const pool = require('./src/config/database');
      const result = await pool.query(
        'INSERT INTO sub_categories (category_id, name, slug, image_url, is_active) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [category_id, name, slug, image_url, is_active ?? true]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });
  
  app.delete('/api/subcategories/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const pool = require('./src/config/database');
      const result = await pool.query(
        'DELETE FROM sub_categories WHERE sub_category_id = $1',
        [id]
      );
      res.json({ success: true, message: 'Subcategory deleted successfully' });
    } catch (error) {
      console.error('DELETE error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  console.log('✅ SubCategory routes added directly');
}

// Add product type routes directly
try {
  app.get('/api/product-types', async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const result = await pool.query(`
        SELECT 
          pt.*,
          sc.name AS sub_category_name,
          c.name AS category_name,
          mc.name AS master_category_name
        FROM product_types pt
        LEFT JOIN sub_categories sc ON sc.sub_category_id = pt.sub_category_id
        LEFT JOIN categories c ON c.category_id = sc.category_id
        LEFT JOIN master_categories mc ON mc.master_category_id = c.master_category_id
        ORDER BY pt.created_at DESC
      `);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      console.error('Error fetching product types:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });
  
  app.post('/api/product-types', upload.single('image'), async (req, res) => {
    console.log('=== PRODUCT TYPE CREATE DEBUG ===');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    
    const { sub_category_id, type_name, slug, is_active } = req.body;
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/product-types/${req.file.filename}`;
    }
    
    try {
      const pool = require('./src/config/database');
      const result = await pool.query(
        'INSERT INTO product_types (sub_category_id, type_name, slug, image_url, is_active) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [sub_category_id, type_name, slug, image_url, is_active === 'true' || is_active === true]
      );
      console.log('Product type created successfully:', result.rows[0]);
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      console.error('Database error creating product type:', err.message);
      res.status(400).json({ success: false, error: err.message });
    }
  });
  
  app.delete('/api/product-types/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const pool = require('./src/config/database');
      await pool.query('DELETE FROM product_types WHERE type_id = $1', [id]);
      res.json({ success: true, message: 'Product type deleted successfully' });
    } catch (error) {
      console.error('DELETE error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  console.log('✅ Product Type routes added directly');
} catch (error) {
  console.error('❌ Failed to add product type routes:', error.message);
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Test the API at: http://localhost:${PORT}/test`);
  console.log(`📂 Master Categories API: http://localhost:${PORT}/api/master-categories`);
  console.log(`📂 Categories API: http://localhost:${PORT}/api/categories`);
  console.log(`📂 SubCategories API: http://localhost:${PORT}/api/subcategories`);
  console.log(`📂 Product Types API: http://localhost:${PORT}/api/product-types`);
});