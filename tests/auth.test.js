const request = require('supertest');
const app = require('../server'); // ensure server.js has module.exports = app

describe('Auth Routes', () => {
    it('should return 400 if fields are missing on registration', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: "test@example.com" }); // missing username and password

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/all fields are required/i);
    });
});