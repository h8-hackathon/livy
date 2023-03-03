const UserController = require('../controllers/user.controller')
const authentication = require('../middlewares/authentication')
const { authorizationOnlyOwnAndAdmin, authorizationOnlyAdmin } = require('../middlewares/autorization')
const router = require('express').Router()

router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUserParamId)
router.post('/users', UserController.postUsers)
router.put('/users/:id',authentication, authorizationOnlyOwnAndAdmin, UserController.putUsers)
router.delete('/users/:id', authentication, authorizationOnlyOwnAndAdmin, UserController.deleteUsers)
router.patch('/users/:id', authentication, authorizationOnlyOwnAndAdmin, UserController.patchUsers)
router.post('/verify', UserController.verify)
router.put('/counselor/:id/submissions', authentication, authorizationOnlyAdmin, UserController.putCounselorIdSubmissions)
router.post('/users/admin', UserController.postUsersAdmin)

module.exports = router