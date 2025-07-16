const Game = require('../models/gameModel');

// Add a new game with input validation
exports.addGame = async (req, res, next) => {
    try {
        const { title, genre, platform, releaseYear, description } = req.body;

        // Basic input validation
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

// Search games using MongoDB text index
exports.searchGames = async (req, res, next) => {
    const { query } = req.query;
    try {
        const games = await Game.find({ $text: { $search: query } });
        res.json(games);
    } catch (err) {
        next(err);
    }
};

// Edit an existing game by ID
exports.editGame = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateGame = await Game.findByIdAndUpdate(id, req.body, { new: true });

        if (!updateGame) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.json(updateGame);
    } catch (err) {
        next(err);
    }
};

// Delete a game by ID
exports.deleteGame = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteGame = await Game.findByIdAndDelete(id);

        if (!deleteGame) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.json({ message: 'Game deleted successfully' });
    } catch (err) {
        next(err);
    }
};
