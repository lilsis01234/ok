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
              as: 'Collaborateur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Collaborateur,
              as: 'Formateur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Departement,
              as: 'Departement',
              attributes: ['nomDepartement'], // Supposons que vous voulez seulement le nom du département, ajustez-le en conséquence.
            },
          ],
          attributes: ['id', 'theme', 'description', 'auteur', 'personneAFormer', 'formateur', 'departementAFormer'],
            where:
            {
                [Sequelize.Op.and]: [
                    { approbation1: 1 }, // Formation sans approbation nécessaire
                    { destinataireDemande: null }, // Formation sans destinataire spécifique
                    {departementAFormer:null},//Formation sans departement spécifique
                    {personneAFormer:null},//Formation sans personne spécifique à former
                ],
            },
    })
    .then((formation) => {
        res.status(200).json(formation)
        console.log(formation)
    }) 
})


//les formations qu'une équipe doit assister 
router.get('/all_formations_equipe/:idEquipe', async(req,res) => {
  const idEquipe = req.params.idEquipe
  Formation.findAll({
      include: [
          {
            model: Collaborateur,
            as: 'Auteur',
            attributes: ['nom', 'prenom'],
          },
          {
            model: Role2,
            as: 'Roledestinataire',
            attributes: ['titreRole'],
          },
          {
            model: Collaborateur,
            as: 'Collaborateur',
            attributes: ['nom', 'prenom'],
          },
          {
            model: Collaborateur,
            as: 'Formateur',
            attributes: ['nom', 'prenom'],
          },
          {
            model: Departement,
            as: 'Departement',
            attributes: ['nomDepartement'], // Supposons que vous voulez seulement le nom du département, ajustez-le en conséquence.
          },
        ],
        attributes: ['id', 'theme', 'description', 'auteur', 'personneAFormer', 'formateur', 'departementAFormer','destinataireDemande'],
      where:
      {
          approbation1: 1,
          departementAFormer:idEquipe,//A changer par le model équipe
      },
  })
  .then((formation) => {
      res.status(200).json(formation)
      console.log(formation)
  }) 
})

//Les formations dont une personne doit assister à cause d'une demande 
router.get('/all_formations/:idPersonne', async(req,res) => {
    const idPersonne = req.params.idPersonne
    Formation.findAll({
        include: [
            {
              model: Collaborateur,
              as: 'Auteur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Role2,
              as: 'Roledestinataire',
              attributes: ['titreRole'],
            },
            {
              model: Collaborateur,
              as: 'Collaborateur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Collaborateur,
              as: 'Formateur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Departement,
              as: 'Departement',
              attributes: ['nomDepartement'], // Supposons que vous voulez seulement le nom du département, ajustez-le en conséquence.
            },
          ],
          attributes: ['id', 'theme', 'description', 'auteur', 'personneAFormer', 'formateur', 'departementAFormer','destinataireDemande'],
        where:
        {
            approbation1: 1,
            departementAFormer:null,
            personneAFormer:idPersonne,
            destinataireDemande: {
                [Sequelize.Op.not]: null,
            },
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
                where:{
                    module:modules
                }
            })
            const formation = await Formation.findByPk(formationId)
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
          attributes: ['titreRole2'],
        },
        {
          model: Collaborateur,
          as: 'Collaborateur',
          attributes: ['nom', 'prenom'],
        },
        {
          model: Collaborateur,
          as: 'Formateur',
          attributes: ['nom', 'prenom'],
        },
        {
          model: Departement,
          as: 'Departement',
          attributes: ['nomDepartement'],
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
            personneAFormer: formation.Collaborateur ? `${formation.Collaborateur.nom} ${formation.Collaborateur.prenom}` : null,
            departementAFormer: formation.Departement ? formation.Departement.nomDepartement : null,
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
            approbation1:1
        }))
        const formation = await newFormation.save();
        res.status(201).json(formation);
    }
    catch(err){
        console.error(err)
    }

})

module.exports = router;