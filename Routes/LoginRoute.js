const express = require('express')

const userController = require('./../Controller/UserController');

const Router = express.Router();

Router.route(['/','/index'])
                .get(userController.getHomepage)

Router.route('/signup').get(userController.getSighupPage)

module.exports = Router;