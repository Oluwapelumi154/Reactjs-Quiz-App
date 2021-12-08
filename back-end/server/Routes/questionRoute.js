import express from 'express'
import * as AuthController from '../controllers/AuthController.js'
import * as questionController from '../controllers/questionController.js'
const questionRoute=express.Router()
questionRoute.route('/').get(AuthController.protect,questionController.getAllQuestions).post(questionController.createQuestion).delete(questionController.deleteAllQuestions)
export default questionRoute