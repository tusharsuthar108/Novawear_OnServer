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

// Test brands table
app.get('/test-brands', async (req, res) => {
  try {
    const pool = require('./src/config/database');
    
    // Check if brands table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'brands'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      return res.json({ 
        status: 'ERROR', 
        message: 'Brands table does not exist',
        solution: 'Run the database schema to create the brands table'
      });
    }
    
    // Try to fetch brands
    const result = await pool.query('SELECT COUNT(*) as total FROM brands');
    res.json({ 
      status: 'OK', 
      message: 'Brands table exists!', 
      total_brands: result.rows[0].total
    });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message });
  }
});

// Products API - Direct route
app.get('/api/products', async (req, res) => {
  try {
    const pool = require('./src/config/database');
    const result = await pool.query(`
      SELECT p.*, b.brand_name 
      FROM products p 
      LEFT JOIN brands b ON p.brand_id = b.brand_id 
      ORDER BY p.name
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Products API error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
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

// Import and use pricing routes
try {
  const pricingRoutes = require('./src/routes/pricing.routes');
  app.use('/api/pricing', pricingRoutes);
  console.log('✅ Pricing routes loaded');
} catch (error) {
  console.error('❌ Failed to load pricing routes:', error.message);
  
  // Add pricing routes directly as fallback
  const pool = require('./src/config/database');
  
  // Plans routes
  app.get('/api/pricing/plans', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM pricing_plans ORDER BY created_at DESC');
      res.json({ success: true, data: result.rows });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.put('/api/pricing/plans/:id', async (req, res) => {
    try {
      const { plan_name, description, discount_type, discount_value, is_active } = req.body;
      const result = await pool.query(
        'UPDATE pricing_plans SET plan_name = $1, description = $2, discount_type = $3, discount_value = $4, is_active = $5 WHERE plan_id = $6 RETURNING *',
        [plan_name, description, discount_type, parseFloat(discount_value), is_active ?? true, req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Plan not found' });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  
  console.log('✅ Pricing routes added directly');
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
        ORDER BY pt.type_id DESC
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
      
      // Check if slug already exists and generate unique one if needed
      let finalSlug = slug;
      let counter = 1;
      
      while (true) {
        const existingSlug = await pool.query(
          'SELECT slug FROM product_types WHERE slug = $1',
          [finalSlug]
        );
        
        if (existingSlug.rows.length === 0) {
          break; // Slug is unique
        }
        
        finalSlug = `${slug}-${counter}`;
        counter++;
      }
      
      const result = await pool.query(
        'INSERT INTO product_types (sub_category_id, type_name, slug, image_url, is_active) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [sub_category_id, type_name, finalSlug, image_url, is_active === 'true' || is_active === true]
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

// Import and use Brand routes
try {
  const brandRoutes = require('./src/routes/brand.routes');
  app.use('/api/brands', brandRoutes);
  console.log('✅ Brand routes loaded');
} catch (error) {
  console.error('❌ Failed to load brand routes:', error.message);
  
  // Add brand routes directly as fallback
  const fs = require('fs');
  const brandsDir = path.join(__dirname, 'uploads/brands');
  if (!fs.existsSync(brandsDir)) {
    fs.mkdirSync(brandsDir, { recursive: true });
  }

  const brandStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/brands/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'brand-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const brandUpload = multer({
    storage: brandStorage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 }
  });

  app.get('/api/brands', async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const result = await pool.query('SELECT * FROM brands ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching brands:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/brands', brandUpload.single('logo'), async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const { brand_name, description, is_active = true } = req.body;
      const logo_url = req.file ? `/uploads/brands/${req.file.filename}` : null;
      const brand_slug = brand_name.toLowerCase().replace(/\s+/g, '-');

      const result = await pool.query(
        'INSERT INTO brands (brand_name, brand_slug, description, logo_url, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [brand_name, brand_slug, description, logo_url, is_active === 'true' || is_active === true]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating brand:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/api/brands/:id', brandUpload.single('logo'), async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const { id } = req.params;
      const { brand_name, description, is_active } = req.body;
      
      let logo_url = req.body.logo_url;
      if (req.file) {
        logo_url = `/uploads/brands/${req.file.filename}`;
      }

      const brand_slug = brand_name ? brand_name.toLowerCase().replace(/\s+/g, '-') : undefined;

      const result = await pool.query(
        'UPDATE brands SET brand_name = COALESCE($1, brand_name), brand_slug = COALESCE($2, brand_slug), description = COALESCE($3, description), logo_url = COALESCE($4, logo_url), is_active = COALESCE($5, is_active) WHERE brand_id = $6 RETURNING *',
        [brand_name, brand_slug, description, logo_url, is_active === 'true' || is_active === true, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Brand not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating brand:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.delete('/api/brands/:id', async (req, res) => {
    const { id } = req.params;
    console.log('DELETE request for brand ID:', id);
    
    try {
      const pool = require('./src/config/database');
      
      // Check if brand is referenced by products and get product names
      const productCheck = await pool.query(
        'SELECT COUNT(*) as count, STRING_AGG(name, \', \') as product_names FROM products WHERE brand_id = $1', 
        [parseInt(id)]
      );
      
      if (productCheck.rows[0].count > 0) {
        const count = productCheck.rows[0].count;
        const productNames = productCheck.rows[0].product_names || 'Unknown products';
        return res.status(400).json({ 
          error: `Cannot delete brand. It is connected to ${count} product(s): ${productNames}. Please remove or reassign these products first.`
        });
      }
      
      // Delete the brand
      const result = await pool.query('DELETE FROM brands WHERE brand_id = $1', [parseInt(id)]);
      
      console.log('Delete result:', result.rowCount);
      
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Brand not found' });
      }
      
      res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
      console.error('Database error:', error.message);
      console.error('Full error:', error);
      res.status(500).json({ error: 'Database error: ' + error.message });
    }
  });

  console.log('✅ Brand routes added directly');
}

// Import and use Color routes
try {
  const colorRoutes = require('./src/routes/colorRoutes');
  app.use('/api/colors', colorRoutes);
  console.log('✅ Color routes loaded');
} catch (error) {
  console.error('❌ Failed to load color routes:', error.message);
  
  // Add color routes directly as fallback
  app.get('/api/colors', async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const result = await pool.query('SELECT * FROM colors ORDER BY color_name');
      res.json({ success: true, data: result.rows });
    } catch (err) {
      console.error('Error fetching colors:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/colors', async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const { color_name, hex_code } = req.body;
      const result = await pool.query(
        'INSERT INTO colors (color_name, hex_code) VALUES ($1, $2) RETURNING *',
        [color_name, hex_code]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      console.error('Error creating color:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/colors/:id', async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const { id } = req.params;
      await pool.query('DELETE FROM colors WHERE color_id = $1', [id]);
      res.json({ success: true, message: 'Color deleted successfully' });
    } catch (err) {
      console.error('Error deleting color:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  console.log('✅ Color routes added directly');
}



// Import and use Badge routes
try {
  const badgeRoutes = require('./src/routes/badgeRoutes');
  app.use('/api/badges', badgeRoutes);
  console.log('✅ Badge routes loaded');
} catch (error) {
  console.error('❌ Failed to load badge routes:', error.message);
}

// Import and use Size routes
try {
  const sizeRoutes = require('./src/routes/sizeRoutes');
  app.use('/api/sizes', sizeRoutes);
  console.log('✅ Size routes loaded');
} catch (error) {
  console.error('❌ Failed to load size routes:', error.message);
}

// Import and use Fabric routes
try {
  const fabricRoutes = require('./src/routes/fabricRoutes');
  app.use('/api/fabrics', fabricRoutes);
  console.log('✅ Fabric routes loaded');
} catch (error) {
  console.error('❌ Failed to load fabric routes:', error.message);
}

// Import and use Pattern routes
try {
  const patternRoutes = require('./src/routes/patternRoutes');
  app.use('/api/patterns', patternRoutes);
  console.log('✅ Pattern routes loaded');
} catch (error) {
  console.error('❌ Failed to load pattern routes:', error.message);
}

<<<<<<< HEAD
// Import and use shipment routes
try {
  const shipmentRoutes = require('./src/routes/shipment.routes');
  app.use('/api/shipments', shipmentRoutes);
  console.log('✅ Shipment routes loaded');
} catch (error) {
  console.error('❌ Failed to load shipment routes:', error.message);
=======
// Import and use User routes
try {
  const userRoutes = require('./src/routes/user.routes');
  app.use('/api/users', userRoutes);
  console.log('✅ User routes loaded');
} catch (error) {
  console.error('❌ Failed to load user routes:', error.message);
>>>>>>> d91227e63da5391881177ba21d8bebdf26beeb31
}

// Register Product routes
try {
  const productRoutes = require('./src/routes/product.routes');
  app.use('/api/products', productRoutes);
  console.log('✅ Product routes loaded');
} catch (error) {
  console.error('❌ Failed to load product routes:', error.message);
  
  app.get('/api/products/:id/variants', async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const { id } = req.params;
      const result = await pool.query(`
        SELECT 
          pv.*,
          s.size_name,
          c.color_name,
          f.fabric_name,
          p.pattern_name,
          i.stock_quantity
        FROM product_variants pv
        LEFT JOIN sizes s ON pv.size_id = s.size_id
        LEFT JOIN colors c ON pv.color_id = c.color_id
        LEFT JOIN fabrics f ON pv.fabric_id = f.fabric_id
        LEFT JOIN patterns p ON pv.pattern_id = p.pattern_id
        LEFT JOIN inventory i ON pv.variant_id = i.variant_id
        WHERE pv.product_id = $1
        ORDER BY pv.variant_id
      `, [id]);
      res.json({ success: true, data: result.rows });
    } catch (error) {
      console.error('Error fetching product variants:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.delete('/api/products/:id', async (req, res) => {
    try {
      const pool = require('./src/config/database');
      const { id } = req.params;
      await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  console.log('✅ Product routes added directly');
}

// Import and use Product Badge routes
try {
  const productBadgeRoutes = require('./src/routes/productBadgeRoutes');
  app.use('/api/product-badges', productBadgeRoutes);
  console.log('✅ Product Badge routes loaded');
} catch (error) {
  console.error('❌ Failed to load product badge routes:', error.message);
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Test the API at: http://localhost:${PORT}/test`);
  console.log(`📂 Master Categories API: http://localhost:${PORT}/api/master-categories`);
  console.log(`📂 Categories API: http://localhost:${PORT}/api/categories`);
  console.log(`📂 SubCategories API: http://localhost:${PORT}/api/subcategories`);
  console.log(`📂 Product Types API: http://localhost:${PORT}/api/product-types`);
  console.log(`💰 Pricing API: http://localhost:${PORT}/api/pricing`);
  console.log(`🚚 Shipments API: http://localhost:${PORT}/api/shipments`);
});