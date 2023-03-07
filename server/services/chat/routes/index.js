
const Controller = require('../controllers')

const router = require('express').Router()

router.get('/chats/:userId', Controller.listChat)
router.post('/chats/:userId', Controller.createChat)
router.get('/history/:userId/:counselorId', Controller.listChatByUserAndCounselor)
router.get('/chats/counselor/:counselorId', Controller.listChatByCounselor)
router.post('/chats/:userId/livy', Controller.chatWithLivy)
router.get('/chats/:userId/livy', Controller.getChatWithLivy)

module.exports = router