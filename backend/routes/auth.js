const CompteCollab = require('../Modele/CompteCollab');

const router = require('express').Router();

router.post('/login', (req, res, next) => {
    CompteCollab.findOne({email : req.body.email})
    .then (comptes => {
        if (!comptes){
            return res.status(401).json({message : 'Identifiant non trouvé'})
        }
       bcrypt.compare(req.body.password, user.password)
       .then(valid => {
           if (!valid) {
               return res.status(401).json({message : 'Mot de passe incorrecte'})
           }
       })
    })
})