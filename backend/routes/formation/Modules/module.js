const router = require('express').Router();
const cookieParser = require('cookie-parser');
const Formation = require('../../../Modele/formation/Formation');
const Module = require('../../../Modele/formation/Modules/Module');
const Collaborateur = require('../../../Modele/CollabModel/Collab');
router.use(cookieParser());


//Afficher toutes les modules 
router.get('/all_modules', async(req,res) => {
    Module.findAll({
        include: {
            model: Formation,
            attributes: ['theme','id'],
            include:{
                model:Collaborateur,
                attributes:['nom','prenom'],
            }
        },
    })
    .then((module) => {
        res.status(200).json(
            module.map((module) => {
                return {
                    nom : module.titreModule,
                    description : module.description,
                    formation: module.Formation.theme,
                    idFormation: module.Formation.id,
                    nomOrganisateur: module.Formation.Collaborateur.nom,
                    prenomOrganisateur: module.Formation.Collaborateur.prenom,
                }
            })
        )
        console.log(module)
    }) 
})

//Afficher toutes les modules d'une formations
router.get('/modules/:formationId', async(req, res) => {
    try{
       const idFormation = req.params.formationId;

        //Recherche de la formation ayant cet id
        const formations = await Formation.findAll({
            where : 
               {
                id : idFormation,
               }
        })

        if (!formations || formations.length === 0){
            return res.status(404).json({message: 'Aucun module trouvé pour cette formation'})
        }

        //Récupérations des modules associés à cette formation
        const modules = await Module.findAll({
            where : {formation: formations.map(formation => formation.id)},
            include : {model : Formation}
        })

        res.json(modules);

    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erreur lors de la récupération des modules de la formation'})
    }
})

//Ajouter un nouveau module
router.post('/addModule',async(req,res)=>{
    try{
        const newModule = await(Module.create({
            titreModule:req.body.titreModule,
            description:req.body.description,
            formation:req.body.idformation,
        }))
        const module = await newModule.save();
        res.status(201).json(module);
    }
    catch(err){
        console.error(err)
        res.status(500).json({message : 'Erreur lors de l\'ajout des nouveau module'})
    }
})


//Modifier un module existant
router.put('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {titreModule, description} = req.body

        const moduleToUpdate = await Module.findByPk(id);

        if(!moduleToUpdate){
            res.status(500).json({message : 'Module Introuvable '})
        }

        const updateFormation = await moduleToUpdate.update({
            titreModule : titreModule,
            description : description
        })

        res.status(200).json(updateFormation)
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de la modification du module existant'})
    }
})


//Supprimer un module existant
router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params
        
        const moduleToDelete = await Module.findByPk(id);

        if(!moduleToDelete){
            res.status(500).json({message :'Module introuvable'})
        }


        await moduleToUpdate.destroy();

        res.json(200).json({message : 'Module supprimé avec succés'})
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de la suppression du module existant'})
    }
})



module.exports = router;
