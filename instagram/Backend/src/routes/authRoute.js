const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController')
const identifyUser = require('../middlewares/authMiddleware')

//POST /api/auth/register
authRouter.post('/register' , authController.registerController )

//POSt /api/auth/login
authRouter.post('/login', authController.loginController )

authRouter.get('/get-me' , identifyUser , authController.getMeController)


module.exports = authRouter