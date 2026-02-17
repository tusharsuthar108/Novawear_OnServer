const express = require('express');
const SizeController = require('../controllers/sizeController');

const router = express.Router();

// Get all sizes
router.get('/', SizeController.getAllSizes);

// Get size by ID
router.get('/:id', SizeController.getSizeById);

// Create new size
router.post('/', SizeController.createSize);

// Update size
router.put('/:id', SizeController.updateSize);

// Delete size
router.delete('/:id', SizeController.deleteSize);

module.exports = router;