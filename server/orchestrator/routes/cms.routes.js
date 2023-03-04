const { Router } = require('express')
const router = Router()
const CMSController = require('../controllers/cms.controller')


router.get('/',(req,res)=>res.send("CMS ORCHESTRATOR"))
router.get('/posts',CMSController.getAllPost)
router.post('/posts',CMSController.createPost)
router.get('/posts/:id',CMSController.getPostById)
router.put('/posts/:id',CMSController.updatePost)
router.delete('/posts/:id',CMSController.deletePost)

router.get('/counselor', CMSController.getAllCounselor)
router.patch('/counselor/:submissionId', CMSController.acceptCounselor)
router.delete('/counselor/:submissionId', CMSController.rejectCounselor)

router.get('/forumreport', CMSController.getForumReport)

router.get('/forumreport/posts/ignore/:postId', CMSController.ignoreReportedPost)
router.get('/forumreport/comments/ignore/:commentId', CMSController.ignoreReportedComment)

router.delete('/forumreport/posts/:postId', CMSController.deleteReportedPost)
router.delete('/forumreport/comments/:commentId', CMSController.deleteReportedComment)

router.get('/admin', CMSController.getAllAdmin)
router.post('/admin', CMSController.createAdmin)
router.get('/admin/:id', CMSController.getAdminById)
router.put('/admin/:id', CMSController.updateAdmin)
router.delete('/admin/:id', CMSController.deleteAdmin)




module.exports = router
