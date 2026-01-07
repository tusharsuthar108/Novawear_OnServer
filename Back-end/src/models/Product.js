const pool = require('../config/database');

class Product {
  // Get all products
  static async getAll() {
    const result = await pool.query(`
      SELECT p.*, b.brand_name 
      FROM products p 
      LEFT JOIN brands b ON p.brand_id = b.brand_id 
      ORDER BY p.name
    `);
    return result.rows;
  }

  // Get product by ID
  static async getById(productId) {
    const result = await pool.query(`
      SELECT p.*, b.brand_name 
      FROM products p 
      LEFT JOIN brands b ON p.brand_id = b.brand_id 
      WHERE p.product_id = $1
    `, [productId]);
    return result.rows[0];
  }

  // Get product badges
  static async getProductBadges(productId) {
    const result = await pool.query(`
      SELECT pb.*, pbm.product_id
      FROM product_badges pb
      JOIN product_badge_mapping pbm ON pb.badge_id = pbm.badge_id
      WHERE pbm.product_id = $1
    `, [productId]);
    return result.rows;
  }

  // Add badge to product
  static async addBadge(productId, badgeId) {
    const result = await pool.query(`
      INSERT INTO product_badge_mapping (product_id, badge_id) 
      VALUES ($1, $2) 
      ON CONFLICT (product_id, badge_id) DO NOTHING
      RETURNING *
    `, [productId, badgeId]);
    return result.rows[0];
  }

  // Remove badge from product
  static async removeBadge(productId, badgeId) {
    const result = await pool.query(`
      DELETE FROM product_badge_mapping 
      WHERE product_id = $1 AND badge_id = $2 
      RETURNING *
    `, [productId, badgeId]);
    return result.rows[0];
  }
}

module.exports = Product;