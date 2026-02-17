const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const brandUpload = require('../middleware/brandUpload');

router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrandById);
router.post('/', brandUpload.single('logo'), brandController.createBrand);
router.put('/:id', brandUpload.single('logo'), brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

module.exports = router;