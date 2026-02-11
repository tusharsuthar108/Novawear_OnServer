const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

router.post('/create', reviewController.createReview);
router.get('/:productId', reviewController.getProductReviews);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
