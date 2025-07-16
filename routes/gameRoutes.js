const express = require('express');
const router = express.Router();
const {
    addGame,
    editGame,
    deleteGame,
    getAllGames,
    searchGames
} = require('../controllers/gameController');
const auth = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');

router.post(
    '/',
    auth,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('genre').notEmpty().withMessage('Genre is required'),
        body('platform').notEmpty().withMessage('Platform is required'),
        body('releaseYear').isInt({ min: 1950 }).withMessage('Valid release year is required'),
    ],
    validateRequest,
    addGame
);

router.put('/:id', auth, editGame);
router.delete('/:id', auth, deleteGame);
router.get('/', getAllGames);
router.get('/search', searchGames);

module.exports = router;