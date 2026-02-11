const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.post('/add', wishlistController.addToWishlist);
router.get('/:userId', wishlistController.getWishlist);
router.delete('/remove/:productId', wishlistController.removeFromWishlist);

module.exports = router;
