const mongoose = require('mongoose')
const validator = require('validator') 
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please enter Your name'],

    },
    email:{
        type: String,
        require:[true, 'please enter your email'],
        validate:[validator.isEmail, 'Please input a valid email'],
        unique:true,
        lowercase:true

    },
    photo: String,

    password:{
        type: String,
        required:[true, 'Please enter a password'],
        minlength:[7, 'password must be more than 7 characters']
    },
    confirmPassword:{
        type: String,
        required:[true, 'Please Confirm Your Password'],

        validate:{
            validator: function(val){
                val == this.password
            },
            
            message: 'password & confirm password doesnt match'
        }
    }
})
const User = mongoose.model(('User'), userSchema);
module.exports = userSchema;