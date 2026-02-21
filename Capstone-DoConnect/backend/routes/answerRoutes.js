const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    createAnswer,
    getAnswersByQuestion,
    updateAnswer,
    deleteAnswer,
    approveAnswer,
    likeAnswer,
    addComment,
    deleteComment,
    getUserAnswerCount

} = require('../controllers/answerController');
const {
    validateAnswer,
    validateComment,
    handleValidationErrors
} = require('../utils/validation');

router.get('/question/:questionId', getAnswersByQuestion);
router.post('/', protect, validateAnswer, handleValidationErrors, createAnswer);
router.put('/:id', protect, updateAnswer);
router.delete('/:id', protect, deleteAnswer);
router.post('/:id/like', protect, likeAnswer);
router.post('/:id/comments', protect, validateComment, handleValidationErrors, addComment);
router.delete('/comments/:commentId', protect, deleteComment);
router.put('/:id/approve', protect, admin, approveAnswer);
router.get('/user/:userId/count', protect, getUserAnswerCount);
module.exports = router;