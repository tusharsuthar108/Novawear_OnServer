const db = require('../config/database');

class SubCategoryService {
  // Get all subcategories with category details
  async getAllSubCategories() {
    // First test if description column exists
    try {
      const testQuery = 'SELECT description FROM sub_categories LIMIT 1';
      const testResult = await db.query(testQuery);
      console.log('Description column test:', testResult.rows[0]);
    } catch (error) {
      console.error('Description column does not exist:', error.message);
    }
    
    const query = `
      SELECT 
        sc.sub_category_id,
        sc.category_id,
        sc.name,
        sc.slug,
        sc.description,
        sc.image_url,
        sc.is_active,
        sc.created_at,
        c.name as category_name,
        mc.name as master_category_name
      FROM sub_categories sc
      LEFT JOIN categories c ON sc.category_id = c.category_id
      LEFT JOIN master_categories mc ON c.master_category_id = mc.master_category_id
      ORDER BY sc.created_at DESC
    `;
    
    console.log('Executing main query');
    const result = await db.query(query);
    console.log('Query result sample:', result.rows[0]);
    return result.rows;
  }

  // Get subcategory by ID
  async getSubCategoryById(id) {
    const query = `
      SELECT 
        sc.sub_category_id,
        sc.category_id,
        sc.name,
        sc.slug,
        sc.description,
        sc.image_url,
        sc.is_active,
        sc.created_at,
        c.name as category_name
      FROM sub_categories sc
      LEFT JOIN categories c ON sc.category_id = c.category_id
      WHERE sc.sub_category_id = $1
    `;
    
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Create new subcategory
  async createSubCategory(data) {
    const { category_id, name, slug, description, image_url, is_active } = data;
    
    console.log('Creating subcategory with data:', data);
    console.log('Description value:', description);
    
    const query = `
      INSERT INTO sub_categories (category_id, name, slug, description, image_url, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const params = [
      category_id,
      name,
      slug || name.toLowerCase().replace(/\s+/g, '-'),
      description || null,
      image_url,
      is_active !== undefined ? is_active : true
    ];
    
    console.log('SQL Query:', query);
    console.log('SQL Params:', params);
    
    try {
      const result = await db.query(query, params);
      console.log('Subcategory created successfully:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Database error creating subcategory:', error.message);
      console.error('Error details:', error);
      throw error;
    }
  }

  // Update subcategory
  async updateSubCategory(id, data) {
    const { category_id, name, slug, description, image_url, is_active, updateImage } = data;
    
    let query, params;
    
    if (updateImage && image_url) {
      // Update with new image
      query = `
        UPDATE sub_categories 
        SET category_id = $1, name = $2, slug = $3, description = $4, image_url = $5, is_active = $6
        WHERE sub_category_id = $7
        RETURNING *
      `;
      params = [category_id, name, slug || name.toLowerCase().replace(/\s+/g, '-'), description, image_url, is_active, id];
    } else {
      // Update without changing image
      query = `
        UPDATE sub_categories 
        SET category_id = $1, name = $2, slug = $3, description = $4, is_active = $5
        WHERE sub_category_id = $6
        RETURNING *
      `;
      params = [category_id, name, slug || name.toLowerCase().replace(/\s+/g, '-'), description, is_active, id];
    }
    
    const result = await db.query(query, params);
    return result.rows[0];
  }

  // Delete subcategory
  async deleteSubCategory(id) {
    // First get the subcategory to return image_url for cleanup
    const subcategory = await this.getSubCategoryById(id);
    
    const query = 'DELETE FROM sub_categories WHERE sub_category_id = $1';
    const result = await db.query(query, [id]);
    
    return {
      deleted: result.rowCount > 0,
      image_url: subcategory?.image_url
    };
  }

  // Get subcategories by category ID
  async getSubCategoriesByCategoryId(categoryId) {
    const query = `
      SELECT 
        sub_category_id,
        category_id,
        name,
        slug,
        description,
        image_url,
        is_active,
        created_at
      FROM sub_categories
      WHERE category_id = $1 AND is_active = true
      ORDER BY name ASC
    `;
    
    const result = await db.query(query, [categoryId]);
    return result.rows;
  }

  // Check if slug exists
  async slugExists(slug, excludeId = null) {
    let query = 'SELECT sub_category_id FROM sub_categories WHERE slug = $1';
    let params = [slug];
    
    if (excludeId) {
      query += ' AND sub_category_id != $2';
      params.push(excludeId);
    }
    
    const result = await db.query(query, params);
    return result.rows.length > 0;
  }
}

module.exports = new SubCategoryService();