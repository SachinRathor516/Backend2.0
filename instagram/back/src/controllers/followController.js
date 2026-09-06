const followModel = require('../models/followModel')
const userModel = require('../models/userModel')

async function followUserController(req , res) {
   const followerUsername = req.user.username
   const followeeUsername = req.params.username

   if (followeeUsername === followerUsername) {
     return res.status(400).json({
        message: `you can't follow yourself`
     })
   }

   const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
   })

   if (!isFolloweeExist) {
    return res.status(400).json({
        message: ` you trying to follow : ' ${followeeUsername} ' doesn't exist `
    })
   }

   const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
   })

   if (isAlreadyFollowing) {
    return res.status(409).json({
        message: `you are Already follow : ${followeeUsername}`
    })
   }


   const followReport = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
   })

   res.status(201).json({
    message: `you are now following : ${followeeUsername}`,
    follow: followReport
   })
   
   
}

async function unfollowUserController(req , res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isfollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!isfollowing) {
        return res.status(400).json({
            message: `you are not following : ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isfollowing._id)

    res.status(200).json({
        message: `you are now unfollowing : ${followeeUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
}