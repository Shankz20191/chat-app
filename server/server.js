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
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to our chat room.'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat room.'));

  socket.on('createMessage', (message) => {
    console.log(message);

    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });
});

server.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
