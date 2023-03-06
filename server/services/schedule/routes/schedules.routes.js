const SchedulesController = require('../controllers/schedules.controller')
const { Router } = require('express')

const router = Router()

router.get('/counselor/:counselorId', SchedulesController.getSchedulesByCounselorId)
router.post('/user/:userId', SchedulesController.createSchedule) // pg

router.get('/counselor/:counselorId/availability', SchedulesController.getCounselorAvailability)
router.post('/counselor/:counselorId/availability', SchedulesController.createCounselorAvailability)
router.put('/counselor/:counselorId/availability', SchedulesController.updateCounselorAvailability)
router.delete('/counselor/:counselorId/availability', SchedulesController.deleteCounselorAvailability)

router.get('/user/:userId', SchedulesController.getSchedulesByUserId) // pg
router.patch('/paid/:external_id', SchedulesController.paid)

module.exports = router
