const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getAllUsers,
    getUserById,
    updateUser,
    deactivateUser,
    activateUser,
    getPendingQuestions,
    getPendingAnswers,
    getAllAnswers,
    getAllQuestions,
    getDashboardStats
} = require('../controllers/adminController');

router.use(protect, admin);

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deactivateUser);
router.put('/users/:id/activate', activateUser);
router.get('/questions/pending', getPendingQuestions);
router.get('/answers/pending', getPendingAnswers);
router.get('/answers', getAllAnswers);
router.get('/questions', getAllQuestions);
router.get('/stats', getDashboardStats);

module.exports = router;