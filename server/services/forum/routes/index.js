const router = require('express').Router()
const forumPostRoute = require('./forumPostRoute')
router.get('/', (req, res) => {
    res.send('HALO FROM SERVER FORUMPOST LIVY!')
  })

router.use('/posts', forumPostRoute)
module.exports = router