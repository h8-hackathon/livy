const forumCommentController = require('../controllers/forumCommentController')

const router = require('express').Router()


router.put('/:commentId', forumCommentController.updateComment)
router.delete('/:commentId', forumCommentController.deleteComment)

router.put('/:commentId/helpful', forumCommentController.createHelpfulComment)
router.delete('/:commentId/helpful', forumCommentController.deleteHelpfulComment)




module.exports = router