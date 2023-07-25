const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user: 'addressEmail@gmail.com', //Remplacer par l'adresse email
        pass: 'motDePasse' //Le mot de passe de l'adresse email
    }
})

module.exports = transporter;