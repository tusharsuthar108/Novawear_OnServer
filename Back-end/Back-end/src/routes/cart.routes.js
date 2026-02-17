const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Add item to cart
router.post('/add', cartController.addToCart);

// Get user cart
router.get('/:userId', cartController.getCart);

// Update cart item quantity
router.put('/update', cartController.updateCartItem);

// Remove item from cart
router.delete('/remove/:itemId', cartController.removeFromCart);

// Clear cart
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
