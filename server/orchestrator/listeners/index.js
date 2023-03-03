const app = require('../app')
const { Server } = require('socket.io')

const http = require('http')
const server = http.createServer(app)

const io = new Server(server)

module.exports = { io, server }
