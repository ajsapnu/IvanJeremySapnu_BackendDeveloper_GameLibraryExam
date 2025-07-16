const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register new user
exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        next(err);
    }
};

// Login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, message: 'Login successful' });
    } catch (err) {
        next(err);
    }
};