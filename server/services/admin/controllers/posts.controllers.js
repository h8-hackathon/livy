const { AdminPost } = require('../models')

class PostsController {
  static async getPosts(req, res) {
    const posts = await AdminPost.findAll()
    res.json(posts)
  }

  static async createPost(req, res) {
    const post = await AdminPost.create(req.body)
    res.status(201).json(post)
  }
}

module.exports = PostsController
