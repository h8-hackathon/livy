const { Router } = require('express')
const AuthController = require('../controllers/auth.controllers')

const router = Router()

router.post('/login', AuthController.login)
router.post('/verify', AuthController.verify)

module.exports = router
