const express = require('express');
const router = express.Router();
const productImageController = require('../controllers/productImage.controller');

router.post('/add', productImageController.addProductImage);
router.get('/:variantId', productImageController.getVariantImages);
router.delete('/:imageId', productImageController.deleteProductImage);

module.exports = router;
