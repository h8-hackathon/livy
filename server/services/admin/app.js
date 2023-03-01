const express = require('express')
const router = require('./routes/index.routes')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

module.exports = app