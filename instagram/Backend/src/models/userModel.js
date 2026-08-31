const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, 'user already exist with this username'],
            required: [true, 'username is required']
        },
        email: {
            type: String,
            unique: [true, 'user already exist with this email'],
            required: [true, 'email is required']
        },
        password: {
            type: String,
            required: [true, 'password is required']
        },
        bio: String,
        profileImage: {
            type: String,
            default: 'https://ik.imagekit.io/wtb3p0fvu/default_image.avif?updatedAt=1774166409247'
        }
    }
)

const userModel = mongoose.model('users', userSchema)

module.exports = userModel