const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending index.html:', err.message);
      res.status(500).send('Internal Server Error');
    }
  });
});

// HTTP Server
const server = http.createServer(app);

// WebSocket Server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(message); // Echo back
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

// Export app and server for testing
module.exports = { app, server };

