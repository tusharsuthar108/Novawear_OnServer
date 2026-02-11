const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/create', orderController.createOrder);
router.get('/all', orderController.getAllOrders);
router.get('/:userId', orderController.getUserOrders);
router.get('/:orderId/details', orderController.getOrderDetails);
router.put('/:orderId/status', orderController.updateOrderStatus);
router.get('/track/:orderId', orderController.trackOrder);

module.exports = router;
