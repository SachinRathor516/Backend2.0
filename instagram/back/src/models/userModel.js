const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: [true , 'username is required'],
            unique: [true , 'user already exist with this email'],
        },
        email:{
            type: String,
            required: [true , 'email is required'],
            unique: [true , 'user already exist with this email'],
        },
        password:{
            type: String,
            required: [true , 'password is required']
        },
        bio: String,

        profileImage:{
            type: String,
            default: 'https://ik.imagekit.io/wtb3p0fvu/default_image.avif?updatedAt=1774166409247'
        }
    }
)

const userModel = mongoose.model('user' , userSchema)

module.exports = userModel