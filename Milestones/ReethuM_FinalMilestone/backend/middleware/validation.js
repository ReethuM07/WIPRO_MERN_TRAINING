const Joi = require('joi');

const programSchema = Joi.object({
    programId: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.string().required(),
    level: Joi.string()
        .valid('Beginner', 'Intermediate', 'Advanced')
        .required(),
    price: Joi.number().min(0).required()
});

const enrollmentSchema = Joi.object({
    userId: Joi.string().required(),
    programId: Joi.string().required()
});

const validateProgram = (req, res, next) => {
    const { error } = programSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(err => err.message),
            data: null
        });
    }
    next();
};

const validateEnrollment = (req, res, next) => {
    const { error } = enrollmentSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(err => err.message),
            data: null
        });
    }
    next();
};

module.exports = { validateProgram, validateEnrollment };