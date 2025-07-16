require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);

app.use(errorHandler); // Global error handler

connectDB();

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});