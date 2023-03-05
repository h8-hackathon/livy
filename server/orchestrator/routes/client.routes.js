const { Router } = require('express')
const ClientController = require('../controllers/client.controllers')

const router = Router()

router.get('/home', ClientController.getHome)
router.get('/counselors', ClientController.getAllCounselor)
router.get('/schedule', ClientController.getSchedule)

router.get('/chatLivy', ClientController.getChatWithLivy)
router.post('/chatLivy', ClientController.chatWithLivy)

module.exports = router
