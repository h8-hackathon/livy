const ForumPost = require('./models/ForumPost')
const ForumComment = require('./models/ForumComment')
const Chat = require('./models/Chat')
const Todo = require('./models/Todo')
const Availability = require('./models/Availability')

const { connect, disconnect } = require('./config/db')

module.exports = {
  connect,
  disconnect,
  ForumPost,
  ForumComment,
  Chat,
  Todo,
  Availability,
}
