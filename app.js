const express =require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const UserRoute = require('./Routes/LoginRoute');
const userController = require('./Controller/UserController'); // Adjust path as needed

const CustomError = require('./Utility/CustomError')
const globalerror = require('./Controller/ErrorController');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors());  // Add this middleware to allow cross-origin requests

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
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cssFiles', express.static(path.join(__dirname, 'public/cssFiles')));
app.use('/javaScriptFiles', express.static(path.join(__dirname, 'public/javaScriptFiles')));
//setting osur default route
app.use('/Healtify/',UserRoute);
app.all('*',(req, res, next)=>{
    const err = new CustomError((`cant find ${req.originalUrl} on server`), 404)
    err.status = 'fail'
    err.statusCode = 404

    next(err);
})

app.use(globalerror)

module.exports = app