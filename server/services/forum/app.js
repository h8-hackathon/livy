/* istanbul ignore file */
if(process.env.NODE_ENV !== 'production') {
    require('dotenv/config')
  }
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
let errorMiddlewares = require('./middlewares/errorMiddlewares')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(router)
app.use(errorMiddlewares)


module.exports = app