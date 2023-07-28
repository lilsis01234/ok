const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host : 'smtp.phpnet.org',
    port : 465,
    secure : true,
    auth : {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
    }
})

module.exports = transporter;