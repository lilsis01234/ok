const router = require('express').Router();
const crypto = require('crypto');


const PasswordResetRequest = require('../../Modele/CompteModel/PasswordResetRequest');
const transporter = require('../../config/mailConfig');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const Compte = require('../../Modele/CompteModel/Compte');
require('dotenv').config();

const secretkey = crypto.randomBytes(20).toString('hex');


router.post('/password_request_rest', async(req, res) => {
    
    const {email} = req.body;
    try {
        const user = await Compte.findOne({where : {email}});

        if(!user) {
            return res.status(404).json({message : 'Utilisateur non trouvé '})
        }

        //S'assurer que l'utilisateur ne peut pas faire qu'une demande tout les 30 minutes
        const now = new Date();
        const minutesLimit = 10;
        const limitTime = new Date(now.getTime() - (minutesLimit * 60 * 1000));
        if (user.lastResetRequest && user.lastResetRequest > limitTime){
            console.log('Vous ne pouvez demander qu\'une demande de réinitialisation de mot de passe toute les 10 minutes');
            return res.status(429).json({message : 'Vous ne pouvez demander qu\'une demande de réinitialisation de mot de passe toute les 10 minutes'});  
          
        }

        const token = jwt.sign({ userId: user.id}, secretkey, {expiresIn:'30m'})
        const expiresAt = new Date(now.getTime() + 30 * 60 * 1000);
        await PasswordResetRequest.create({
            userId : user.id,
            token,
            expiresAt
        });

        user.lastResetRequest = now;
        await user.save();

        //Création du mail pour réinitialiser le mot de passe
        const baseUrl = 'http://localhost:3000';
        const resetPasswordLink = `${baseUrl}/reset-password/${token}`

        //Contenu du mail 
        const mailOptions = {
            from : process.env.MAIL_USER,
            to : email,
            subject : 'Réinitialisaton du mot de passe',
            html : `<div>
                        <p> Bonjour, </p>
                        <p> Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe</p>
                        <p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>
                        <p>Le lien expirera dans 15 minutes. Si vous n'avez pas demandé de réinitialisation de mot de passe, ignorez simplement cet e-mail.</p>
                        <p>Merci,</p>
                        <p>Votre équipe de support</p>
                    </div>`
        }

        console.log(mailOptions);

        //Pour envoyer le mail 
        transporter.sendMail(mailOptions, (error, info) => {
            if (error){
                console.log('Erreur lors de l\'envoi de l\email:', error);
                return res.status(500).json({message : 'Une erreur est survenue lors de l\'envoie d\'email'});
            } else {
                console.log('E-mail envoyé avec succès:', info.response);
                return res.status(200).json({message : 'Un e-mail contenant le lien de réinitialisation du mot de passe a été renvoyé à votre adresse email'})
            }
        })

    }
    catch (error){
        console.error('Erreur lors de la recherche de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la recherche de l\'utilisateur.' });
    }
})



//route pour réinitialiser le mot de passe 
router.post('/reset-password/:token', async(req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    try {
        const resetRequest = await PasswordResetRequest.findOne({where : {token}})
        if (!resetRequest) {
            return res.status(400).json({message : 'Jeton de réinitialisaton invalide ou expiré qu\'une réinitialisation de mot de passe toutes les 30 minutes.'})
        }

        const user = await Compte.findByPk(resetRequest.userId);

      

       
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, saltRounds)


        user.password = hashedPassword;
        await user.save();

        await resetRequest.destroy();
        return res.status(200).json({message : 'Mot de passe réinitialisé avec succès'});
        

        
    } 
    catch (error){
        console.error('Erreur lors de la réinitialisaton du mot de passe:', error)
        return res.status(500).json({message : 'Une erreur est survenue lors de la réinitialisation du mot de passe'});
    }
})









module.exports = router;
