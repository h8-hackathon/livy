const Controller = require('../controllers')

const router = require('express').Router()

router.post('/todos', Controller.createTodo)
router.get(`/todos/:userId`, Controller.findById)
router.put('/todos/:userId', Controller.updateTodo)
router.delete('/todos/:userId', Controller.deleteTodo)

module.exports = router