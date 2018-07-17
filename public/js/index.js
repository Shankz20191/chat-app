/* eslint-disable */
const socket = io();
/* eslint-enable */

socket.on('connect', () => {
  console.log('Connected to Server.');
});

socket.on('newMessage', (message) => {
  console.log(message);
});

// socket.emit('createMessage', {
//   from: 'shashank@chat.com',
//   text: 'Hey server.',
// });
