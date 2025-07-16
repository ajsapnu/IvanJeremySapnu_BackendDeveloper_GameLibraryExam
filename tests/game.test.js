const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // ensure app is exported from server.js
const User = require('../models/userModel');
const Game = require('../models/gameModel');

let token; // JWT token
let gameId; // created game ID

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Clean collections
    await User.deleteMany();
    await Game.deleteMany();

    // Register and login a user to get a JWT token
    await request(app)
        .post('/api/auth/register')
        .send({
            username: "GameTester",
            email: "gametester@example.com",
            password: "password123"
        });

    const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: "gametester@example.com",
            password: "password123"
        });

    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Game Routes', () => {

    it('should create a new game', async () => {
        const res = await request(app)
            .post('/api/games')
            .set('Authorization', 'Bearer ${token}')
            .send({
                title: "Test Game",
                genre: "Adventure",
                platform: "PC",
                releaseYear: 2025,
                description: "A test game for API testing."
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe("Test Game");

        gameId = res.body._id;
    });

    it('should retrieve all games', async () => {
        const res = await request(app).get('/api/games');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should search for the game by title', async () => {
        const res = await request(app).get('/api/games/search').query({ query: "Test" });
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should update the game', async () => {
        const res = await request(app)
            .put('/api/games/${gameId}')
            .set('Authorization', 'Bearer ${token}')
            .send({
                title: "Updated Test Game"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Updated Test Game");
    });

    it('should delete the game', async () => {
        const res = await request(app)
            .delete('/api/games/${gameId}')
            .set('Authorization', 'Bearer ${token}');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Game deleted successfully');
    });

});