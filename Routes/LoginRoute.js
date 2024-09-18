//requiring express
const express = require('express')

//importing my userController to use its functions
const userController = require('./../Controller/UserController');

//getting the routes
const Router = express.Router();

//specifying route for ifighup
Router.route(['','/','/index'])
                        .get(userController.getHomepage)

//specifying route for fighup
Router.route('/signup')
                        .get(userController.getSighupPage)
                        .post(userController.sighUserup)
Router.route('/login')
                        .get(userController.getLoginpage)
                        .post(userController.logUserIn)

Router.route('/dashboard')
                        .get(userController.protect, userController.getDashBoard)

Router.route('/dashboard/profile')
                        .get(userController.protect, userController.getprofile)
Router.route('/dashboard/ward')
                        .get(userController.protect, userController.getward)

Router.route('/dashboard/finance')
    .get(userController.protect, userController.getFinance);

Router.route('/dashboard/subscription')
    .get(userController.protect, userController.getSubscription);

Router.route('/dashboard/settings')
    .get(userController.protect, userController.getSettings);


Router.route('/forgotPassword')
                        .get(userController.getforgotPassword)

Router.route('/resetpassword/')   
                        .patch(userController.forgotPassword)

// router.get('/dashboard/profile', userController.getProfile);
// router.get('/dashboard/session', userController.getSession);
// router.get('/dashboard/card', userController.getCard);
// router.get('/dashboard/friends', userController.getFriends);

//exporting module
module.exports = Router;