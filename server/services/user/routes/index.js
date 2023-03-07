const UserController = require('../controllers/user.controller')
const router = require('express').Router()

router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUserParamId)
router.post('/users', UserController.postUsers)
router.post('/users/test', UserController.postUsersTest) 
router.put('/users/:id', UserController.putUsers)
router.delete('/users/:id', UserController.deleteUsers)
router.patch('/users/:id', UserController.patchUsers)
router.post('/verify', UserController.verify)
router.put('/counselor/:id/submissions', UserController.putCounselorIdSubmissions)
router.post('/users/admin', UserController.postUsersAdmin)

module.exports = router