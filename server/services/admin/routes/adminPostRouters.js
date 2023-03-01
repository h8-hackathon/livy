const adminPostRouters = require('express').Router();
const adminPostControllers = require('../controllers/adminPostControllers');

adminPostRouters.get('/', adminPostControllers.readPosts);

adminPostRouters.post('/', adminPostControllers.createPost);

adminPostRouters.get('/:id', adminPostControllers.readPostById);

adminPostRouters.put('/:id', adminPostControllers.updatePostById);

adminPostRouters.delete('/:id', adminPostControllers.deletePostById);

module.exports = adminPostRouters;
