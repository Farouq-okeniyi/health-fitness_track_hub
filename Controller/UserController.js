//requiring path
const path = require('path');
const bcrypt = require('bcrypt')
const user = require('./../Model/authModel')
const jwt = require('jsonwebtoken');
const {userValidationSchema} = require('./../Model/validationModel')
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
const checkIn =async function(req, res) {
    try {
        const Userpassword = req.body.password;

        const hashUserpassword = await bcrypt.hash(Userpassword,12)

        console.log(hashUserpassword);

        res.status(200).json({
            status: 'successful',

            password: hashUserpassword // Returning the received password

        });
    } catch (error) {
        res.status(400).json({

            status: 'unsuccessful',

            message: error.message

        });
    }
};

const sighUserup =async function(req, res, next){
        console.log(req.body)
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

        console . log(email)
        // If validation passes, proceed to create the user
        const newUser = await user.create(value);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred. Please try again later.'
        });

    };}
    // console.log(req.body)
    // const newUser = await user.create(req.body);
    // console.log(newUser);
    // const token = jwt.sign({ id: newUser._id }, process.env.SECRET_STR, { expiresIn: process.env.EXPIRES_IN });

    //     res.status(201).json({
    //         status: 'Successful',
    //         token: token,
    //         user: newUser
    //     });
    
    // const newUser = await user.create(req.body);

        // const token = jwt.sign({id:newUser._id}, process.env.SECRET_STR, {expiresIn: process.env.EXPIRES_IN});

        // res.status(201).json({
        //     status: 'Successful',

        //     token: token,

        //     user: newUser
        // });


//exportinf my functions
module.exports={
    getHomepage,

    getSighupPage,

    getLoginpage,

    checkIn,

    sighUserup

}