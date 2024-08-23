const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

//schema for sighnup
// Schema for signup
const userSchema = new mongoose.Schema({
    fullName:       {type: String,required: [true, 'Please enter your full name']},

    userName:       {type: String,required: [true, 'Please enter your username']},

    phoneNumber:    {type: Number,required: [true, 'Please enter your phone number']},

    gender:         {type: String, required:[true, 'Please Tell us your gender']},

    email:          {type: String,required: [true, 'Please enter your email'], unique:[true, 'Email already in use']},

    password:       {type: String,required: [true, 'Please enter a password']},

    confirmPassword:{type: String,required: [true, 'Please confirm your password']}
});
 userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password =await bcrypt.hash(this.password, 12)

    this.confirmPassword = undefined;

    next()
 })

const User = mongoose.model(('createdusers'), userSchema);

module.exports = User;