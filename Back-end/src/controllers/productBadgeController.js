const pool = require('../config/database');
const Product = require('../models/Product');
const Badge = require('../models/Badge');

class ProductBadgeController {
  // Get all products with their badges
  static async getProductsWithBadges(req, res) {
    try {
      const result = await pool.query(`
        SELECT 
          p.product_id, p.name, p.sku, p.description, p.long_description,
          b.brand_name,
          pb.badge_id, pb.badge_name
        FROM products p 
        LEFT JOIN brands b ON p.brand_id = b.brand_id 
        LEFT JOIN product_badges pb ON p.badge_id = pb.badge_id
        ORDER BY p.name
      `);
      
      // Group products with their badges
      const productsMap = new Map();
      
      result.rows.forEach(row => {
        if (!productsMap.has(row.product_id)) {
          productsMap.set(row.product_id, {
            product_id: row.product_id,
            name: row.name,
            sku: row.sku,
            description: row.description,
            long_description: row.long_description,
            brand_name: row.brand_name,
            badges: []
          });
        }
        
        if (row.badge_id) {
          productsMap.get(row.product_id).badges.push({
            badge_id: row.badge_id,
            badge_name: row.badge_name
          });
        }
      });
      
      const products = Array.from(productsMap.values());
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get product badges
  static async getProductBadges(req, res) {
    try {
      const badges = await Product.getProductBadges(req.params.productId);
      res.json({ success: true, data: badges });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Add badge to product
  static async addBadgeToProduct(req, res) {
    try {
      const { productId, badgeId } = req.body;
      const result = await Product.addBadge(productId, badgeId);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Remove badge from product
  static async removeBadgeFromProduct(req, res) {
    try {
      const { productId, badgeId } = req.body;
      const result = await Product.removeBadge(productId, badgeId);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get all available badges
  static async getAvailableBadges(req, res) {
    try {
      const badges = await Badge.getAll();
      res.json({ success: true, data: badges });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get products by badge type
  static async getProductsByBadgeType(req, res) {
    try {
      const { badgeType } = req.params;
      
      const result = await pool.query(`
        SELECT DISTINCT
          p.product_id, 
          p.name as product_name, 
          p.description,
          pv.variant_id, 
          pv.price, 
          pv.mrp, 
          pv.stock_quantity,
          pi.image_url,
          b.brand_name,
          pb.badge_name,
          CASE 
            WHEN pv.mrp > 0 AND pv.price > 0 
            THEN ROUND(((pv.mrp - pv.price) / pv.mrp * 100)::numeric, 0)
            ELSE 0 
          END as discount_percentage
        FROM products p
        INNER JOIN product_badges pb ON p.badge_id = pb.badge_id
        LEFT JOIN brands b ON p.brand_id = b.brand_id
        LEFT JOIN product_variants pv ON p.product_id = pv.product_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = true
        WHERE LOWER(pb.badge_name) = LOWER($1)
        AND pv.stock_quantity > 0
        ORDER BY p.product_id DESC
        LIMIT 20
      `, [badgeType]);
      
      res.json({ success: true, data: result.rows });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = ProductBadgeController;