const request = require('supertest');

const server = require('../api/server');

describe('auth router', function() {
    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.NODE_ENV).toBe('test')
        })
    })

    describe('add()', function() {
        beforeEach( async () => {
            await db('jokes').truncate();
        })
    })

    describe('Register', () => {
        it('should add the created user', async() => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({username: "Testing4", password: "asdf1234"})
                expect(res.status).toBe(200)
        })
        it('should fail when trying to add the same user twice', async() => {
            const res = await request(server)
            .post('/api/auth/register')
            .send({username: "Testing4", password: "asdf1234"})
            expect(res.status).toBe(500)
        })
    })

    describe('Login', () => {
        it('should login when provided valid credentials', async() => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({username: "testing", password: "asdf1234"})
                expect(res.status).toBe(200)
        })

        it('should fail to login when provided invalid credentials', async() => {
            const res = await request(server)
            .post('/api/auth/login')
            .send({username: "NotAnAccount", password: "NotAPassword"})
            expect(res.status).toBe(400)
        })
    })
})