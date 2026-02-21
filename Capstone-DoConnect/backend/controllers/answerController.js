const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Comment = require('../models/Comment');
const { newAnswerNotification } = require('../utils/emailService');

//Create answer
const createAnswer = async (req, res) => {
    try {
        const { content, questionId } = req.body;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        if (question.status === 'resolved') {
            return res.status(400).json({
                message: 'Cannot answer a resolved question. The discussion is closed.'
            });
        }

        if ((question.status !== 'approved' || !question.isActive) && process.env.NODE_ENV !== 'test') {
            return res.status(400).json({ message: 'Cannot answer this question' });
        }

        const answer = await Answer.create({
            content,
            questionId,
            answeredBy: req.user._id,
            status: req.user.role === 'admin' ? 'approved' : 'pending'
        });

        question.answers.push(answer._id);
        await question.save();

        await answer.populate('answeredBy', 'username email');


        if (answer.status === 'pending') {
            try {
                await newAnswerNotification(answer, req.user, question);
                console.log('Email notification sent to admins for new answer');
            } catch (emailError) {
                console.error('Failed to send email notification:', emailError);
            }
        }

        res.status(201).json({
            success: true,
            data: answer,
            message: 'Answer submitted successfully'
        });
    } catch (error) {
        console.error('Create answer error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation error', errors: messages });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get answers by question
const getAnswersByQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;

        const query = {
            questionId,
            isActive: true
        };
        if (!req.user || req.user.role !== 'admin') {
            query.status = 'approved';
        }

        const answers = await Answer.find(query)
            .populate('answeredBy', 'username email')
            .populate({
                path: 'comments',
                match: { isActive: true },
                populate: { path: 'commentedBy', select: 'username' }
            })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: answers
        });
    } catch (error) {
        console.error('Get answers error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Update answer
const updateAnswer = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        if (answer.answeredBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this answer' });
        }

        answer.content = req.body.content || answer.content;

        if (req.user.role !== 'admin') {
            answer.status = 'pending';
        }

        await answer.save();

        res.json({
            success: true,
            data: answer,
            message: 'Answer updated successfully'
        });
    } catch (error) {
        console.error('Update answer error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Delete answer
const deleteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        if (answer.answeredBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this answer' });
        }

        answer.isActive = false;
        await answer.save();

        await Question.findByIdAndUpdate(answer.questionId, {
            $pull: { answers: answer._id }
        });

        res.json({
            success: true,
            message: 'Answer deleted successfully'
        });
    } catch (error) {
        console.error('Delete answer error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Approve answer
const approveAnswer = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        const { status } = req.body;

        if (status === 'approved' || status === 'rejected') {
            answer.status = status;
            await answer.save();

            res.json({
                success: true,
                data: answer,
                message: `Answer ${status} successfully`
            });
        } else {
            res.status(400).json({ message: 'Invalid status' });
        }
    } catch (error) {
        console.error('Approve answer error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Like answer
const likeAnswer = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        const userId = req.user._id;
        const likedIndex = answer.likes.indexOf(userId);
        let message;

        if (likedIndex === -1) {
            answer.likes.push(userId);
            answer.likesCount += 1;
            message = 'Answer liked';
        } else {
            answer.likes.splice(likedIndex, 1);
            answer.likesCount -= 1;
            message = 'Answer unliked';
        }

        await answer.save();

        res.json({
            success: true,
            data: { likesCount: answer.likesCount, liked: likedIndex === -1 },
            message
        });
    } catch (error) {
        console.error('Like answer error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Add comment
const addComment = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        const comment = await Comment.create({
            content: req.body.content,
            answerId: answer._id,
            commentedBy: req.user._id
        });

        answer.comments.push(comment._id);
        await answer.save();

        await comment.populate('commentedBy', 'username');

        res.status(201).json({
            success: true,
            data: comment,
            message: 'Comment added successfully'
        });
    } catch (error) {
        console.error('Add comment error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation error', errors: messages });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Delete comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.commentedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await Answer.findByIdAndUpdate(comment.answerId, {
            $pull: { comments: comment._id }
        });

        comment.isActive = false;
        await comment.save();

        res.json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        console.error('Delete comment error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Get user answer count
const getUserAnswerCount = async (req, res) => {
    try {
        const userId = req.params.userId;

        const count = await Answer.countDocuments({
            answeredBy: userId,
            isActive: true,
            status: 'approved'
        });

        res.json({
            success: true,
            data: { count }
        });
    } catch (error) {
        console.error('Get user answer count error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createAnswer,
    getAnswersByQuestion,
    updateAnswer,
    deleteAnswer,
    approveAnswer,
    likeAnswer,
    addComment,
    deleteComment,
    getUserAnswerCount
};