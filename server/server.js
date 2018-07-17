const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  // socket.emit('newMessage', {
  //   from: 'someone@something.com',
  //   text: 'Do something.',
  //   createdAt: 14563728,
  // });
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to Chat App',
    createdAt: new Date().getTime(),
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New Tab Join in Chat App',
    createdAt: new Date().getTime(),
  });

  socket.on('createMessage', (message) => {
    console.log(message);
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime(),
    // });

    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
  });
});

server.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
