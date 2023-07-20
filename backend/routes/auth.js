const CompteCollab = require('../Modele/CompteCollab');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');


require('dotenv').config();


const crypto = require('crypto');
const Role = require('../Modele/Role');

const router = require('express').Router();

router.use(cookieParser());

const secretKey = crypto.randomBytes(32).toString('hex');


//pour se connecter
router.post('/login', (req, res, next) => {
    CompteCollab.findOne({
        where : {email : req.body.email}
    })
    .then (comptes => {
        if (!comptes){
            return res.status(401).json({message : 'Identifiant non trouvé'})
        }
       bcrypt
       .compare(req.body.password, comptes.password)
       .then(valid => {
           if (!valid) {
               return res.status(401).json({message : 'Mot de passe incorrect'})
           }

        const userRoleId = comptes.RoleId;

        Role.findOne({
            where : {id : userRoleId},
            attributes : ['titreRole']
        })
        .then((roles) => {
            console.log('roles:', roles);
            const userRoles = roles ? [roles.titreRole] : [];
            if (userRoles.length === 0){
                return res.status(401).json({message : 'Rôles non définis pour l\'utilisateur '});
            }
            const roleTitle = userRoles.length > 0 ? userRoles[0] :null;

            const token = jwt.sign(
                {id : comptes.id, role : roleTitle},
                secretKey,
                {expiresIn : '24h'}
            )
            res.cookie('access_token', token, {httpOnly: true, secure: true, maxAge: 86400000})
            res.status(200).json({
                id : comptes.id,
                role : roleTitle,
                token : token,
            })
            console.log('Utilisateur connecté avec succés')

        
        })
       })
       .catch (error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json(error));
})

// router.post('/logout', (req, res) => {
//     res.clearCookie('access_token');
//     console.log('Deconnexion réussie');
//     res.status(200).json({ message: 'Déconnexion réussie' });
// })



module.exports = router;