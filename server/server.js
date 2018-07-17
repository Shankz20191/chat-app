const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('Connected to User.');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to our chat room.'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat room.'));

  socket.on('createMessage', (message, callback) => {
    console.log(message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from server.');
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
