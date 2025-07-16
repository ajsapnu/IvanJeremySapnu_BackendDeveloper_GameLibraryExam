const Game = require('../models/gameModel');

// Add a new game
exports.addGame = async (req, res, next) => {
    try {
        const { title, genre, platform, releaseYear, description } = req.body;

        if (!title || !genre || !platform || !releaseYear) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const game = new Game({ title, genre, platform, releaseYear, description });
        await game.save();
        res.status(201).json(game);
    } catch (err) {
        next(err);
    }
};

// Retrieve all games
exports.getAllGames = async (req, res, next) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        next(err);
    }
};

// Search games
exports.searchGames = async (req, res, next) => {
    try {
        const { query } = req.query;
        const games = await Game.find({ $text: { $search: query } });
        res.json(games);
    } catch (err) {
        next(err);
    }
};

// Edit a game
exports.editGame = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedGame = await Game.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(updatedGame);
    } catch (err) {
        next(err);
    }
};

// Delete a game
exports.deleteGame = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedGame = await Game.findByIdAndDelete(id);
        if (!deletedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json({ message: 'Game deleted successfully' });
    } catch (err) {
        next(err);
    }
};