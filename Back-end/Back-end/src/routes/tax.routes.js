const express = require('express');
const router = express.Router();
const taxController = require('../controllers/tax.controller');

router.get('/taxes', taxController.getTaxes);
router.get('/fees', taxController.getFees);

module.exports = router;
