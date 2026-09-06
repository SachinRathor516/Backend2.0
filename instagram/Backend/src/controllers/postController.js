const postModel = require('../models/postModel')
const Imagekit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')


const imagekit = new Imagekit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req , res) {
  
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer) , 'file'),
        fileName: 'test',
        folder: 'instagram' 
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        userId: req.user.id
    })

    res.status(201).json({
        message: 'post created successfully',
        post
    })

}

async function getPostController(req ,res) {
   

    const userId = req.user.id

    const posts = await postModel.find({
        userId: userId
    })

    res.status(200).json({
        message: 'posts fetched successfully',
        posts
    })
    
    
}

async function getPostDetailsController(req ,res ) {
   

    const userId = req.user.id
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