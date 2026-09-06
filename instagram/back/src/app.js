const express = require('express')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/authRoute')
const postRouter = require('./routes/postRoute')
const followRouter = require('./routes/followRoute')

app.use('/api/auth' , authRouter)
app.use('/api/posts/', postRouter)
app.use('/api/user/' , followRouter)

module.exports = app