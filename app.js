const express =require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const UserRoute = require('./Routes/LoginRoute');
const CustomError = require('./Utility/CustomError')
const globalerror = require('./Controller/ErrorController');
const cookieParser = require('cookie-parser');
// app.use(require('cookie-parser')());
app.use(cookieParser());


app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));


// Setting the view engine to ejs
app.set('view engine', 'ejs');

// Setting the views directory
app.set('views', path.join(__dirname, 'Views'));
// app.use(express.static(path.join(__dirname, 'Views')));

app.use(express.static(path.join(__dirname, 'Views')));

//setting osur default route
app.use('/Healtify/',UserRoute);


app.use(globalerror)

module.exports = app