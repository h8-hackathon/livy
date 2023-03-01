const { Router } = require('express')
const schedules = require('./schedules.routes')
const router = Router()

router.use('/schedules', schedules)

module.exports = router
