const express = require('express')
const followRouter = express.Router()
const identifyUser = require('../middleware/authMiddleware')
const followController = require('../controllers/followController')


//POST /api/user/follow/:username
followRouter.post('/follow/:username' , identifyUser , followController.followUserController )


//POST /api/user/follow/:username
followRouter.post('/unfollow/:username' , identifyUser , followController.unfollowUserController)

module.exports = followRouter