const request = require('supertest');
const { app, server } = require('../server'); // Adjust the path if needed

describe('Content Validation', () => {
    afterAll((done) => {
        server.close(done); // Ensure the server is closed after tests
    });

    it('should contain a specific title in the HTML', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200); // Ensure the route is accessible
        expect(response.text).toContain('<title>WebSocket Chat</title>'); // Validate the title
    });

    it('should contain a button with specific text', async () => {
        const response = await request(app).get('/');
        expect(response.text).toContain('<button id="sendButton">Send</button>'); // Validate the header
    });

    it('should load the CSS file', async () => {
        const response = await request(app).get('/style.css');
        expect(response.statusCode).toBe(200); // Ensure CSS file is served
        // expect(response.text).toContain('body {'); // Validate content from your CSS file
        expect(response.text).toContain('.message-container {'); // Validate content from your CSS file
    });
});
