const { options } = require('joi')
const nodeMailer = require('nodemailer')

const sendEmail = async (option)=>{
//Create Transporter
    const transporter = nodeMailer.createTransport({
        host: process.env.EMAILHOST,

        port: process.env.EMAILPORT,

        auth:{

            user: process.env.EMAILUSERNAME,

            pass: process.env.EMAILPASSWORD
        }
    })
//Define Email Options
    const emailOPtion ={
        from:'Healthify support<support@healthify.com>',

        to:option.email,

        subject:option.subject,

        text:option.message
    }

    await transporter.sendMail(emailOPtion)
}

module.exports={sendEmail}