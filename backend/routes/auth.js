const CompteCollab = require('../Modele/CompteCollab');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const crypto = require('crypto');
const Role = require('../Modele/Role');

const router = require('express').Router();

// const secretKey = crypto.randomBytes(32).toString('hex');


//pour se connecter
router.post('/login', (req, res, next) => {
    CompteCollab.findOne({email : req.body.email})
    .then (comptes => {
        if (!comptes){
            return res.status(401).json({message : 'Identifiant non trouvé'})
        }
       bcrypt.compare(req.body.password, comptes.password)
       .then(valid => {
           if (!valid) {
               return res.status(401).json({message : 'Mot de passe incorrect'})
           }

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
           res.status(200).json({
               id :  comptes.id,
               token : jwt.sign(
                   {id : comptes.id},
                   //secretKey,
                   accessTokenSecret,
                   { expiresIn : '24h' }
               )
           })
           console.log('Utilisateur connecté avec succés')
       })
       .catch (error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json(error));
})



module.exports = router;