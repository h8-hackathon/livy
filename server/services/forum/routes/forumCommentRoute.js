const forumCommentController = require('../controllers/forumCommentController')

const router = require('express').Router()


router.get('/:commentId', forumCommentController.getCommentById)

router.put('/:commentId', forumCommentController.updateComment)
router.delete('/:commentId', forumCommentController.deleteComment)

router.put('/:commentId/helpful', forumCommentController.createHelpfulComment)
router.delete('/:commentId/helpful', forumCommentController.deleteHelpfulComment)

router.post('/:commentId/report', forumCommentController.createReportComment)




module.exports = router