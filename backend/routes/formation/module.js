const router = require('express').Router();
const cookieParser = require('cookie-parser');
const Formation = require('../../Modele/formation/Formation');
const Module = require('../../Modele/formation/Module');
const Collaborateur = require('../../Modele/CollabModel/Collab');
router.use(cookieParser());

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

router.get('/modules/:formationId', async(req, res) => {
    try{
       const idFormation = req.params.formationId;

        //Recherche de la formation ayant cet id
        const formations = await Formation.findAll({
            where : {
                id : idFormation,
                approbation : 1}
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
        res.status(500).json({message : 'Erreur lors de la récupération des employés'})
    }
})
router.post('/addModule',async(req,res)=>{
    try{
        const newModule = await(Module.create({
            titreModule:req.body.titreModule,
            description:req.body.description,
            formation:req.body.formation,
        }))
        const module = await newModule.save();
        res.status(201).json(module);
    }
    catch(err){
        console.error(err)
    }

})

module.exports = router;
