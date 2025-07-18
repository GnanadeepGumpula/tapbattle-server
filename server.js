const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(bodyParser.json());

// ✅ Webhook from Google Sheets
app.post('/webhook', (req, res) => {
  console.log('Google Sheets Update:', req.body);

  // Broadcast update to all clients
  io.emit('sheet-update', req.body);

  res.status(200).send('OK');
});

// ✅ Test route
app.get('/', (req, res) => res.send('Webhook Server Running!'));

// ✅ WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
