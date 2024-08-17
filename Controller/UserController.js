//requiring path
const path = require('path');

//function to display hmepage
const getHomepage = function(req,res){
    res.sendFile(path.join(__dirname, '../Views/htmlFiles/index.html'));

}

// function to display sighup page
const getSighupPage = function(req,res){
    res.sendFile(path.join(__dirname, '../Views/htmlFiles/signup.html'));
}

//exportinf my functions
module.exports={
    getHomepage,
    getSighupPage
}