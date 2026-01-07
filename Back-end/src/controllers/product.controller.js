const pool = require('../config/database');

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, b.brand_name 
      FROM products p 
      LEFT JOIN brands b ON p.brand_id = b.brand_id 
      ORDER BY p.name
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

    // 1. Insert into products table with category references
    const productQuery = `
      INSERT INTO products (brand_id, master_category_id, category_id, sub_category_id, type_id, badge_id, sku, name, description, long_description, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING product_id
    `;

    const productResult = await client.query(productQuery, [
      brand,
      master || null,
      category || null, 
      subCategory || null,
      type || null,
      null, // badge_id - can be set later via badge management
      sku,
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
      const colorId = attributes.Color; // ID
      const sizeId = attributes.Size;   // ID
      const fabricId = attributes.Fabric || null;
      const patternId = attributes.Pattern || null;

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
    await client.query('ROLLBACK');
    console.error('Create Product Error:', error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  } finally {
    if (client) client.release();
  }
};