const server = require('../app.js');
const request = require('supertest');


describe('Test server is running', () => {
    describe('Get /sanity', () => {
        it('Should return 200 ok', async () => {
            const res = await request(server).get('/sanity')
            expect(res.status).toBe(200)
         });
    });
});