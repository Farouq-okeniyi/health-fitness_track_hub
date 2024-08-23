const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path: './config.env'});
const app = require('./app')

mongoose.connect(process.env.local_con_string
    ,{ 
        // tls: true ,// Enable TLS
        // tlsAllowInvalidCertificates: true,
        // ssl: true,
        
    }).then((conn)=>{
        // console.log(conn);
        console.log("db connected succesfully");
    })
     
const port = process.env.PORT || 2000;
        
        
app.listen(port, ()=>{
    console.log('server has started')
})
