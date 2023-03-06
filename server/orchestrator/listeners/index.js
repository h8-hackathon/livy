const app = require('../app')
const { Server } = require('socket.io')

const http = require('http')
const { userAPI, chatAPI } = require('../helpers/axios')
const server = http.createServer(app)

const io = new Server(server, {
  cors: '*',
})

io.use((socket, next) => {
  console.log(socket.handshake.auth)
  const { access_token } = socket.handshake.auth
  if (access_token) {
    socket.access_token = access_token
    next()
  }
})

io.on('connection', (socket) => {
  socket.on('join', (room, cb) => {
    socket.join(room)
    if (typeof cb === 'function') cb()
  })

  socket.on('message', async (room, message) => {
    if (socket.access_token) {
      try {
        const { data: user } = await userAPI.post('/verify', {
          access_token: socket.access_token,
        })
        message.sender = { UserId: user.id, name: user.name }
        io.to(room).emit('message', message)
        const [counselorId, userId] = room.split('-')
        await chatAPI.post(`/chats/${userId}`, {
          counselorId: +counselorId,
          chat: { text: message.text, sender: message.sender },
        })
      } catch (error) {
        console.log(error)
      }
    }
  })
})

module.exports = { io, server }
