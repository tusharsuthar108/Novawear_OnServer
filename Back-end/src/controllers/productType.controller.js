const pool = require("../config/database");

/* ================= GET ALL ================= */
exports.getProductTypes = async (req, res) => {
  try {
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
};

/* ================= CREATE ================= */
exports.createProductType = async (req, res) => {
  console.log('=== PRODUCT TYPE CREATE DEBUG ===');
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);
  
  const {
    sub_category_id,
    type_name,
    slug,
    is_active,
  } = req.body;

  // Handle uploaded file
  let image_url = null;
  if (req.file) {
    image_url = `/uploads/product-types/${req.file.filename}`;
  }

  try {
    const result = await pool.query(
      `INSERT INTO product_types
       (sub_category_id, type_name, slug, image_url, is_active)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [
        sub_category_id,
        type_name,
        slug,
        image_url,
        is_active === 'true' || is_active === true,
      ]
    );

    console.log('Product type created successfully:', result.rows[0]);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Database error creating product type:', err.message);
    console.error('Full error:', err);
    res.status(400).json({ success: false, error: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateProductType = async (req, res) => {
  const { id } = req.params;
  const {
    sub_category_id,
    type_name,
    slug,
    is_active,
  } = req.body;

  // Handle uploaded file
  let image_url = req.body.image_url; // Keep existing if no new file
  if (req.file) {
    image_url = `/uploads/product-types/${req.file.filename}`;
  }

  try {
    const result = await pool.query(
      `
      UPDATE product_types SET
        sub_category_id=$1,
        type_name=$2,
        slug=$3,
        image_url=$4,
        is_active=$5
      WHERE type_id=$6
      RETURNING *
      `,
      [
        sub_category_id,
        type_name,
        slug,
        image_url,
        is_active,
        id,
      ]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteProductType = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM product_types WHERE type_id=$1",
      [id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};