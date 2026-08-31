const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


async function registerController (req , res) {

    const {username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: 'user already exist with this '+ (isUserAlreadyExist.email ==
                 email ? 'email' : 'username')
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage,
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET , {expiresIn: '1d'})

    res.cookie('token' ,token)

    res.status(201).json({
        message: 'user register successfully',
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController (req ,res) {

    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username: username},
            {email: email},
        ]
    })

    if(!user){
        return res.status(401).json({
            message: 'user not found please check the email or username'
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const isPassword = hash === user.password

    if (!isPassword) {
        return res.status(401).json({
            message: 'invalid Password'
        })
    }

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET , {expiresIn:'1d'})

    res.cookie('token' , token)

    res.status(200).json({
        message: 'user logged in successfully',
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}