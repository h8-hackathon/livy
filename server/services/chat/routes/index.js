const Controller = require('../controllers')

const router = require('express').Router()

router.get('/chats/:userId', Controller.listChat)
router.get('/chats/counselor/:counselorId', Controller.listChatByCounselor)
router.post('/chats/:userId', Controller.createChat)
router.post('/chats/:userId/livy', Controller.chatWithLivy)

module.exports = router