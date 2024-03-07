// const ParticipantsSeance = require('../../../Modele/formation/Seances/ParticipantsSeance');
const Formation = require('../../../Modele/formation/Formation');
const Module = require('../../../Modele/formation/Modules/Module');
const GroupFormation = require('../../../Modele/formation/PublicCible/GroupFormation');
const { SceanceFormation, Collaborateur, ParticipantsSeance } = require('../../../Modele/formation/associationSeance/associationSeanceCollab')


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


//Récupérer toutes les participants d'une sceance
router.get('/all/:id', async (req, res) => {
    try {

        const { id } = req.params

        const participantsSceance = await ParticipantsSeance.findAll({
            where: {
                seance: id,
            },
            include: [
                {
                    model: Collaborateur,
                    as: collabseance
                }
            ]
        })


        res.status(200).json(participantsSceance)
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de la récupération des participants de la scéance'})
    }
})


//Ajouter un participants
router.post('/add', async(req, res) => {
    try {
        const {sceance, collaborateur, online} = req.body;

        //Rechercher dans la sceance s'il le nombre de place n'est pas encore plein
        const sceanceParticipant = await SceanceFormation.findByPk(sceance)

        if(sceanceParticipant.nombreDePlaces === sceanceParticipant.nombreDePlacesReservees){
            res.status(200).json({message : 'Il n\'y a plus de place.'});
        } else {
            const participant = await ParticipantsSeance.create({
                sceance : sceance,
                collaborateur: collaborateur,
                online : online,
            })

            const newNbrPlaceReservee = sceanceParticipant.nombreDePlacesReservees + 1

           await SceanceFormation.update({
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
        const {critere, sceance, online} = req.body;

        const sceanceParticipant = await SceanceFormation.findByPk(sceance)

        const collaborateur = await Collab.findAll({
            where : buildCriteria(critere)
        })

        for(const collab of collaborateur){
            if(sceanceParticipant.nombreDePlaces === sceanceParticipant.nombreDePlacesReservees){
                res.status(200).json({message : 'Il n\'y a plus de place.'});
            } else {
                const participant = await ParticipantsSeance.create({
                    sceance : sceance,
                    collaborateur : collab.id,
                    online : online
                })

                const newNbrPlaceReservee = sceanceParticipant.nombreDePlacesReservees + 1

                await SceanceFormation.update({
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
        const {sceance} = req.body;

        const sceanceParticipant = await SceanceFormation.findByPk(sceance, {
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

        if(!sceanceParticipant){
            res.status(500).json({error : 'Sceance non trouvé'})
        }

        const formationId = sceanceParticipant.module?.formation?.id

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
                    sceance : sceance,
                    collaborateur : group.id
                })

                const newNbrPlaceReservee = sceanceParticipant.nombreDePlacesReservees+1

                await SceanceFormation.update({
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

        const sceanceToDelete = await ParticipantsSeance.findByPk(id);
        
        if(!sceanceToDelete){
            res.status(500).json({error : 'Participant Non Trouvé'})
        }


        await sceanceToDelete.delete();
        res.status(200).json({message : 'Participant supprimé avec succés'})


    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de la suppression du participants.'})
    }
})



module.exports = router;