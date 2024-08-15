const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path: './config.env'});
const app = require('./app')

     
const port = process.env.PORT || 2000;
        
        
app.listen(port, ()=>{
    console.log('server has started')
})
