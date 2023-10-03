const router = require('express').Router();
const cookieParser = require('cookie-parser');
const Formation = require('../../Modele/formation/Formation');
const Module = require('../../Modele/formation/Module');
const Seance = require('../../Modele/formation/Seance');
const Collaborateur = require('../../Modele/CollabModel/Collab');
router.use(cookieParser());

router.get('/all_seances', async (req, res) => {
    Seance.findAll({
        include: {
            model: Module,
            attributes: ['titreModule', 'id'],
            include: {
                model: Formation,
                attributes: ['theme', 'id','approbation'],
                include: {
                    model: Collaborateur,
                    attributes: ['nom', 'prenom'],
                }
            }
        }
    })
    .then((seances) => {
        const formattedSeances = seances.map((seance) => {
            return {
                date: seance.date,
                heureentree: seance.heureStart,
                heuresortie: seance.heureEnd,
                places: seance.nombreDePlaces,
                formation: seance.Module.Formation.theme,
                module: seance.Module.titreModule,
                nomOrganisateur: seance.Module.Formation.Collaborateur.nom,
                prenomOrganisateur: seance.Module.Formation.Collaborateur.prenom,
                idModule: seance.Module.id,
                idFormation: seance.Module.Formation.id,
                approbation:seance.Module.Formation.approbation,
            };
        });
        res.status(200).json(formattedSeances);
        console.log(formattedSeances);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des séances.' });
    });
});

router.get('/seances/:idModule', async (req, res) => {
    try{
        const idModule = req.params.idModule;
 
         //Recherche de la formation ayant cet id
         const module = await Module.findAll({
             where : {
                 id : idModule,
            }
         })
 
         if (!module || module.length === 0){
             return res.status(404).json({message: 'Aucun module trouvé pour cette formation'})
         }
 
         //Récupérations des modules associés à cette formation
         const seances = await Seance.findAll({
             where : {module: module.map(module => module.id)},
             include : {model : Module}
         })
 
         res.json(seances);
 
     } catch (error) {
         console.error(error);
         res.status(500).json({message : 'Erreur lors de la récupération des séances'})
     }
 }
)

router.get('/seancesParFormation/:idformation', async (req, res) => {
    try{
        const idformation = req.params.idformation;
 
         //Recherche de la formation ayant cet id
         const module = await Module.findAll({
             where : {
                 formation : idformation,
            }
         })
 
         if (!module || module.length === 0){
             return res.status(404).json({message: 'Aucun module trouvé pour cette formation'})
         }
 
         //Récupérations des modules associés à cette formation
         const seances = await Seance.findAll({
             where : {module: module.map(module => module.id)},
             include : {model : Module}
         })
 
         res.json(seances);
 
     } catch (error) {
         console.error(error);
         res.status(500).json({message : 'Erreur lors de la récupération des séances'})
     }
 }
)
module.exports = router;
