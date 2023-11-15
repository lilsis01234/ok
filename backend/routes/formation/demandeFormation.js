const Sequelize = require('sequelize');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
// const Formation = require('../../Modele/formation/Formation');
// const Collab = require('../../Modele/CollabModel/Collab');
const {  Formation2,Collab2,FormationCollab } = require('../../Modele/formation/associationFormationCollab');
const {  Formation,Equipe2,FormationEq } = require('../../Modele/formation/associationFormationDep');

router.get('/all', async(req,res)=>{
    try{
        const demandes = await Formation.findAll({
            include: [
                {
                    model: Collab2,
                    as: 'Auteur',
                    attributes: ['nom', 'prenom'],
                },
            ],
            where: {
                destinataireDemande: { [Sequelize.Op.not]: null },
                approbation: 0,
            }
        })
        res.status(200).json(demandes)
    }
    catch(err){
        console.error(err)
    }
}
)

router.get('/demande/:idDemande', async (req, res) => {
    const idDemande = req.params.idDemande;

    try {
        const demandes = await Formation.findAll({
            include: [
                {
                    model: Collab2,
                    as: 'Auteur',
                    attributes: ['nom', 'prenom'],
                },
            ],
            where: {
                destinataireDemande: { [Sequelize.Op.not]: null },
                approbation: 0,
                id: idDemande,
            },
        });

        const Collabs = await FormationCollab.findAll({
            where: { formation: idDemande },
            include:
            [
                {
                    model:Collab2
                },
                {
                    model:Formation2
                }
            ]
        });

        const equipe = await FormationEq.findAll({
            where: { formation: idDemande },
            include : 
            [
                {
                    model:Equipe2
                },
                {
                    model:Formation
                }
            ]
        });


        if (!Collabs) {
            res.status(200).json({demandes,equipe});
        }
        else if (!equipe) {
            res.status(200).json({demandes,Collabs});
        } 
        else {
            res.status(200).json({demandes,Collabs,equipe});
            console.log({ demandes, Collabs, equipe });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ajout demande de formation

router.post('/addDemandeFormation', async (req, res) => {
    try {
        // Create a new Formation
        const newDemande = await Formation.create({
            theme: req.body.theme,
            description: req.body.description,
            duree: req.body.duree,
            auteur: req.body.auteur,
            destinataireDemande: req.body.destinataire,
            approbation:0
        });

        const demandeFormationId = newDemande.id;

        // Get collaborators from the request body
        const collaborateurs = req.body.collaborateurs;

        const equipe = req.body.equipe;

        // Use Promise.all to wait for all FormationCollab creations
        if (collaborateurs && collaborateurs.length !== 0) {
            await Promise.all(collaborateurs.map(async (collaborateurId) => {
                // Create FormationCollab for each collaborateur
                await FormationCollab.create({
                    formation: demandeFormationId,
                    collaborateur: collaborateurId,
                });
            }));
        }

        if (equipe && equipe.length !== 0) {
            await FormationEq.create({
                formation: demandeFormationId,
                equipe: equipe,
            });
        }

        // Respond with the created Formation
        res.status(201).json(newDemande);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//verification des receuils de demandes

module.exports = router;