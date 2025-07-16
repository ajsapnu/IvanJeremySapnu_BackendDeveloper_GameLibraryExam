const express = require('express');
const { body } = require('express-validator');
const {
    addGame,
    editGame,
    deleteGame,
    getAllGames,
    searchGames
} = require('../controllers/gameController');

const auth = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/',
    auth,
    [
        body('title').notEmpty(),
        body('genre').notEmpty(),
        body('platform').notEmpty(),
        body('releaseYear').isInt()
    ],
    validateRequest,
    addGame
);

router.put('/:id',
    auth,
    editGame
);

router.delete('/:id',
    auth,
    deleteGame
);

router.get('/', getAllGames);
router.get('/search', searchGames);

module.exports = router;