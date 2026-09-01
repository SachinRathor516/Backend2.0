const postModel = require('../models/postModel')
const Imagekit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')



const imagekit = new Imagekit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req , res) {
    console.log(req.body ,req.file);

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer) , 'file'),
        fileName: 'filename',
    })

    res.send(file)
}

module.exports = {
    createPostController,
}