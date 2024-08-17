//requiring express
const express = require('express')

//importing my userController to use its functions
const userController = require('./../Controller/UserController');

//getting the routes
const Router = express.Router();

//specifying route for ifighup
Router.route(['/','/index'])
                        .get(userController.getHomepage)

//specifying route for fighup
Router.route('/signup')
                        .get(userController.getSighupPage)


//exporting module
module.exports = Router;