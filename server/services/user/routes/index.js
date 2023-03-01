const UserController = require('../controllers/user.controller')
const router = require('express').Router()

router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUserParamId)
router.post('/users', UserController.postUsers)
router.put('/users/:id', UserController.putUsers)
router.delete('/users/:id', UserController.deleteUsers)
router.patch('/users/:id', UserController.patchUsers)

module.exports = router