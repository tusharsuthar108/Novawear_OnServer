const express = require('express');
const PatternController = require('../controllers/patternController');

const router = express.Router();

// Get all patterns
router.get('/', PatternController.getAllPatterns);

// Get pattern by ID
router.get('/:id', PatternController.getPatternById);

// Create new pattern
router.post('/', PatternController.createPattern);

// Update pattern
router.put('/:id', PatternController.updatePattern);

// Delete pattern
router.delete('/:id', PatternController.deletePattern);

module.exports = router;