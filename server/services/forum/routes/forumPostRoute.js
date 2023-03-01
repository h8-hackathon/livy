const forumPostController = require('../controllers/forumPostController')

const router = require('express').Router()

router.get('/', forumPostController.getAllPost)
router.post('/', forumPostController.createPost)
router.get('/:postId', forumPostController.getPostById)
router.put('/:postId', forumPostController.updatePostById)
router.delete('/:postId', forumPostController.deletePostById)

router.post('/:postId/comments`', forumPostController.createComment)
router.get('/:postId/comments`', forumPostController.getCommentByPostId)
// router.put('/:postId/comments`', forumPostController.deletePostById)
// router.put('/:postId/comments`', forumPostController.deletePostById)

module.exports = router