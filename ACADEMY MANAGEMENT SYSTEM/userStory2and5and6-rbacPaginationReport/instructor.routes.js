const express = require('express');
const router = express.Router();
const instructorController = require('./instructor.controller');
const { authorizeRole } = require('../middleware/role.middleware');
const { isAuthenticated } = require('../middleware/auth.middleware');

router.get('/dashboard', isAuthenticated, authorizeRole('instructor'), instructorController.dashboard);

module.exports = router;