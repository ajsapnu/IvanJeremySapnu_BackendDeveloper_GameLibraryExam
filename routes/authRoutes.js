const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');

router.post(
    '/register',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    validateRequest,
    register
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    validateRequest,
    login
);

module.exports = router;