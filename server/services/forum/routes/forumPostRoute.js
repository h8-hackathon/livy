const forumPostController = require('../controllers/forumPostController')

const router = require('express').Router()

router.get('/', forumPostController.getAllPost)
router.post('/', forumPostController.createPost)
router.get('/:postId', forumPostController.getPostById)
router.put('/:postId', forumPostController.updatePostById)
router.delete('/:postId', forumPostController.deletePostById)

router.get('/:postId/comments', forumPostController.getCommentByPostId)
router.post('/:postId/comments', forumPostController.createComment)

router.put('/:postId/helpful', forumPostController.createHelpfulPost)
router.delete('/:postId/helpful', forumPostController.deleteHelpfulPost)





module.exports = router