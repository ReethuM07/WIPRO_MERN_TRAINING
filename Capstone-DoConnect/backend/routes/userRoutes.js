const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getUserProfile,
    updateUserProfile,
    getUserQuestions,
    getUserAnswers,
    getUserActivity,
    deleteUserAccount
} = require('../controllers/userController');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.delete('/profile', protect, deleteUserAccount);
router.get('/:userId/questions', getUserQuestions);
router.get('/:userId/answers', getUserAnswers);
router.get('/:userId/activity', getUserActivity);

module.exports = router;