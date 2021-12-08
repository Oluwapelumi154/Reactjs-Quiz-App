import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true, match: [/.+\@.+\..+/, 'Please provide a valid email address'],
},
    password:{type:String,required:true,select:false,minLength:8},
    passwordConfirm:{type:String,minLength:8,validate:{ validator:function(confirmPassword){return confirmPassword===this.password}}}
})
userSchema.methods.comparePassword= async function(candidatePassword,storedDbpassword){
    return await bcrypt.compare(candidatePassword,storedDbpassword)
}
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    this.passwordConfirm=undefined
   return next()
})

const Users=mongoose.model('Users',userSchema)
export default Users
