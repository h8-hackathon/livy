const { connect, getDb, disconnect } = require('../config/db')

const main = async () => {
  await connect()

  const db = getDb()

  await db.dropCollection('ForumPosts')
  await db.dropCollection('ForumComments')

  await db.dropCollection('Chats')
  await db.dropCollection('Todos')

  await disconnect()
}

main()
