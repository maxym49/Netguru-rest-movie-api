const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    movieId: mongoose.Schema.Types.Mixed,
    text: String
});

module.exports = mongoose.model('Comment', commentSchema);