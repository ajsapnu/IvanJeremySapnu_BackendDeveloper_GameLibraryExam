const mongoose = require('mongoose');

// Define the schema for Game documents in MongoDB
const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    description: { type: String }
});

// Create a text index to enable search on these fields
gameSchema.index({ title: 'text', genre: 'text', platform: 'text' });

module.exports = mongoose.model('Game', gameSchema);
