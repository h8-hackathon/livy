const { userAPI } = require('../helpers/axios')
const { io } = require('./index')

io.use(async (socket, next) => {
  try {
    const { access_token } = socket.handshake.auth
    if (!access_token) {
      return next(new Error('Authentication error'))
    }

    const { data: user } = await userAPI.post('/verify', { access_token })
    socket.user = user
  } catch (error) {
    next(error)
  }
})

io.sockets.on('connection', function (socket) {
  socket.on('enter:chat', function (room) {
    // TODO: check if the room is available
    const [userId, conselorId] = room.split(':')
    if (userId !== socket.user.id && conselorId !== socket.user.id) {
      return socket.emit('error', 'You are not allowed to join this room')
    }
    socket.join(room)
    socket.to(room).emit('joined', socket.user.name)
  })

  socket.on('leave:chat', function (room) {
    socket.leave(room)
    socket.to(room).emit('left', socket.user.name)
  })
})
