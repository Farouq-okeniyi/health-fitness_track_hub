const path = require('path');

const getHomepage = function(req,res){
    res.sendFile(path.join(__dirname, '../Views/htmlFiles/index.html'));
}
const getSighupPage = function(req,res){
    res.sendFile(path.join(__dirname, '../Views/htmlFiles/signup.html'));
}


module.exports={
    getHomepage,
    getSighupPage
}