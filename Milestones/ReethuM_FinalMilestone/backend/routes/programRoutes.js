const express = require('express');
const router = express.Router();

const { createProgram, getAllPrograms } = require('../controllers/programController');
const { validateProgram } = require('../middleware/validation');

router.post('/', validateProgram, createProgram);
router.get('/', getAllPrograms);

module.exports = router;