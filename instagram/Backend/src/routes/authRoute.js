const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController')

//POST /api/auth/register
authRouter.post('/register' , authController.registerController )

//POSt /api/auth/login
authRouter.post('/login', authController.loginController )


module.exports = authRouter