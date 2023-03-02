const router = require('express').Router()
const forumPostRoute = require('./forumPostRoute')
const forumCommentRoute = require('./forumCommentRoute')
router.get('/', (req, res) => {
    res.send('HALO FROM SERVER FORUMPOST LIVY!')
  })

router.use('/posts', forumPostRoute)
router.use('/comments', forumCommentRoute)
module.exports = router