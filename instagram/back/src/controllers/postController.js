const Imagekit = require('@imagekit/nodejs')
const postModel = require('../models/postModel')




const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
   

    const userId = req.user.id

    const file = await imagekit.files.upload({
        file: await Imagekit.toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'testfile',
        folder: 'back-insta'
    })


    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: userId
    })

    res.status(201).json({
        message: 'post created successfully',
        post
    })

}


async function getPostController(req , res) {
    

    const userId = req.user.id
    const posts = await postModel.find({user: userId})

    res.status(200).json({
        message: 'posts fetched successfully',
        posts
    })
}


async function getPostDetailsControllers(req , res) {
    

   const userId =  req.user.id
   const postId = req.params.postId

   const post = await postModel.findById(postId)

   if (!post) {
    return res.status(404).json({
        message: 'post not found'
    })
   }

   const isValideUser = post.user.toString()=== userId

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
    getPostDetailsControllers,
}