const express = require('express')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())


const authRouter = require('./routes/authRoute')
const postRouter = require('./routes/postRoute')
const userfollowRouter = require('./routes/userfollowRoute')

app.use('/api/auth' , authRouter)
app.use('/api/posts', postRouter)
app.use('/api/user' , userfollowRouter)

module.exports = app