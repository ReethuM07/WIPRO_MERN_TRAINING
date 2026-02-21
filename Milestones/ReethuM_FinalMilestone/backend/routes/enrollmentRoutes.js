const express = require('express');
const router = express.Router();

const { createEnrollment, getUserEnrollments } = require('../controllers/enrollmentController');
const { validateEnrollment } = require('../middleware/validation');

router.post('/', validateEnrollment, createEnrollment);
router.get('/:userId', getUserEnrollments);

module.exports = router;