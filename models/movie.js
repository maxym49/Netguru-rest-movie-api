const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    userTitle: String,
    movie: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('Movie', movieSchema);