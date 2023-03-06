const { Router } = require('express')
const CounselorController = require('../controllers/counselor.controller')

const router = Router()

router.get('/status', CounselorController.getStatusCounselor)
router.post('/availability', CounselorController.editAvailability)
router.get('/availability', CounselorController.getCounselorAvailability)

router.put('/', CounselorController.updateCounselorProfile)

module.exports = router
