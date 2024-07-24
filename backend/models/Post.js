const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    description : {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);