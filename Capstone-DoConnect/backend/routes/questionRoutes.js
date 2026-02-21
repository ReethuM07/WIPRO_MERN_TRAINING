const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    createQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
    approveQuestion,
    resolveQuestion,
    getUserQuestions
} = require('../controllers/questionController');
const {
    validateQuestion,
    handleValidationErrors
} = require('../utils/validation');

router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.get('/user/:userId', protect, getUserQuestions);
router.post('/', protect, validateQuestion, handleValidationErrors, createQuestion);
router.put('/:id', protect, updateQuestion);
router.delete('/:id', protect, deleteQuestion);
router.put('/:id/resolve', protect, resolveQuestion);
router.put('/:id/approve', protect, admin, approveQuestion);

module.exports = router;