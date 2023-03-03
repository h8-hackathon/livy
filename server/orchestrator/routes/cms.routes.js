const { Router } = require('express')
const router = Router()
const CMSController = require('../controllers/cms.controller')


router.get('/',(req,res)=>res.send("CMS ORCHESTRATOR"))
router.get('/posts',CMSController.getAllPost)

module.exports = router
