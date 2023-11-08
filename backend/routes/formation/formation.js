const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());


const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/CollabModel/Collab');
const Seance = require('../../Modele/formation/Seance');
const Module = require('../../Modele/formation/Module');
const Role2 = require('../../Modele/RoleModel/RoleHierarchique');
const Departement = require('../../Modele/Structure/TestDepartement')
const Sequelize = require('sequelize');


//Toutes les formations dont tout le monde peut assister
router.get('/all_formations', async(req,res) => {
    Formation.findAll({
        include: [
            {
              model: Collaborateur,
              as: 'Auteur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Collaborateur,
              as: 'Formateur',
              attributes: ['nom', 'prenom'],
            },
          ],
          attributes: ['id', 'theme', 'description', 'auteur','formateur'],
            where:
            {
              destinataireDemande: null
            },
    })
    .then((formation) => {
        res.status(200).json(formation)
        console.log(formation)
    }) 
})


//Les modules et séances d'une formation
router.get('/all_informations/:idformation', async(req,res)=>{
    const formationId = req.params.idformation;
        try {
            const modules = await Module.findAll({
                where:
                    {
                        formation: formationId,
                    },
            });
            const seances = await Seance.findAll({
              where: {
                  module: modules,
              },
              include: [
                  {
                      model: Module, 
                      attributes: ['id', 'titreModule', 'description'],                   },
              ],
          });
          
            const formation = await Formation.findByPk(formationId, {
              include: [
                  {
                      model: Collaborateur,
                      as: 'Auteur',
                      attributes: ['nom', 'prenom'],
                  },
                  {
                      model: Role2,
                      attributes: ['roleHierarchique'],
                  },
                  {
                      model: Collaborateur,
                      as: 'Formateur',
                      attributes: ['nom', 'prenom'],
                  },
              ],
          });
            
            if (!formation) {
                return res.status(404).json({ error: 'Formation introuvable' });
            }
            res.status(200).json({formation,modules,seances});
        } catch (error) {
            console.error('Erreur lors de la récupération des informations de la formation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des informations de la formation' });
        }
    });


    //demandes de formations d'une personne
    router.get('/mesDemandes/:idPersonne', async (req, res) => {
      const idPersonne = req.params.idPersonne;
    
      try {
        const formations = await Formation.findAll({
          where: {
            [Sequelize.Op.and]: [
              { auteur: idPersonne },
              { destinataireDemande: { [Sequelize.Op.not]: null } }, // Add this condition
            ],
          },
        });
        res.json(formations);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });


//Les formations organisées par une personne
router.get('/formations/:idPersonne',async(req,res)=>{
    const idPersonne = req.params.idPersonne;
    Formation.findAll({
      include: [
        {
          model: Collaborateur,
          as: 'Auteur',
          attributes: ['nom', 'prenom'],
        },
        {
          model: Role2,
          attributes: ['roleHierarchique'],
        },
        {
          model: Collaborateur,
          as: 'Formateur',
          attributes: ['nom', 'prenom'],
        },
      ],
        where: {
            formateur: idPersonne,
        }
    })
    .then((formation) => {
        res.status(200).json(formation.map((formation) => {
          return {
            id: formation.id,
            theme: formation.theme,
            description: formation.description,
            auteur: formation.Auteur ? `${formation.Auteur.nom} ${formation.Auteur.prenom}` : null,
            formateur: formation.Formateur ? `${formation.Formateur.titreRole}` : null,
          };
        }))
        console.log(formation)
    }) 
})

//Ajout de formation par un formateur interne de l'entreprise
router.post('/addFormation',async(req,res)=>{
    try{
        const newFormation = await(Formation.create({
            theme:req.body.theme,
            description:req.body.description,
            duree:req.body.duree,
            formateur:req.body.formateur,
            auteur:req.body.auteur,
        }))
        const formation = await newFormation.save();
        res.status(201).json(formation);
    }
    catch(err){
        console.error(err)
    }
})


module.exports = router;