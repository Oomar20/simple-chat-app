const request = require('supertest');
const { app, server } = require('../server'); // Adjust path as needed

describe('Homepage Response', () => {
    it('should return 200 OK and the HTML content', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('<button id="sendButton">Send</button>');
    });

    // Gracefully stop the server after tests
    afterAll((done) => {
        server.close(done);
    });
});

