const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController')

router.post('/register', register);
router.post('/login', login);
module.exports = router;

// this is the auth routes file that handles user registration and login