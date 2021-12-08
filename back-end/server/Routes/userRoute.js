import express from 'express'
import * as userController from '../controllers/userController.js'
import * as AuthController from '../controllers/AuthController.js'
const userRoute=express.Router()
userRoute.route('/register').post(userController.createAccount)
userRoute.route('/login').post(AuthController.loginAccount)
userRoute.route('/:id').get(userController.getUser)
export default userRoute