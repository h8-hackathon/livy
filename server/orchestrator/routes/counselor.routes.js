const { Router } = require('express')
const CounselorController = require('../controllers/counselor.controller')

const router = Router()

router.get('/status', CounselorController.getStatusCounselor)


module.exports = router
