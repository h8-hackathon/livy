const { Router } = require('express')
const router = Router()
const CMSController = require('../controllers/cms.controller')


router.get('/',(req,res)=>res.send("CMS ORCHESTRATOR"))
router.get('/posts',CMSController.getAllPost)
router.post('/posts',CMSController.createPost)
router.get('/posts/:id',CMSController.getPostById)
router.put('/posts/:id',CMSController.updatePost)

module.exports = router
