const Collab = require('../../Modele/CollabModel/Collab');
const Compte = require('../../Modele/CompteModel/Compte');
const TestDepartement = require('../../Modele/Structure/TestDepartement');
const TestPoste = require('../../Modele/Structure/TestPoste');

const router = require('express').Router();

router.get('/:id/profile', async(req, res) => {
    const {id} = req.params


    try {
        const compte = await Compte.findOne({
            where : {
                id : id,
            },
            include : [
                {
                    model : Collab,
                    include : [
                        {
                            model : TestPoste,
                            as : 'poste1',
                        },{
                            model : TestPoste,
                            as : 'postes',
                        }, {
                            model : TestDepartement,
                            as : 'departement1',
                        }, {
                            model : TestDepartement,
                            as : 'departements',
                        } 
                    ]
                }
            ]
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
