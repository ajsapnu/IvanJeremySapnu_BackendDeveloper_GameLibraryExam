const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    description: { type: String }
});

gameSchema.index({ title: 'text', genre: 'text', platform: 'text' });

module.exports = mongoose.model('Game', gameSchema);