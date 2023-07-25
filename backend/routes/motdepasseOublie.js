const User = require('../Modele/User');
const router = require('express').Router();
const crypto = require('crypto');
const PasswordResetRequest = require('../Modele/PasswordResetRequest');
const transporter = require('../config/mailConfig');

const secretkey = crypto.randomBytes(20).toString('hex');


router.post('/password_request_rest', async(req, res) => {
    
    const {email} = req.body;
    try {
        const user = await User.findOne({where : {email}});

        if(!user) {
            return res.status(404).json({message : 'Utilisateur non trouvé '})
        }
        const token = jwt.sign({ userId: user.id}, secretkey, {expiresIn:'15m'})
        await PasswordResetRequest.create({
            userId : user.id,
            token,
        });

        //Création du mail pour réinitialiser le mot de passe
        const baseUrl = 'http://localhost:3000';
        const resetPasswordLink = `${baseUrl}/reinitialiser-mot-de-passe/${token}`

        //Contenu du mail 
        const mailOptions = {
            from : 'addressEmail@gmail.com',
            to : email,
            subject : 'Réinitialisaton du mot de passe',
            html : `<div>
                        <p> Bonjour </p>
                        <p> Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe</p>
                        <a href="${resetPasswordLink}"></a>
                        <p>Ce lien est valable pendant 15 minutes. Si vous n'avez pas demandé de réinitialisation de mot de passe, ignorez simplement cet e-mail.</p>
                        <p>Merci,</p>
                        <p>Votre équipe de support</p>
                    </div>`
        }

        

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
    }
    catch {
        
    }
})


module.exports = router;
