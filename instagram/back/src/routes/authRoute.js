const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController')


authRouter.post('/register' , authController.registerController )

authRouter.post('/login' , authController.loginController )


module.exports = authRouter