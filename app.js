const express =require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'Views')));

app.use('/signup', (req, res) => {
   res.send('sigh up page')

});

app.use('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views/htmlFiles/login.html'));

});

app.use(['/', '/index'], (req, res) => {
    res.sendFile(path.join(__dirname, 'Views/htmlFiles/index.html'));
});
module.exports = app