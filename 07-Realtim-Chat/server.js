const path = require('path');
const dotenv = require('dotenv')
const http = require('http');
const express = require('express')
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

dotenv.config({path: `${__dirname}/config/.env`})

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(`${__dirname}/public`)));

const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...');

    // welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
    
    // Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, `A user has joined the chat`));
    
    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, `A user has left the chat`));
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        // emit message to all clients
        io.emit('message', formatMessage('User', msg));
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})