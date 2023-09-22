const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host : 'smtp.phpnet.org',
    port : 465,
    secure : true,
    auth : {
        user: process.env.MAIL_USER, //Remplacer par l'adresse email
        pass: process.env.MAIL_PASS, //Le mot de passe de l'adresse email
    }
})

module.exports = transporter;