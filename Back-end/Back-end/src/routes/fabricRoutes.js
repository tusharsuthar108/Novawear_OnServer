const express = require('express');
const FabricController = require('../controllers/fabricController');

const router = express.Router();

// Get all fabrics
router.get('/', FabricController.getAllFabrics);

// Get fabric by ID
router.get('/:id', FabricController.getFabricById);

// Create new fabric
router.post('/', FabricController.createFabric);

// Update fabric
router.put('/:id', FabricController.updateFabric);

// Delete fabric
router.delete('/:id', FabricController.deleteFabric);

module.exports = router;