const SchedulesController = require('../controllers/schedules.controller')
const { Router } = require('express')

const router = Router()

router.get('/counselor/:counselorId', SchedulesController.getSchedulesByCounselorId)
router.get('/user/:userId', SchedulesController.getSchedulesByUserId)

module.exports = router
