const express = require('express')
const cors = require('cors')
const router = require('./routes/index.routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

module.exports = app
