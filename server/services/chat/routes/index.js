const Controller = require('../controllers')

const router = require('express').Router()

router.get('/chats/:userId', Controller.listChat)
router.post('/chats/:userId', Controller.createChat)

module.exports = router