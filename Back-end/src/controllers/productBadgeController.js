const Product = require('../models/Product');
const Badge = require('../models/Badge');

class ProductBadgeController {
  // Get all products with their badges
  static async getProductsWithBadges(req, res) {
    try {
      const products = await Product.getAll();
      
      // Get badges for each product
      const productsWithBadges = await Promise.all(
        products.map(async (product) => {
          const badges = await Product.getProductBadges(product.product_id);
          return { ...product, badges };
        })
      );

      res.json({ success: true, data: productsWithBadges });
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
}

module.exports = ProductBadgeController;