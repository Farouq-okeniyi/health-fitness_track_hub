const express =require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const UserRoute = require('./Routes/LoginRoute');

const CustomError = require('./Utility/CustomError')
const globalerror = require('./Controller/ErrorController')

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'Views')));


//setting our default route
app.use('/Healtify',UserRoute);

app.use(globalerror)

module.exports = app