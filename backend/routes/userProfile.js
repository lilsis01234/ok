const Collaborateur = require('../Modele/Collaborateur');
const CompteCollab = require('../Modele/CompteCollab');
const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste');

const router = require('express').Router();

router.get('/profile/:id', async(req, res) => {
    const {id} = req.params


    try {
        const compte = await CompteCollab.findOne({
            where : {
                id : id,
            },
           include : {
                model : Collaborateur,
                include : {
                    model: Poste,
                    include : Departement,
                }
           }
        });

        if (!compte) {
            return res.status(404).json({error : 'Compte collaborateur non trouvé'});
        }

        const user = compte


        res.json(user);
    }
    catch (error) {
        console.error('Erruer lors de la récupérations des infos sur les collaborateur:', error);
        res.status(500).json({error : 'Erreur lors de la récupération des infos sur le serveurs'})
    }
})





module.exports = router;
