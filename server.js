    require('dotenv').config();
    const express = require('express');
    const connectDB = require('./utils/db');
    const authRoutes = require('./routes/authRoutes');
    const gameRoutes = require('./routes/gameRoutes');
    const logger = require('./middlewares/logger');
    const rateLimiter = require('./middlewares/rateLimiter');
    const errorHandler = require('./middlewares/errorHandler');

    const app = express();
    app.use(errorHandler);
    app.use(express.json());
    app.use(logger);
    app.use(rateLimiter);

    app.use('/api/auth', authRoutes);
    app.use('/api/games', gameRoutes);

    connectDB();

    const PORT = process.env.PORT || 3000;

    module.exports = app;// for Jest tests

    if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log('Server is running on http://localhost:' + PORT);
    }); // connect to the server
    }
    module.exports = app;// for Jest tests