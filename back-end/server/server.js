import mongoose from 'mongoose'
import app from './app.js'
mongoose.connect('mongodb://127.0.0.1:27017/Quiz-App').then(()=>{
    console.log('Connected to the Database')
}).catch(err=>{
    console.log('Not Connected',err)
})
const Port=process.env.PORT || 7000
app.listen(Port,()=>{
console.log(`Application running on port ${Port}`)
})