const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon.controller');

router.post('/validate', couponController.validateCoupon);
router.get('/', couponController.getAllCoupons);
router.post('/create', couponController.createCoupon);

module.exports = router;
