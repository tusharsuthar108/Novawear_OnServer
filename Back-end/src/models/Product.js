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
      SELECT pb.badge_id, pb.badge_name
      FROM product_badges pb
      WHERE pb.badge_id = (SELECT badge_id FROM products WHERE product_id = $1)
    `, [productId]);
    return result.rows;
  }

  // Add badge to product
  static async addBadge(productId, badgeId) {
    const result = await pool.query(`
      UPDATE products SET badge_id = $2 WHERE product_id = $1
      RETURNING *
    `, [productId, badgeId]);
    return result.rows[0];
  }

  // Remove badge from product
  static async removeBadge(productId, badgeId) {
    const result = await pool.query(`
      UPDATE products SET badge_id = NULL WHERE product_id = $1
      RETURNING *
    `, [productId]);
    return result.rows[0];
  }
}

module.exports = Product;