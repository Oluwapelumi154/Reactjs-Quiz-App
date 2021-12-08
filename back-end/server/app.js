import express from 'express'
import dotenv from 'dotenv'
import userRoute from './Routes/userRoute.js'
import questionRoute from './Routes/questionRoute.js'
import AppError from './utils/AppError.js'
import errorHandler from './controllers/errorController.js'
import optionsRouter from './Routes/optionsRoute.js'
const app=express()
//Configuring environmnent file
dotenv.config({path:'./config.env'})
//MIDDLEWARES
app.use(express.json())
console.log(process.env.NODE_ENV)

//Routes middleware
app.use('/api/v1/users',userRoute)
app.use('/api/v1/questions',questionRoute)
app.use('/api/v1/options',optionsRouter)
//Error handling middlewares
app.all('*',(req,res,next)=>{
 next(new AppError(`Can't find ${req.originalUrl} on this server`,404))
   })
app.use(errorHandler)
export default app