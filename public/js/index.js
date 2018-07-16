var socket = io()

socket.on('connect', function () {
  console.log('Connected to Server.')
})

socket.on('disconnect', function () {
  console.log('Disconnecte from Server.')
})

socket.on('newMessage', function (res) {
  console.log(res)
})

socket.emit('createMessage', {
  'from': 'shashank@chat.com',
  'text': 'Hey server.'
})
