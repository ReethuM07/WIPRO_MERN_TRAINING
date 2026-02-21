const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Comment = require('../models/Comment');

//Get all users
const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.json({
            success: true,
            data: users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get users by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const questionsCount = await Question.countDocuments({ askedBy: user._id });
        const answersCount = await Answer.countDocuments({ answeredBy: user._id });
        const commentsCount = await Comment.countDocuments({ commentedBy: user._id });

        res.json({
            success: true,
            data: {
                ...user.toObject(),
                stats: {
                    questions: questionsCount,
                    answers: answersCount,
                    comments: commentsCount
                }
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Update user
const updateUser = async (req, res) => {
    try {
        const { username, email, role, isActive } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;
        if (isActive !== undefined) user.isActive = isActive;

        await user.save();

        res.json({
            success: true,
            data: { ...user.toObject(), password: undefined },
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Deactivate user
const deactivateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isActive = false;
        await user.save();

        await Question.updateMany(
            { askedBy: user._id },
            { isActive: false }
        );

        await Answer.updateMany(
            { answeredBy: user._id },
            { isActive: false }
        );

        res.json({
            success: true,
            message: 'User deactivated successfully'
        });
    } catch (error) {
        console.error('Deactivate user error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Activate user
const activateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isActive = true;
        await user.save();

        res.json({
            success: true,
            message: 'User activated successfully'
        });
    } catch (error) {
        console.error('Activate user error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get pending questions
const getPendingQuestions = async (req, res) => {
    try {
        const questions = await Question.find({
            status: 'pending',
            isActive: true
        })
            .populate('askedBy', 'username email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: questions
        });
    } catch (error) {
        console.error('Get pending questions error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get pending answers
const getPendingAnswers = async (req, res) => {
    try {
        const answers = await Answer.find({
            status: 'pending',
            isActive: true
        })
            .populate('answeredBy', 'username email')
            .populate({
                path: 'questionId',
                select: 'title topic'
            })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: answers
        });
    } catch (error) {
        console.error('Get pending answers error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get dashboard stats
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isActive: true });
        const totalQuestions = await Question.countDocuments();
        const pendingQuestions = await Question.countDocuments({ status: 'pending' });
        const approvedQuestions = await Question.countDocuments({ status: 'approved' });
        const totalAnswers = await Answer.countDocuments();
        const pendingAnswers = await Answer.countDocuments({ status: 'pending' });
        const totalComments = await Comment.countDocuments();

        res.json({
            success: true,
            data: {
                users: {
                    total: totalUsers,
                    active: activeUsers
                },
                questions: {
                    total: totalQuestions,
                    pending: pendingQuestions,
                    approved: approvedQuestions
                },
                answers: {
                    total: totalAnswers,
                    pending: pendingAnswers
                },
                comments: totalComments
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get all answers
const getAllAnswers = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const query = { isActive: true };

        if (status && status !== 'all') {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const answers = await Answer.find(query)
            .populate('answeredBy', 'username email')
            .populate({
                path: 'questionId',
                select: 'title topic'
            })
            .populate({
                path: 'comments',
                match: { isActive: true },
                populate: {
                    path: 'commentedBy',
                    select: 'username'
                }
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Answer.countDocuments(query);

        res.json({
            success: true,
            data: answers,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get all answers error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const query = { isActive: true };

        if (status && status !== 'all') {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const questions = await Question.find(query)
            .populate('askedBy', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Question.countDocuments(query);

        res.json({
            success: true,
            data: questions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get all questions error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
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
};
