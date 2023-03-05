const app = require('../app')
const { Server } = require('socket.io')

const http = require('http')
const server = http.createServer(app)

const io = new Server(server, {
  cors: '*',
})

io.on('connection', (socket) => {
  socket.on('join', (room, cb) => {
    socket.join(room)
    if(typeof cb === 'function') cb()
  })

  socket.on('message', (room, message) => {
    io.to(room).emit('message', message)
  })


})

module.exports = { io, server }
