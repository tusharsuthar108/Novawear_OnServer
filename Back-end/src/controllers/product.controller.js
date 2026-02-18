const pool = require("../config/database");

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.product_id,
        p.name,
        p.description,
        
        p.sku,
        p.category_id,
        p.brand_id,
        p.is_active,
        b.brand_name,
        c.name as category_name,
        c.slug as category_slug,
        (
          SELECT pi.image_url FROM product_images pi 
          JOIN product_variants pv ON pi.variant_id = pv.variant_id 
          WHERE pv.product_id = p.product_id 
          ORDER BY pi.is_primary DESC, pi.image_id ASC 
          LIMIT 1
        ) as image_url,
        json_agg(
          json_build_object(
            'variant_id', pv.variant_id,
            'price', pv.price,
            'discount_price', pv.discount_price,
            'size_name', s.size_name,
            'color_name', col.color_name
          )
        ) FILTER (WHERE pv.variant_id IS NOT NULL) as variants
      FROM products p 
      LEFT JOIN brands b ON p.brand_id = b.brand_id
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN product_variants pv ON p.product_id = pv.product_id
      LEFT JOIN sizes s ON pv.size_id = s.size_id
      LEFT JOIN colors col ON pv.color_id = col.color_id
      WHERE p.is_active = true
      GROUP BY p.product_id, b.brand_name, c.name, c.slug
      ORDER BY p.created_at DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get product details
    const productResult = await pool.query(
      `
      SELECT p.*, b.brand_name 
      FROM products p 
      LEFT JOIN brands b ON p.brand_id = b.brand_id 
      WHERE p.product_id = $1
    `,
      [id],
    );

    if (productResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const product = productResult.rows[0];

    // Get all images for this product's variants
    const imagesResult = await pool.query(
      `
      SELECT DISTINCT pi.image_url
      FROM product_images pi
      JOIN product_variants pv ON pi.variant_id = pv.variant_id
      WHERE pv.product_id = $1
      ORDER BY pi.image_url
    `,
      [id],
    );

    product.images = imagesResult.rows.map((row) => row.image_url);

    // Get variants with details
    const variantsResult = await pool.query(
      `
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
    `,
      [id],
    );

    product.variants = variantsResult.rows;

    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  let client;

  try {
    client = await pool.connect();
    await client.query("BEGIN");
    console.log(req.body);
    console.log(res.body);
    const {
      title,
      brand,
      sku,
      description,
      long_description,
      master,
      category,
      subCategory,
      type,
    } = req.body;

    console.log("=== REQUEST DATA ===");
    console.log("brand:", brand, typeof brand);
    console.log("master:", master, typeof master);
    console.log("category:", category, typeof category);
    console.log("subCategory:", subCategory, typeof subCategory);
    console.log("type:", type, typeof type);

    // Convert string 'undefined' to null
    const brandId = brand && brand !== "undefined" ? parseInt(brand) : null;
    const masterId = master && master !== "undefined" ? parseInt(master) : null;
    const categoryId =
      category && category !== "undefined" ? parseInt(category) : null;
    const subCategoryId =
      subCategory && subCategory !== "undefined" ? parseInt(subCategory) : null;
    const typeId = type && type !== "undefined" ? parseInt(type) : null;

    // Parse variants
    let variants;
    try {
      variants =
        typeof req.body.variants === "string"
          ? JSON.parse(req.body.variants)
          : req.body.variants;
    } catch (e) {
      throw new Error("Invalid variants JSON");
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

    console.log("--- Creating Product ---");
    console.log("Title:", title);

    // Generate slug from title with timestamp to ensure uniqueness
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Check if slug exists and make it unique
    const existingSlug = await client.query(
      "SELECT slug FROM products WHERE slug = $1",
      [slug],
    );
    if (existingSlug.rows.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    console.log("Generated slug:", slug);

    // Get first variant's price and image
    const firstVariant = variants[0];
    const firstPrice = firstVariant.mrp || 0;
    const firstDiscountPrice = firstVariant.salePrice && firstVariant.salePrice < firstPrice ? firstVariant.salePrice : null;
    const firstImageUrl = firstVariant.imageUrl || null;

    // 1. Insert into products table with first variant price and image
    const productQuery = `
      INSERT INTO products (brand_id, master_category_id, category_id, sub_category_id, type_id, badge_id, sku, slug, name, description, long_description, price, discount_price, image_url, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING product_id
    `;

    const productResult = await client.query(productQuery, [
      brandId,
      masterId,
      categoryId,
      subCategoryId,
      typeId,
      null,
      sku,
      slug,
      title,
      description,
      long_description,
      firstPrice,
      firstDiscountPrice,
      firstImageUrl,
      true,
    ]);

    const productId = productResult.rows[0].product_id;
    console.log("Created Product ID:", productId);

    // No need for product_type_mapping table as type_id is directly in products table

    // 2. Process Variants
    for (const variant of variants) {
      const { attributes, stock, salePrice, mrp } = variant;
      const colorId =
        attributes.Color &&
        attributes.Color !== "undefined" &&
        attributes.Color !== ""
          ? parseInt(attributes.Color)
          : null;
      const sizeId =
        attributes.Size &&
        attributes.Size !== "undefined" &&
        attributes.Size !== ""
          ? parseInt(attributes.Size)
          : null;
      const fabricId =
        attributes.Fabric &&
        attributes.Fabric !== "undefined" &&
        attributes.Fabric !== ""
          ? parseInt(attributes.Fabric)
          : null;
      const patternId =
        attributes.Pattern &&
        attributes.Pattern !== "undefined" &&
        attributes.Pattern !== ""
          ? parseInt(attributes.Pattern)
          : null;

      if (!colorId) throw new Error("Color is required for variant");
      if (!sizeId) throw new Error("Size is required for variant");

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
        discountPrice,
      ]);

      const variantId = variantResult.rows[0].variant_id;

      // 3. Insert into Inventory
      await client.query(
        "INSERT INTO inventory (variant_id, stock_quantity) VALUES ($1, $2)",
        [variantId, stock || 0],
      );

      // 4. Insert Images (LINKED TO VARIANT ID now)
      if (variant.imageUrl) {
        await client.query(
          "INSERT INTO product_images (variant_id, image_url, is_primary) VALUES ($1, $2, $3)",
          [variantId, variant.imageUrl, false],
        );
      }
    }

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      productId: productId,
    });
  } catch (error) {
    if (client) await client.query("ROLLBACK");
    console.error("=== CREATE PRODUCT ERROR ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Request body:", req.body);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    if (client) client.release();
  }
};

exports.updateProduct = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');

    const { id } = req.params;
    const { name, sku, description, is_active, variants } = req.body;

    // Parse variants if it's a string
    let parsedVariants;
    if (variants) {
      parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
    }

    // Handle image upload if provided
    let imageUrl = req.body.image_url;
    if (req.file) {
      imageUrl = `/uploads/products/${req.file.filename}`;
    }

    // If variants are provided, update product table with first variant's price and image
    let price = req.body.price;
    let discount_price = req.body.discount_price;
    
    if (parsedVariants && parsedVariants.length > 0) {
      const firstVariant = parsedVariants[0];
      price = firstVariant.mrp || price;
      discount_price = firstVariant.salePrice && firstVariant.salePrice < price ? firstVariant.salePrice : null;
      if (firstVariant.imageUrl) {
        imageUrl = firstVariant.imageUrl;
      }
    }

    // Update products table
    const result = await client.query(
      'UPDATE products SET name = COALESCE($1, name), sku = COALESCE($2, sku), description = COALESCE($3, description), is_active = COALESCE($4, is_active), price = COALESCE($5, price), discount_price = COALESCE($6, discount_price), image_url = COALESCE($7, image_url) WHERE product_id = $8 RETURNING *',
      [name, sku, description, is_active === 'true' || is_active === true, price, discount_price, imageUrl, id]
    );

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Update variants if provided
    if (parsedVariants) {
      for (const variant of parsedVariants) {
        if (variant.variant_id) {
          // Update existing variant
          const variantPrice = variant.mrp || 0;
          const variantDiscountPrice = variant.salePrice && variant.salePrice < variantPrice ? variant.salePrice : null;
          
          await client.query(
            'UPDATE product_variants SET price = $1, discount_price = $2 WHERE variant_id = $3',
            [variantPrice, variantDiscountPrice, variant.variant_id]
          );

          // Update inventory
          if (variant.stock !== undefined) {
            await client.query(
              'UPDATE inventory SET stock_quantity = $1 WHERE variant_id = $2',
              [variant.stock, variant.variant_id]
            );
          }
        }
      }
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Product updated successfully',
    });
  } catch (error) {
    if (client) await client.query('ROLLBACK');
    console.error('Update product error:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (client) client.release();
  }
};
