const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');

router.get('/dashboard', analyticsController.getDashboardStats);
router.get('/sales-report', analyticsController.getSalesReport);
router.get('/revenue', analyticsController.getRevenueAnalytics);
router.get('/popular-products', analyticsController.getPopularProducts);
router.get('/low-stock', analyticsController.getLowStockAlerts);

module.exports = router;
