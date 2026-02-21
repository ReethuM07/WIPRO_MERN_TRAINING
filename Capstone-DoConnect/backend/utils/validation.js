const { body, validationResult } = require('express-validator');

const validateQuestion = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 5 }).withMessage('Title must be at least 5 characters')
        .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters')
        .trim(),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters')
        .isLength({ max: 5000 }).withMessage('Description cannot exceed 5000 characters')
        .trim(),
    body('topic')
        .notEmpty().withMessage('Topic is required')
        .trim()
];

const validateAnswer = [
    body('content')
        .notEmpty().withMessage('Answer content is required')
        .isLength({ min: 5 }).withMessage('Answer must be at least 5 characters')
        .isLength({ max: 2000 }).withMessage('Answer cannot exceed 2000 characters')
        .trim()
];

const validateComment = [
    body('content')
        .notEmpty().withMessage('Comment content is required')
        .isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
        .trim()
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateQuestion,
    validateAnswer,
    validateComment,
    handleValidationErrors
};