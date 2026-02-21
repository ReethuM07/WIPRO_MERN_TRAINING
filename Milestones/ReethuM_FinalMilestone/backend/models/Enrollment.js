const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    programId: {
        type: String,
        required: true
    },
    enrolledOn: {
        type: Date,
        default: Date.now
    }
});

enrollmentSchema.index({ userId: 1, programId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);