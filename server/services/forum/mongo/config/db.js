const { MongoClient } = require('mongodb')

let DATABASE_URL, DATABASE_NAME

if (process.env.NODE_ENV === 'production') {
  DATABASE_URL = process.env.MONGODB_DATABASE_URL
  DATABASE_NAME = process.env.MONGODB_DATABASE_NAME
} else {
  DATABASE_URL = 'mongodb://livy:2236861b4c8f6ca1d6c86fb7fbccca8e@5.78.81.54:27017/livy'
  DATABASE_NAME = 'livy'
}

const client = new MongoClient(DATABASE_URL)

const connect = async () => {
  try {
    await client.connect()
    console.log('Connected to database')
  } catch (error) {
    console.log(error)
  }
}

const disconnect = async () => {
  try {
    await client.close()
    console.log('Disconnected from database')
  } catch (error) {
    console.log(error)
  }
}

const getDb = () => {
  return client.db(DATABASE_NAME)
}

module.exports = {
  connect,
  disconnect,
  getDb,
}
