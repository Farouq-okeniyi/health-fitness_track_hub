//requiring path
const path = require('path');
const bcrypt = require('bcrypt')
const user = require('./../Model/authModel')
const jwt = require('jsonwebtoken')
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
const getLoginpage = function(req,res){
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
    try {
        const newUser = await user.create(req.body);
     
        res.status(201).json({
            Status:'Succesful',
            user: newUser
        })
    } catch (error) {
        console.log(errr)
    }
}

//exportinf my functions
module.exports={
    getHomepage,
    getSighupPage,
    getLoginpage,
    checkIn,
    sighUserup
}