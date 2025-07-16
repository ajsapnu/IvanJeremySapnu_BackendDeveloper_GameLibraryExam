const express = require('express');
const router = express.Router();

// Import game controllers for handling CRUD and search
const {
    addGame,
    editGame,
    deleteGame,
    getAllGames,
    searchGames
} = require('../controllers/gameController');

// Import authentication middleware to protect specific routes
const auth = require('../middlewares/authMiddleware');

// Route: POST /api/games/
router.post('/', auth, addGame);

// Route: PUT /api/games/:id
router.put('/:id', auth, editGame);

// Route: DELETE /api/games/:id
router.delete('/:id', auth, deleteGame);

// Route: GET /api/games/
router.get('/', getAllGames);

// Route: GET /api/games/search?query=
router.get('/search', searchGames);

// Export router for integration into server.js
module.exports = router;
