//requiring path
const path = require('path');
const bcrypt = require('bcrypt')
const user = require('./../Model/authModel')
const jwt = require('jsonwebtoken');
const {userValidationSchema} = require('./../Model/validationModel')
const {loginvalidation} = require('../Model/loginValidationModel')


const signToken = id =>{
    return jwt.sign({id}, process.env.SECRET_STR, {expiresIn: process.env.EXPIRES_IN})
}
//function to display hmepage

const getHomepage = function(req,res){
    try {
        res.sendFile(path.join(__dirname, '../Views/htmlFiles/index.html'));
        
    } catch (error) {
        res.status(400)

    }

}
// function to display sighup page

const getSighupPage = function(req,res){
   try {

    res.sendFile(path.join(__dirname, '../Views/htmlFiles/signup.html'));
   } catch (error) {
    
   }
}
const  getLoginpage = function(req,res){
   try {
    res.sendFile(path.join(__dirname, '../Views/htmlFiles/login.html'));

   } catch (error) {
    
   }
}

const getDashBoard = function(req, res) {
    try {
        res.sendFile(path.join(__dirname, '../Views/htmlFiles/dashboard.html'));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while loading the dashboard. Please try again later.'
        });
    }
};
const logUserIn = async function(req, res, next) {
    try {
        const { error, value } = loginvalidation.validate(req.body, { abortEarly: false });
        if (error) {
            console.log(error);
            return res.status(400).json({
                status: 'fail',
                message: error.details.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {})
            });
        }

        const { email, password } = req.body;
        const User = await user.findOne({ email }).select('+password');
        const isMatch = await User.comparePasswordInDB(password, User.password);

        if (!isMatch || !User) {
            return res.status(422).json({
                status: 'fail',
                message: `Incorrect Login Information`
            });
        }

        const token = signToken(User._id);

        res.status(201).json({
            status: 'success',
            token,
            
            user: User
            
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred. Please try again later.'
        });
    }
};  
const sighUserup =async function(req, res, next){
        // Validate the request body against the Joi schema
        try{
            const { error, value } = userValidationSchema.validate(req.body, { abortEarly: false });

            if (error) {
            // If validation fails, return a 422 response with the error details
            return res.status(422).json({
                status: 'fail',
                errors: error.details.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {})
            });
        }
        const email = req.body.email;
        const CheckEMail = await user.findOne({email: email});

        if(CheckEMail){
            return res.status(422).json({
                status:'fail',
                message:'Email Already Exists'
            })
        }
        // If validation passes, proceed to create the user
        const User = await user.create(value);

        const token = signToken(User._id)
        res.status(201).json({
            status: 'success',
            token,
            user: User
        });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred. Please try again later.'
        });

    };}
module.exports={
    getHomepage,

    getSighupPage,

    getLoginpage,

    getDashBoard,

    logUserIn,

    sighUserup

}