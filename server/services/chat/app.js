
const express = require('express')
const route = require('./routes')
const app = express()
const cors = require('cors')
const errorHandling = require('./middleware/errorHandling')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(route)
app.use(errorHandling)

module.exports = app
