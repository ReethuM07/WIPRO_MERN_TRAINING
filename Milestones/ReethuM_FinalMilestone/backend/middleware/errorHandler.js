const errorHandler = (err, req, res, next) => {

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate entry found',
            data: null
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: Object.values(err.errors).map(e => e.message).join(', '),
            data: null
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        data: null
    });
};

module.exports = errorHandler;