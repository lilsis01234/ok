const Formation = require('../../../Modele/formation/Formation');
const Module = require('../../../Modele/formation/Modules/Module');
const GroupFormation = require('../../../Modele/formation/PublicCible/GroupFormation');
const { SeanceFormation, Collab, ParticipantsSeance } = require('../../../Modele/formation/associationSeance/associationSeanceCollab')
const { QueryTypes } = require('sequelize');
const sequelize = require('../../../database/database'); 

const router = require('express').Router();

function buildCriteria(criteria) {
    const where = {};
    for (let key in criteria) {
        let value = criteria[key];
        if (Array.isArray(value)) {
            where[key] = { [Op.or]: value };
        } else {
            where[key] = value
        }
    }

    return where;
}


//Récupérer toutes les participants d'une seance


router.get('/all/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch ParticipantsSeance records for a specific seance id
        // const participantsSeance = await sequelize.query(
        //     `SELECT ps.*, c.*
        //      FROM formation_participantsseances ps
        //      INNER JOIN profil_collabs c ON ps.collaborateur = c.id
        //      WHERE ps.seance = :seanceId`,
        //     {
        //         replacements: { seanceId: id },
        //         type: QueryTypes.SELECT,
        //     }
        // );
        const participantsSeance = await ParticipantsSeance.findAll({
            where: { seance: id },
            include: {
                model: Collab,
                attributes: ['id', 'nom', 'prenom', 'tel','image']
            },
        });

        res.status(200).json(participantsSeance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des participants de la séance' });
    }
});




//Ajouter un participants
router.post('/add', async(req, res) => {
    try {
        const {seance, collaborateur, online} = req.body;

        //Rechercher dans la seance s'il le nombre de place n'est pas encore plein
        const seanceParticipant = await SeanceFormation.findByPk(seance)

        if(seanceParticipant.nombreDePlaces === seanceParticipant.nombreDePlacesReservees){
            res.status(200).json({message : 'Il n\'y a plus de place.'});
        } else {
            const participant = await ParticipantsSeance.create({
                seance : seance,
                collaborateur: collaborateur,
                online : online,
            })

            const newNbrPlaceReservee = seanceParticipant.nombreDePlacesReservees + 1

           await SeanceFormation.update({
                nombreDePlacesReservees : newNbrPlaceReservee
            })

            res.status(200).json({participant})

        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de l\'ajout du participant'})
    }
})


//Ajouter plusieurs participants en même temps 
router.post('/addManyParticipant', async(req, res) => {
    try {
        const {critere, seance, online} = req.body;

        const seanceParticipant = await SeanceFormation.findByPk(seance)

        const collaborateur = await Collab.findAll({
            where : buildCriteria(critere)
        })

        for(const collab of collaborateur){
            if(seanceParticipant.nombreDePlaces === seanceParticipant.nombreDePlacesReservees){
                res.status(200).json({message : 'Il n\'y a plus de place.'});
            } else {
                const participant = await ParticipantsSeance.create({
                    seance : seance,
                    collaborateur : collab.id,
                    online : online
                })

                const newNbrPlaceReservee = seanceParticipant.nombreDePlacesReservees + 1

                await SeanceFormation.update({
                    nombreDePlacesReservees : newNbrPlaceReservee
                })

            }


        }

        res.status(200).json({message : 'Ajout des plusieurs effectués avec succès'})
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de l\'ajout des participants'})
    }
})


//Importer des participants
router.post('/importParticipant', async(req, res) => {
    try {
        const {seance} = req.body;

        const seanceParticipant = await SeanceFormation.findByPk(seance, {
            include : 
                {
                    model : Module,
                    attributes : ['titreModule', 'description'],
                    include: 
                        {
                            model : Formation,
                            attributes : ['id', 'theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'dateDebutFormation', 'dateFinFormation', 'demande']
                        }
                    
                }
        })

        if(!seanceParticipant){
            res.status(500).json({error : 'Seance non trouvé'})
        }

        const formationId = seanceParticipant.module?.formation?.id

        if(!formationId){
            res.status(500).json({error : 'Formation non trouvé'})
        }

        
        //recuperer le groupe de la formation
        const groupeFormation = await GroupFormation.findAll({
            where : {
                formation : formationId
            }
        })

        if(groupeFormation){
            for (const group in groupeFormation){
                await ParticipantsSeance.create({
                    seance : seance,
                    collaborateur : group.id
                })

                const newNbrPlaceReservee = seanceParticipant.nombreDePlacesReservees+1

                await SeanceFormation.update({
                    nombreDePlacesReservees : newNbrPlaceReservee
                })
                

            }

        }
        res.status(500).json({message : 'Import des participants effectués avec succés.'})
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de l\'ajout des participants'})
    }
})


//Supprimer les participants 
router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params;

        const seanceToDelete = await ParticipantsSeance.findByPk(id);
        
        if(!seanceToDelete){
            res.status(500).json({error : 'Participant Non Trouvé'})
        }


        await seanceToDelete.delete();
        res.status(200).json({message : 'Participant supprimé avec succés'})


    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de la suppression du participants.'})
    }
})



module.exports = router;