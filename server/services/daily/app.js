const express = require('express')
const errorHandling = require('./middleware/errorHandling')
const route = require('./routes')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(route)
app.use(errorHandling)

module.exports = app
