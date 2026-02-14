const express = require('express');
const router = express.Router();
const studentController = require('./student.controller');
const { authorizeRole } = require('../middleware/role.middleware');
const { isAuthenticated } = require('../middleware/auth.middleware');

router.get('/create', isAuthenticated, authorizeRole('admin'), studentController.showCreateStudent);
router.post('/create', isAuthenticated, authorizeRole('admin'), studentController.createStudent);

router.get('/', isAuthenticated, authorizeRole('admin'), studentController.listStudents);

router.get('/enroll', isAuthenticated, authorizeRole('admin'), studentController.showEnroll);
router.post('/enroll', isAuthenticated, authorizeRole('admin'), studentController.enrollStudent);

module.exports = router;
