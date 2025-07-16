const jwt = require('jsonwebtoken');

// Middleware to protect routes using JWT authentication
const protect = (req, res, next) => {
    console.log("Auth Header:", req.headers.authorization); // Debug: check incoming token

    const authHeader = req.headers.authorization;

    // Check for presence of Bearer token in the header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify token and attach user info to the request for downstream use
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = protect;
