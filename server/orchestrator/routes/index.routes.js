const { Router } = require('express')
const AuthController = require('../controllers/auth.controllers')
const router = Router()
const errorMiddleware = require('../middlewares/error.middlewares')

const cmsRouter = require('./cms.routes')
const client = require('./client.routes')
const daily = require('./daily.routes')

router.post('/login', AuthController.login)
router.post('/verify', AuthController.verify)

router.use('/cms', cmsRouter)
router.use('/daily', daily)
router.use('/client', client)
router.use('/counselor', require('./counselor.routes'))
router.use(errorMiddleware)
module.exports = router
