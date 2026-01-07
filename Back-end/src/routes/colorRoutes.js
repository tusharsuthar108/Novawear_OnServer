const express = require('express');
const ColorController = require('../controllers/colorController');

const router = express.Router();

// Get all colors
router.get('/', ColorController.getAllColors);

// Get color by ID
router.get('/:id', ColorController.getColorById);

// Create new color
router.post('/', ColorController.createColor);

// Update color
router.put('/:id', ColorController.updateColor);

// Delete color
router.delete('/:id', ColorController.deleteColor);

module.exports = router;