const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const crypto = require('crypto');
const Role = require('../../Modele/RoleModel/Role');
const Compte = require('../../Modele/CompteModel/Compte');


const router = require('express').Router();
router.use(cookieParser());

const secretKey = crypto.randomBytes(32).toString('hex');



//Route pour se connecter
router.post('/connect',(req, res, next) => {
    Compte.findOne({
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
                {expiresIn : '1h'}
            )
<<<<<<< HEAD
            // res.cookie('token', token, {httpOnly: true, secure: true, maxAge: 86400100})
=======
            res.cookie('token', token, {httpOnly: true, secure: true, maxAge: 86400100})
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9

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



const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).json("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        
        const verified = jwt.verify(token, secretKey); // Utilisez la clé secrète correcte
        req.user = verified;
        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = router;
module.exports.verifyToken = verifyToken