const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle Quill content changes
    socket.on('editor-changes', (delta) => {
        // Broadcast the changes to all connected clients except the sender
        socket.broadcast.emit('editor-changes', delta);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
