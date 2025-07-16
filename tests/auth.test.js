const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth Routes', () => {
    it('should return 400 if fields are missing on registration', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: "test@example.com"});
        expect(res.statusCode).toBe(400);
    });
});
