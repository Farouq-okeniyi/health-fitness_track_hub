//requiring path
const path = require('path');
const bcrypt = require('bcrypt')
const user = require('./../Model/authModel')
const jwt = require('jsonwebtoken');
const {userValidationSchema} = require('./../Model/validationModel')
const {loginvalidation} = require('../Model/loginValidationModel')
const axios = require('axios');
const util = require('util');
const CustomError = require('../Utility/CustomError');


const signToken = id =>{
    return jwt.sign({id}, process.env.SECRET_STR, {expiresIn: process.env.EXPIRES_IN})
}
//function to display hmepage

const getHomepage = function(req,res){
    try {
        // res.sendFile(path.join(__dirname, '../Views/htmlFiles/index.ejs'));
        res.render('htmlFiles/index');
        
        
    } catch (error) {
        res.status(400)

    }

}
// function to display sighup page

const getSighupPage = function(req,res){
   try {

    // res.sendFile(path.join(__dirname, '../Views/htmlFiles/signup.html'));
    res.render('htmlFiles/signup');
   } catch (error) {
    
   }
}
const  getLoginpage = function(req,res){
   try {
    // res.sendFile(path.join(__dirname, '../Views/htmlFiles/login.html'));
    res.render('htmlFiles/login');

   } catch (error) {
    
   }
}

const getDashBoard = function(req, res) {
    try {
        res.render('htmlFiles/dashboard', { user }); // Pass the user object to the EJS template

    } catch (error) {

        console.log('Error:', error);

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
            const error = new CustomError('incorrect Login Details',401)
            next(error)
        }

        const token = signToken(User._id);

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({
            status: 'success',
            user: User
        })
    } catch (error) {
        const err = new CustomError('an Error occured, please try again later', 500)
            next(err)
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
            const error = new CustomError('Email already Exists',422)
            next(error)
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
        const error = new CustomError('SOrry, Pkease try again later', 500)
            next(error)

    };}

    const protect = async function(req,res,next){
        const token = req.cookies.token;

        console.log('Token from cookie:', token);
        if (!token) {
            const error = new CustomError('Not authorized, token missing or invalid', 401)
            next(error)
        }
        
        try {

            // Verify the token and extract the payload
            const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
            
            // Attach the user data to the request object for further use in the route
            console.log(decodedToken)
            // Proceed to the next middleware or route handler
            const User = await user.findById(decodedToken.id)
            const passwordISChanged = await User.isChangedPassword(decodedToken.iat)
            console.log(passwordISChanged)
            if(!User){
                const error = new CustomError('the user with given TOken does not exist', 401)
                next(error)
            }
            if(passwordISChanged){
                return res.status(401).json({
                    status: 'error',
                    message: 'Password changed recently, please Login again'
                
                });

            }
            req.user = user
            next();
        } catch (error) {
            const err = new CustomError('Not authorized, token invalid', 401)
            next(err)
        }
        next();
    }

    const restrict = (role)=>{
            return (res,req,next)=>{
                if(req.user.role!== role){
                    const err = new CustomError('Sorry! you are not permitted to perfrom this action', 403)
                     next(err)
                }
            }
            next()
    }
module.exports={
    getHomepage,

    getSighupPage,

    getLoginpage,

    getDashBoard,

    logUserIn,

    sighUserup,

    protect,

    restrict,

}