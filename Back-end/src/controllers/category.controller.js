const pool = require("../config/database");

/* ================= GET ALL ================= */
exports.getCategories = async (req, res) => {
  try {
    // First test if description column exists
    try {
      const testQuery = 'SELECT description FROM categories LIMIT 1';
      const testResult = await pool.query(testQuery);
      console.log('Description column test passed for GET');
    } catch (error) {
      console.error('Description column does not exist in GET:', error.message);
    }

    const result = await pool.query(`
      SELECT 
        c.*,
        m.name AS master_category_name
      FROM categories c
      LEFT JOIN master_categories m 
        ON m.master_category_id = c.master_category_id
      ORDER BY c.created_at DESC
    `);

    console.log('Categories query result sample:', result.rows[0]);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ================= CREATE ================= */
exports.createCategory = async (req, res) => {
  console.log('=== CATEGORY CREATE DEBUG ===');
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);
  
  const {
    master_category_id,
    name,
    slug,
    description,
    is_active,
  } = req.body;

  console.log('Extracted fields:');
  console.log('- master_category_id:', master_category_id);
  console.log('- name:', name);
  console.log('- slug:', slug);
  console.log('- description:', description);
  console.log('- is_active:', is_active);

  // Handle uploaded file
  let icon_url = null;
  if (req.file) {
    icon_url = `/uploads/categories/${req.file.filename}`;
    console.log('- icon_url:', icon_url);
  }

  try {
    console.log('Executing SQL INSERT...');
    const result = await pool.query(
      `INSERT INTO categories
       (master_category_id, name, slug, description, icon_url, is_active)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [
        master_category_id,
        name,
        slug,
        description || null,
        icon_url,
        is_active ?? true,
      ]
    );

    console.log('Category created successfully:', result.rows[0]);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Database error creating category:', err.message);
    console.error('Full error:', err);
    res.status(400).json({ error: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const {
    master_category_id,
    name,
    slug,
    description,
    is_active,
  } = req.body;

  // Handle uploaded file
  let icon_url = req.body.icon_url; // Keep existing if no new file
  if (req.file) {
    icon_url = `/uploads/categories/${req.file.filename}`;
  }

  try {
    const result = await pool.query(
      `
      UPDATE categories SET
        master_category_id=$1,
        name=$2,
        slug=$3,
        description=$4,
        icon_url=$5,
        is_active=$6
      WHERE category_id=$7
      RETURNING *
      `,
      [
        master_category_id,
        name,
        slug,
        description,
        icon_url,
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
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const { cascade } = req.query;
  console.log('Delete request for category ID:', id, 'cascade:', cascade);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Check if category exists
    const categoryCheck = await client.query(
      'SELECT * FROM categories WHERE category_id = $1',
      [id]
    );
    
    if (categoryCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ 
        success: false, 
        error: "Category not found" 
      });
    }

    // Get all sub_category_ids for this category
    const subCategoryIds = await client.query(
      'SELECT sub_category_id FROM sub_categories WHERE category_id = $1',
      [id]
    );
    const subCategoryCount = subCategoryIds.rows.length;
    
    // Check for product_types
    let productTypeCount = 0;
    if (subCategoryCount > 0) {
      const productTypeCheck = await client.query(
        `SELECT COUNT(*) as count FROM product_types 
         WHERE sub_category_id = ANY($1)`,
        [subCategoryIds.rows.map(r => r.sub_category_id)]
      );
      productTypeCount = parseInt(productTypeCheck.rows[0].count);
    }
    
    // If cascade is enabled, delete in proper order
    if (cascade === 'true') {
      if (subCategoryCount > 0) {
        const subCatIds = subCategoryIds.rows.map(r => r.sub_category_id);
        
        // Delete product_types for these subcategories
        if (productTypeCount > 0) {
          await client.query(
            'DELETE FROM product_types WHERE sub_category_id = ANY($1)',
            [subCatIds]
          );
          console.log(`Deleted ${productTypeCount} product types`);
        }

        // Delete subcategories
        await client.query('DELETE FROM sub_categories WHERE category_id = $1', [id]);
        console.log(`Deleted ${subCategoryCount} subcategories`);
      }
    } else {
      // Prevent deletion if there are dependencies
      if (productTypeCount > 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ 
          success: false, 
          error: `Cannot delete. Category has ${productTypeCount} product type(s). Remove them first.` 
        });
      }

      if (subCategoryCount > 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ 
          success: false, 
          error: `Cannot delete. Category has ${subCategoryCount} subcategory(ies). Remove them first.` 
        });
      }
    }

    // Delete the category
    const result = await client.query(
      "DELETE FROM categories WHERE category_id=$1 RETURNING *",
      [id]
    );
    
    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, error: "Category not found" });
    }
    
    await client.query('COMMIT');
    console.log('Category deleted successfully:', id);
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error deleting category:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
};
