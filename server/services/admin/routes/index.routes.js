const { Router } = require('express')
const PostsController = require('../controllers/posts.controllers')

const router = Router()

router.get('/posts', PostsController.getPosts)
router.post('/posts', PostsController.createPost)

module.exports = router
