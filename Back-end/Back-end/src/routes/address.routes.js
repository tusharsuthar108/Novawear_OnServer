const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');

router.post('/create', addressController.createAddress);
router.get('/:userId', addressController.getUserAddresses);
router.put('/:addressId', addressController.updateAddress);
router.delete('/:addressId', addressController.deleteAddress);

module.exports = router;