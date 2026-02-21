const Program = require('../models/Program');

exports.createProgram = async (req, res, next) => {
    try {
        const program = await Program.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Program created successfully',
            data: program
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllPrograms = async (req, res, next) => {
    try {
        const programs = await Program.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'Programs fetched successfully',
            data: programs
        });
    } catch (error) {
        next(error);
    }
};