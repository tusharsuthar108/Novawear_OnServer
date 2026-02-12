const pool = require('../config/database');

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT ON (p.product_id)
        p.*, 
        b.brand_name,
        pv.price,
        pv.discount_price
      FROM products p 
      LEFT JOIN brands b ON p.brand_id = b.brand_id 
      LEFT JOIN product_variants pv ON p.product_id = pv.product_id
      WHERE p.is_active = true
      ORDER BY p.product_id, pv.price ASC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  let client;

  try {
    client = await pool.connect();
    await client.query('BEGIN');

    const { title, brand, sku, description, long_description, master, category, subCategory, type } = req.body;

    console.log('=== REQUEST DATA ===');
    console.log('brand:', brand, typeof brand);
    console.log('master:', master, typeof master);
    console.log('category:', category, typeof category);
    console.log('subCategory:', subCategory, typeof subCategory);
    console.log('type:', type, typeof type);

    // Convert string 'undefined' to null
    const brandId = brand && brand !== 'undefined' ? parseInt(brand) : null;
    const masterId = master && master !== 'undefined' ? parseInt(master) : null;
    const categoryId = category && category !== 'undefined' ? parseInt(category) : null;
    const subCategoryId = subCategory && subCategory !== 'undefined' ? parseInt(subCategory) : null;
    const typeId = type && type !== 'undefined' ? parseInt(type) : null;

    // Parse variants
    let variants;
    try {
      variants = typeof req.body.variants === 'string' ? JSON.parse(req.body.variants) : req.body.variants;
    } catch (e) {
      throw new Error('Invalid variants JSON');
    }

    // Map uploaded files to variants and prepare image paths
    // Multer puts files in req.files
    let fileIndex = 0;
    variants = variants.map((variant) => {
      if (variant.hasImage && req.files && req.files[fileIndex]) {
        variant.imageUrl = `/uploads/products/${req.files[fileIndex].filename}`; // Use relative path for serving
        fileIndex++;
      }
      return variant;
    });

    console.log('--- Creating Product ---');
    console.log('Title:', title);

    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    console.log('Generated slug:', slug);

    // 1. Insert into products table with category references
    const productQuery = `
      INSERT INTO products (brand_id, master_category_id, category_id, sub_category_id, type_id, badge_id, sku, slug, name, description, long_description, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING product_id
    `;

    const productResult = await client.query(productQuery, [
      brandId,
      masterId,
      categoryId,
      subCategoryId,
      typeId,
      null, // badge_id - can be set later via badge management
      sku,
      slug,
      title,
      description,
      long_description,
      true
    ]);

    const productId = productResult.rows[0].product_id;
    console.log('Created Product ID:', productId);

    // No need for product_type_mapping table as type_id is directly in products table

    // 2. Process Variants
    for (const variant of variants) {
      const { attributes, stock, salePrice, mrp } = variant;
      const colorId = attributes.Color && attributes.Color !== 'undefined' && attributes.Color !== '' ? parseInt(attributes.Color) : null;
      const sizeId = attributes.Size && attributes.Size !== 'undefined' && attributes.Size !== '' ? parseInt(attributes.Size) : null;
      const fabricId = attributes.Fabric && attributes.Fabric !== 'undefined' && attributes.Fabric !== '' ? parseInt(attributes.Fabric) : null;
      const patternId = attributes.Pattern && attributes.Pattern !== 'undefined' && attributes.Pattern !== '' ? parseInt(attributes.Pattern) : null;

      if (!colorId) throw new Error('Color is required for variant');
      if (!sizeId) throw new Error('Size is required for variant');

      // Generate variant SKU if not provided
      // Variant SKU is unique per product+size+color
      // We'll use master SKU + colorID + sizeID
      const variantSku = `${sku}-C${colorId}-S${sizeId}`.toUpperCase();

      // Insert into product_variants (Price is HERE now)
      // "price" column usually refers to the SELLING price. 
      // "discount_price" is optional.
      const variantQuery = `
        INSERT INTO product_variants (product_id, size_id, color_id, fabric_id, pattern_id, variant_sku, price, discount_price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING variant_id
      `;

      // Use mrp as 'price' (regular price) and salePrice as 'discount_price'
      const price = mrp || 0;
      const discountPrice = salePrice && salePrice < price ? salePrice : null;

      const variantResult = await client.query(variantQuery, [
        productId,
        sizeId,
        colorId,
        fabricId,
        patternId,
        variantSku,
        price,
        discountPrice
      ]);

      const variantId = variantResult.rows[0].variant_id;

      // 3. Insert into Inventory
      await client.query(
        'INSERT INTO inventory (variant_id, stock_quantity) VALUES ($1, $2)',
        [variantId, stock || 0]
      );

      // 4. Insert Images (LINKED TO VARIANT ID now)
      if (variant.imageUrl) {
        await client.query(
          'INSERT INTO product_images (variant_id, image_url, is_primary) VALUES ($1, $2, $3)',
          [variantId, variant.imageUrl, false]
        );
      }
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      productId: productId
    });

  } catch (error) {
    if (client) await client.query('ROLLBACK');
    console.error('=== CREATE PRODUCT ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Request body:', req.body);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    if (client) client.release();
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, description, price, discount_price, is_active } = req.body;
    
    let image_url = req.body.image_url;
    if (req.file) {
      image_url = `/uploads/products/${req.file.filename}`;
    }
    
    const result = await pool.query(
      'UPDATE products SET name = COALESCE($1, name), sku = COALESCE($2, sku), description = COALESCE($3, description), price = COALESCE($4, price), discount_price = COALESCE($5, discount_price), image_url = COALESCE($6, image_url), is_active = COALESCE($7, is_active) WHERE product_id = $8 RETURNING *',
      [name, sku, description, price || null, discount_price || null, image_url, is_active === 'true' || is_active === true, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};