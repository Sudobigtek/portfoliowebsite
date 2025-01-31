const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['campaign', 'editorial', 'runway', 'commercial']
    },
    photographer: {
        type: String,
        trim: true
    },
    client: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    images: {
        original: String,
        thumbnail: String,
        medium: String,
        public_id: String
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema); 