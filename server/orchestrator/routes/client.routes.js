const { Router } = require('express')
const ClientController = require('../controllers/client.controllers')

const router = Router()

router.get('/home', ClientController.getHome)
router.get('/counselors', ClientController.getAllCounselor)
router.get('/counselors/:counselorId', ClientController.getCounselorByid)

router.get('/schedule', ClientController.getSchedule) //!
router.post('/schedule', ClientController.createSchedule) //!

router.get('/chatLivy', ClientController.getChatWithLivy)
router.get('/chat/:counselorId', ClientController.getChatByCounselorId)
router.post('/chatLivy', ClientController.chatWithLivy)

router.get('/forum/top', ClientController.getForumTop)
router.get('/forum/new', ClientController.getForumNew)
router.post('/forum/post', ClientController.createForumPost)
router.get('/forum/post/:postId', ClientController.getForumPostById)
router.post('/forum/post/:postId', ClientController.createComment)
router.delete('/forum/post/:postId', ClientController.deleteForumPostById)
router.put('/forum/post/:postId', ClientController.updateForumPostById)

router.put('/forum/post/:postId/helpful', ClientController.createHelpfulPost)
router.post('/forum/post/:postId/report', ClientController.createReportPost)

router.get('/forum/comment/:postId', ClientController.getForumCommentByPostId)
router.put('/forum/comment/:commentId/helpful', ClientController.createHelpfulComment)
router.post('/forum/comment/:commentId/report', ClientController.createReportComment)

router.post('/callback',ClientController.callback)

module.exports = router
