const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

likeSchema.index({ user: 1, answer: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);