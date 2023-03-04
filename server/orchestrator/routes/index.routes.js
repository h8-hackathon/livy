const { Router } = require('express')
const AuthController = require('../controllers/auth.controllers')
const router = Router()

const cmsRouter = require('./cms.routes')

router.post('/login', AuthController.login)
router.post('/verify', AuthController.verify)

router.use('/cms', cmsRouter)

module.exports = router
