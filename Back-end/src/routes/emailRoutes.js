const express = require('express');
const EmailController = require('../controllers/emailController');

const router = express.Router();

// Send welcome email
router.post('/welcome', EmailController.sendWelcome);

// Send order confirmation email
router.post('/order-confirmation', EmailController.sendOrderConfirmation);

// Send custom email
router.post('/send', EmailController.sendCustomEmail);

module.exports = router;