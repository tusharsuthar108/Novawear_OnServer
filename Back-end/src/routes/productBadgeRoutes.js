const express = require('express');
const ProductBadgeController = require('../controllers/productBadgeController');

const router = express.Router();

// Get all products with badges
router.get('/products-badges', ProductBadgeController.getProductsWithBadges);

// Get badges for specific product
router.get('/products/:productId/badges', ProductBadgeController.getProductBadges);

// Add badge to product
router.post('/products/badges/add', ProductBadgeController.addBadgeToProduct);

// Remove badge from product
router.delete('/products/badges/remove', ProductBadgeController.removeBadgeFromProduct);

// Get all available badges
router.get('/badges/available', ProductBadgeController.getAvailableBadges);

module.exports = router;