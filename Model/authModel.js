const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { date } = require('joi');

//schema for sighnup
// Schema for signup
const userSchema = new mongoose.Schema({
    fullName:       {type: String,required: [true, 'Please enter your full name']},

    userName:       {type: String,required: [true, 'Please enter your username']},

    phoneNumber:    {type: Number,required: [true, 'Please enter your phone number']},

    gender:         {type: String, required:[true, 'Please Tell us your gender']},

    email:          {type: String,required: [true, 'Please enter your email'], unique:[true, 'Email already in use']},

    role:           {type:String,enum:['user',,'doctor']},

    password:       {type: String,required: [true, 'Please enter a password'], select:false},

    confirmPassword:{type: String,required: [true, 'Please confirm your password']},

    changedPasswordAT:Date
});
 userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password =await bcrypt.hash(this.password, 12)

    this.confirmPassword = undefined;

    next()
 })

 userSchema.methods.comparePasswordInDB = async function(pswd,pswddb) {
   return await bcrypt.compare(pswd,pswddb)
 }

 userSchema.methods.isChangedPassword =async function(JWTTIMESTAMP) {
  console.log("changed password????")
 if (this.changedPasswordAT){
  const ptwdChangedTimeStamp = parseInt(this.changedPasswordAT.getTime() / 1000,10)
    console.log(ptwdChangedTimeStamp, JWTTIMESTAMP)

    return   JWTTIMESTAMP < ptwdChangedTimeStamp

 }
 return false
 }

const User = mongoose.model(('createdusers'), userSchema);

module.exports = User;