const request = require('supertest');

const server = require('../api/server');

describe("jokes router", function() {
    it("should run the tests", function() {
        expect(true).toBe(true)
    })
})

it("should return JSON formatted body", function() {
    return request(server)
    .get("/api/jokes")
    .then(res => {
        expect(res.type).toMatch(/json/);
    })
})