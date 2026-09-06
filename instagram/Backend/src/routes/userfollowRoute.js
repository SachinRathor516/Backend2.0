const express = require('express')
const userfollowRouter = express.Router()
const userfollowController = require('../controllers/userfollowController')
const identifyUser = require('../middlewares/authMiddleware')

//POST /api/user/follow/:username
userfollowRouter.post('/follow/:username' ,identifyUser , userfollowController.followUserController )

//POST /api/user/unfollow/:username
userfollowRouter.post('/unfollow/:username', identifyUser , userfollowController.unfollowUserController)

module.exports = userfollowRouter