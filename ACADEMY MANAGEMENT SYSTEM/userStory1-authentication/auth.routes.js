const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;