// tests/auth.test.js

const request = require('supertest');
const app = require('../server'); // ensure app is exported correctly
const mongoose = require('mongoose');
const User = require('../models/userModel');

beforeAll(async () => {
    // clear users to avoid duplication during tests
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth Routes', () => {
    it('should return 400 if fields are missing on registration', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: "test@example.com" }); // missing username, password

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('All fields are required');
    });

    it('should register a user successfully', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: "IvanJeremy",
                email: "ivan@example.com",
                password: "password123"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.message).toBe('User registered successfully');
    });

    it('should return 400 for invalid credentials on login', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "nonexistent@example.com",
                password: "wrongpassword"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid credentials');
    });

    it('should login successfully with correct credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "ivan@example.com",
                password: "password123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.message).toBe('Login successful');
    });
});