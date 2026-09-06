const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/postController')
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require('../middlewares/authMiddleware')


//POST /api/posts
postRouter.post('/', upload.single('image') ,identifyUser, postController.createPostController )

//GET /api/posts
postRouter.get('/' ,identifyUser, postController.getPostController )

//GET /api/posts/details/:postId
postRouter.get('/details/:postId' ,identifyUser, postController.getPostDetailsController)


//POST /api/posts/like/:postId
postRouter.post('/like/:postId' , identifyUser , postController.likePostController)


module.exports = postRouter