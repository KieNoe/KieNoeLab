const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// 公开路由
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/verification-code', userController.sendVerificationCode);
router.post('/verify-code', userController.verifyCode);
router.post('/reset-password', userController.resetPassword);

// 需要认证的路由
router.get('/profile', authenticate, userController.getProfile);
router.post('/change-email', authenticate, userController.changeEmail);

module.exports = router;