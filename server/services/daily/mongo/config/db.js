const { MongoClient } = require('mongodb')
/* istanbul ignore file */
let DATABASE_URL, DATABASE_NAME

if (process.env.NODE_ENV === 'production') {
  DATABASE_URL = process.env.MONGODB_DATABASE_URL
  DATABASE_NAME = process.env.MONGODB_DATABASE_NAME
} else {
  DATABASE_URL = 'mongodb://0.0.0.0:27017/'
  DATABASE_NAME = 'livy_mongodb_development'
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
