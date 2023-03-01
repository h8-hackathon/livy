if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')
const app = express()
const cors = require('cors')

app .use(cors())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(router.use(errorHandler))


module.exports = app
