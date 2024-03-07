const router = require('express').Router();
const Formation = require('../../../Modele/formation/Formation');
const Module = require('../../../Modele/formation/Modules/Module');
const GroupFormation = require('../../../Modele/formation/PublicCible/GroupFormation');
const SceanceFormation = require('../../../Modele/formation/Seances/SceanceFormation')



//Route pour ajouter une nouvelle formation
router.post('/add', async (req, res) => {
    try {
        const { title, start, end, nombreDePlaces, module } = req.body;

        const sceanceToAdd = await SceanceFormation.create({
            date: start,
            heureStart: start,
            heureEnd: end,
            nombreDePlacesReservees: 0,
            nombreDePlaces: nombreDePlaces,
            title: title,
            module: module
        })

        res.status(201).json(sceanceToAdd)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout des scéances' })
    }
})


//Récupérer toutes les scéance
router.get('/all', async (req, res) => {
    try {
        const allSceance = await SceanceFormation.findAll({
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

        res.status(200).json(allSceance)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur lors de la récupération de toutes les scéances de formations' })
    }
})

//Récupérer toutes les sceances d'une formation 
router.get('/all/formation/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const allFormationSceance = await SceanceFormation.findAll({
            include: [
                {
                    model: Module,
                    attributes: ['titreModule', 'description', 'formation'],
                    where: {
                        formation: id,
                    },
                    include: [
                        {
                            model: Formation,
                            attributes: ['theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'dateFinFormation', 'dateDebutFormation', 'demande']
                        }
                    ]
                }
            ]
        })


        res.status(200).json(allFormationSceance)


    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur lors de la récupération de toutes les scéances d\'une formation' })
    }
})


//Récupérer toutes les scéances d'une Module 
router.get('/all/module/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const allModuleSceance = await SceanceFormation.findAll({
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

        res.status(200).json(allModuleSceance)


    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur lors de la récupération de toutes les scéances d\'une modules' })
    }
})



//Récuperer toutes les scéances d'un formateur particulier
router.get('/all/formateur/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const allFormateurSceance = await SceanceFormation.findAll({
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


        res.status(200).json(allFormateurSceance)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur lors de la récupération de toutes les scéances d\'un formateur' })
    }
})


//Récupérer toutes les scéances ou un collaborateur peut participer
router.get('/all/formationCollab/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const publicFormationSceance = await SceanceFormation.findAll(
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
        let privateFormationSceance;


        for (const groupe of allGroupUser){
            const privateSceance = await SceanceFormation.findAll(
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

            privateFormationSceance = [...privateSceance]
        }


        const userFormationSceance = [...publicFormationSceance, ...privateFormationSceance]
        res.status(200).json(userFormationSceance)
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Erreur lors de la récupération des scéances de l\'utilisateur'})
    }
})


//Voir les informations d'une scéance en particulier
router.get('/view/:id', async(req, res) => {
    try {
        const {id} = req.params;

        const sceanceToView = await SceanceFormation.findByPk(id, {
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
        res.status(200).json(sceanceToView)
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Erreur lors de la récupération des scéances de l\'utilisateur'})
    }
})

//Modifier les informations d'une scéance en particulier
router.put('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const { title, start, end, nombreDePlaces, module } = req.body;

        const sceanceToEdit = await SceanceFormation.findByPk(id)

        if(!sceanceToEdit){
            res.status(500).json({error : 'Scéance introuvable'})
        }

        const sceanceEdit = await SceanceFormation.update({
            title : title,
            start : start,
            end : end,
            nombreDePlaces : nombreDePlaces,
            module : module  
        })


        res.status(200).json(sceanceEdit)


    } catch (error) {   
        console.error(error)
        res.status(500).json({error : 'Erreur lors de la mise à jour de la scéance'})
    }
})

//Supprimer une scéance en particulier
router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params;

        const sceanceToDelete = await SceanceFormation.findByPk(id)

        if(!sceanceToDelete){
            res.status(500).json({error : 'Scéance introuvable'})
        }

        await sceanceToDelete.destroy()
        res.status(200).json({message : 'Scéance supprimé avec succès'})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de la suppression du scéance'})
    }
})



module.exports = router;