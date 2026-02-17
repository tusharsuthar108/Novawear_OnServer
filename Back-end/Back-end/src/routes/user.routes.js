const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

// Send OTP for signup
router.post('/send-otp', UserController.sendSignupOTP);

// Send OTP for login
router.post('/send-login-otp', UserController.sendLoginOTP);

// Verify OTP and complete signup
router.post('/verify-signup', UserController.verifyOTPAndSignup);

// Verify OTP and login
router.post('/verify-login', UserController.verifyLoginOTP);

// Login with password
router.post('/login-password', UserController.loginWithPassword);

module.exports = router;