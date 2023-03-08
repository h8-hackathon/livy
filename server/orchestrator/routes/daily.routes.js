const { Router } = require('express')
const CounselorController = require('../controllers/counselor.controller')
const DailyController = require('../controllers/daily.controllers')

const router = Router()

router.post('/todos',  DailyController.postTodos)
router.get('/todos/:userId',  DailyController.getTodos)
router.put('/todos/:userId',  DailyController.updateTodos)
router.delete('/todos/:userId',  DailyController.deleteTodos)

module.exports = router
