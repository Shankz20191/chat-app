const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('Connected to User.')
  socket.on('disconnect', () => {
    console.log('User Disconnected')
  })

  socket.emit('newMessage', {
    'from': 'someone@something.com',
    'text': 'Do something.',
    'createdAt': 14563728
  })

  socket.on('createMessage', (res) => {
    console.log(res)
  })
})

server.listen(port, () => {
  console.log(`Server started on PORT ${port}`)
})
