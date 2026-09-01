const postModel = require('../models/postModel')
const Imagekit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')


const imagekit = new Imagekit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req , res) {
    const token = req.cookies.token
    
    if (!token) {
        return res.status(401).json({
            message: 'token not provided , unauthorised access'
        })
    }

    let decoded = null
    
    try {
          decoded = jwt.verify(token , process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token , user not authorised'
        })
    }
    

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer) , 'file'),
        fileName: 'test',
        folder: 'instagram' 
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        userId: decoded.id
    })

    res.status(201).json({
        message: 'post created successfully',
        post
    })

}

async function getPostController(req ,res) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: 'token not provided , unauthorised access'
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token , process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token , user not authorised'
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        userId: userId
    })

    res.status(200).json({
        message: 'posts fetched successfully',
        posts
    })
    
    
}

async function getPostDetailsController(req ,res ) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: 'token not provided , unauthorised access'
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token , process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: 'invalid token , user not authorised'
        })
    }

    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: 'post not found'
        })
    }

    const isValideUser = post.userId.toString() === userId

    if (!isValideUser) {
        return res.status(403).json({
            message: 'forbidden content'
        })
    }

    res.status(200).json({
        message: 'post details fetched successfully',
        post
    })


}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
}