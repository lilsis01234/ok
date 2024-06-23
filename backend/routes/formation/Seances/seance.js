const router = require('express').Router();
const Formation = require('../../../Modele/formation/Formation');
const Module = require('../../../Modele/formation/Modules/Module');
const GroupFormation = require('../../../Modele/formation/PublicCible/GroupFormation');
const SeanceFormation = require('../../../Modele/formation/Seances/SeanceFormation')

//Récupérer toutes les séance
router.get('/all', async (req, res) => {
    try {
        const allSeance = await SeanceFormation.findAll({
            include: [
                {
                    model: Module,
                    attributes: ['titreModule', 'description'],
                    include: [
                        {
                            model: Formation,
                            attributes: ['theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'dateDebutFormation', 'dateFinFormation', 'demande']
                        }
                    ]
                }
            ]
        })

        res.status(200).json(allSeance)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur lors de la récupération de toutes les séances de formations' })
    }
})

//Récupérer toutes les seances d'une formation 
router.get('/all/formation/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const allFormationSeance = await SeanceFormation.findAll({
            include: [
                {
                    model: Module,
                    attributes: ['titreModule'],
                },
                {
                    model: Formation,
                    attributes: ['theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'dateFinFormation', 'dateDebutFormation', 'demande']
                }
            ],
            where: {
                formation: id
            }
        });

        res.status(200).json(allFormationSeance);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de toutes les séances d\'une formation' });
    }
});

//Récupérer toutes les séances d'une Module 
router.get('/all/module/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const allModuleSeance = await SeanceFormation.findAll({
            where: {
                module: id
            },
            include: [
                {
                    model: Module,
                    attributes: ['titreModule', 'description', 'formation'],
                    include: [{
                        model: Formation,
                        attributes: ['theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'dateFinFormation', 'dateDebutFormation', 'demande']
                    }]
                }
            ]
        })

        res.status(200).json(allModuleSeance)


    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur lors de la récupération de toutes les séances d\'une modules' })
    }
})



//Récuperer toutes les séances d'un formateur particulier
router.get('/all/formateur/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const allFormateurSeance = await SeanceFormation.findAll({
            include: [{
                model: Module,
                attributes: ['titreModule', 'description', 'formation'],
                include: [{
                    model: Formation,
                    where: {
                        formateur: id
                    },
                    attributes: ['theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'dateFinFormation', 'dateDebutFormation', 'demande']
                }]
            }]
        })


        res.status(200).json(allFormateurSeance)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur lors de la récupération de toutes les séances d\'un formateur' })
    }
})


//Récupérer toutes les séances ou un collaborateur peut participer
router.get('/all/formationCollab/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const publicFormationSeance = await SeanceFormation.findAll(
            {
                include: [{
                    model : Module,
                    attributes: ['titreModule', 'description', 'formation'],
                    include : [{
                        model : Formation,
                        where : {
                            confidentialite : 'Public'
                        },
                        attributes: ['theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'dateFinFormation', 'dateDebutFormation', 'demande']
                    }]
                }]
            }
        )


        const allGroupUser =  await GroupFormation.findAll({
            where : {
                collaborateur : id,
            }
        })
        let privateFormationSeance;


        for (const groupe of allGroupUser){
            const privateSeance = await SeanceFormation.findAll(
                {
                    include : [{
                        model : Module,
                        where : {
                            formation : groupe.id,
                        },
                        attributes: ['theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'dateFinFormation', 'dateDebutFormation', 'demande'],
                        include : [{
                            model : Formation,
                            where : {
                                confidentialite : 'Public'
                            },
                            attributes: ['theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'dateFinFormation', 'dateDebutFormation', 'demande']
                        }]
                    }]
                }
            )

            privateFormationSeance = [...privateSeance]
        }


        const userFormationSeance = [...publicFormationSeance, ...privateFormationSeance]
        res.status(200).json(userFormationSeance)
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Erreur lors de la récupération des séances de l\'utilisateur'})
    }
})


//Voir les informations d'une séance en particulier
router.get('/view/:id', async(req, res) => {
    try {
        const {id} = req.params;

        const seanceToView = await SeanceFormation.findByPk(id, {
            include: [
                {
                    model: Module,
                    attributes: ['titreModule', 'description'],
                },
                {
                    model: Formation,
                    attributes: ['theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'dateDebutFormation', 'dateFinFormation', 'demande']
                }
            ]
        })
        res.status(200).json(seanceToView)
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Erreur lors de la récupération des séances de l\'utilisateur'})
    }
})

//Modifier les informations d'une séance en particulier
router.put('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const { title, start, end, nombreDePlaces, module } = req.body;

        const seanceToEdit = await SeanceFormation.findByPk(id)

        if(!seanceToEdit){
            res.status(500).json({error : 'Séance introuvable'})
        }

        const seanceEdit = await SeanceFormation.update({
            title : title,
            start : start,
            end : end,
            nombreDePlaces : nombreDePlaces,
            module : module  
        })


        res.status(200).json(seanceEdit)


    } catch (error) {   
        console.error(error)
        res.status(500).json({error : 'Erreur lors de la mise à jour de la séance'})
    }
})

//Supprimer une séance en particulier
router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params;

        const seanceToDelete = await SeanceFormation.findByPk(id)

        if(!seanceToDelete){
            res.status(500).json({error : 'Séance introuvable'})
        }

        await seanceToDelete.destroy()
        res.status(200).json({message : 'Séance supprimé avec succès'})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de la suppression du séance'})
    }
})



module.exports = router;