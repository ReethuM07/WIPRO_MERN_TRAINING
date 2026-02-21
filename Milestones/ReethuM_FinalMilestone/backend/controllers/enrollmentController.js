const Enrollment = require('../models/Enrollment');
const Program = require('../models/Program');

exports.createEnrollment = async (req, res, next) => {
    try {
        const { userId, programId } = req.body;
        const program = await Program.findOne({ programId });
        if (!program) {
            return res.status(404).json({
                success: false,
                message: 'Program not found',
                data: null
            });
        }

        const existingEnrollment = await Enrollment.findOne({ userId, programId });
        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'User already enrolled in this program',
                data: null
            });
        }

        const enrollment = await Enrollment.create({ userId, programId });
        res.status(201).json({
            success: true,
            message: 'Enrollment successful',
            data: enrollment
        });
    } catch (error) {
        next(error);
    }
};

exports.getUserEnrollments = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const enrollments = await Enrollment.find({ userId });
        return res.status(200).json({
            success: true,
            message: 'Enrollments fetched successfully',
            data: enrollments
        });
    } catch (error) {
        next(error);
    }
};