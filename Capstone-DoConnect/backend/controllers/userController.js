const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const bcrypt = require('bcryptjs');

//Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const questionsCount = await Question.countDocuments({ askedBy: user._id });
        const answersCount = await Answer.countDocuments({ answeredBy: user._id });

        res.json({
            success: true,
            data: {
                ...user.toObject(),
                stats: {
                    totalQuestions: questionsCount,
                    totalAnswers: answersCount
                }
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { username, email, currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        await user.save();

        res.json({
            success: true,
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get questions
const getUserQuestions = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const query = {
            askedBy: userId,
            isActive: true
        };

        if (!req.user || req.user._id.toString() !== userId) {
            query.status = 'approved';
        }

        const skip = (page - 1) * limit;

        const questions = await Question.find(query)
            .populate('askedBy', 'username')
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
        console.error('Get user questions error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get user answers
const getUserAnswers = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const query = {
            answeredBy: userId,
            isActive: true
        };

        if (!req.user || req.user._id.toString() !== userId) {
            query.status = 'approved';
        }

        const skip = (page - 1) * limit;

        const answers = await Answer.find(query)
            .populate('answeredBy', 'username')
            .populate({
                path: 'questionId',
                select: 'title topic'
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
        console.error('Get user answers error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get user activity
const getUserActivity = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('username email createdAt');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const questionsCount = await Question.countDocuments({
            askedBy: userId,
            isActive: true,
            status: 'approved'
        });

        const answersCount = await Answer.countDocuments({
            answeredBy: userId,
            isActive: true,
            status: 'approved'
        });

        const recentQuestions = await Question.find({
            askedBy: userId,
            isActive: true,
            status: 'approved'
        })
            .select('title createdAt views')
            .sort({ createdAt: -1 })
            .limit(5);

        const recentAnswers = await Answer.find({
            answeredBy: userId,
            isActive: true,
            status: 'approved'
        })
            .populate('questionId', 'title')
            .select('content createdAt questionId')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            success: true,
            data: {
                user,
                stats: {
                    totalQuestions: questionsCount,
                    totalAnswers: answersCount
                },
                recentActivity: {
                    questions: recentQuestions,
                    answers: recentAnswers
                }
            }
        });
    } catch (error) {
        console.error('Get user activity error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Delete user account
const deleteUserAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

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
            message: 'Account deactivated successfully'
        });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getUserQuestions,
    getUserAnswers,
    getUserActivity,
    deleteUserAccount
};