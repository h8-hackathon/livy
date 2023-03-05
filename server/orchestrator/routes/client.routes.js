const { Router } = require('express')
const ClientController = require('../controllers/client.controllers')

const router = Router()

router.get('/home', ClientController.getHome)

module.exports = router
