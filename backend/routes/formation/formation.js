const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());


const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/CollabModel/Collab');
const Module = require('../../Modele/formation/Modules/Module');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Formation2, Collab3, FormationCollab} = require('../../Modele/formation/associationFormation/associationCollabFormation');
const Collab = require('../../Modele/CollabModel/Collab');
const GroupFormation = require('../../Modele/formation/PublicCible/GroupFormation');




//Récupérer toutes les formation
router.get('/all', async(req, res) => {
  try {
    const formation =  await Formation.findAll({
      include : [
        {
          model : Collaborateur,
          as : 'Formateur',
          attributes : ['id', 'nom', 'prenom', 'image']
        }
      ],
      attributes : ['id', 'theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'demande', 'dateDebutFormation', 'dateFinFormation']
  })



    res.status(200).json(formation)
  } catch (error) {
      console.log('Une erreur s\'est produit lors de la récupération des formation', error)
      res.status(500).json({error : 'Une erreur s\'est produite lors de la récupération des formations'})
  }

})

function buildCriteria(criteria){
  const where = {};
  for (let key in criteria){
    let value = criteria[key];
    if(Array.isArray(value)){
      where[key] = {[Op.or] : value};
    } else {
      where[key] = value
    }
  }

  return where;
}


//Ajout Formation
router.post('/new', async(req, res) => {
    try {
      const {theme, description, confidentialite, formateur, formateurExt, critere, dateDebutFormation, dateFinFormation} = req.body;
      
      const formation = await Formation.create({
          theme : theme,
          description : description,
          confidentialite : confidentialite,
          formateur : formateur,
          formateurExt : formateurExt,
          dateDebutFormation : dateDebutFormation,
          dateFinFormation : dateFinFormation,
          demande : 'false',

      })



      if(confidentialite === 'Privée'){
          // console.log('On est dans le critère privée')
          if(critere){
            const collaborateur = await Collab.findAll({
              where : buildCriteria(critere)
            })


            for (const collab of collaborateur){
              await GroupFormation.create({
                formation : formation.id,
                collaborateur : collab.id
              })

            }
          }
      }

      //Création d'une module principale par défaut 
      const newModule  = await Module.create({
          titreModule : req.body.theme,
          description : req.body.description,
          formation : formation.id
      })

      await newModule.save();




      res.status(201).json(formation)


    } catch (error) {
      console.error(error)
      res.status(500).json({error : 'Erreur lors de l\'ajout des formations'})
    }
})


//Récuperer les fomartions où le collaborateur est membre
router.get('/all/userFormation/:id', async(req, res) => {
  try {
      const {id} = req.params;
      //Récupération de toutes les formations publics
      const formationPublic = await Formation.findAll({
          where : {
            confidentialite : 'Public'
          },
          include : [
            {
              model : Collaborateur,
              as : 'Formateur',
              attributes : ['id', 'nom', 'prenom', 'image']
            }
          ],
      })


      //Récupération de toutes les formations privées ou le collaborateur est membre
      const formationPrivee = await Formation.findAll({
        where : {
          confidentialite : 'Privée'
        },
        include : [
          {
            model : GroupFormation,
            where : {
              collaborateur : id
            }
          },
          {
            model : Collaborateur,
            as : 'Formateur',
            attributes : ['id', 'nom', 'prenom', 'image']
          }
        ],
      })


      const formation = [...formationPublic, ...formationPrivee]
      formation.sort((a, b) => b.createdAt - a.createdAt);



      res.status(200).json(formation)

  } catch (error) {
    console.error(error)
    res.status(500).json({error : 'Erreur lors de la récupération des formations'})
  }
})


//Modifier les formations
router.put('/edit/:id', async(req, res) => {
  try {
    const {theme, description, confidentialite, formateur, formateurExt, critere, dateDebutFormation, dateFinFormation} = req.body;
    
    //Reperer les information à modifier
    const formation = await Formation.findByPk(id);

    const formationToUpdate = await Formation.update({
      theme : theme,
      description : description,
      confidentialite : confidentialite,
      formateur : formateur,
      formateurExt : formateurExt,
      dateDebutFormation : dateDebutFormation,
      dateFinFormation : dateFinFormation,
    })

   //Récupérer les membres de la formation à modifier
   if(formation.confidentialite === 'Privée') {
      const allFormationMember = GroupFormation.findAll({
        where : {
          formation : formation.id
        }
      })

      if(formationToUpdate.confidentialite = 'Public'){
        for(const group in allFormationMember){
          await group.destroy()
        }
      } else if (formationToUpdate.confidentialite === 'Privée'){
          if (critere){
            const collaborateur = await Collab.findAll({
              where : buildCriteria(critere)
            })
  
            for(const collab of collaborateur){
                const collabFormation = await GroupFormation.findOne({
                  where : {
                    formation : formation.id,
                    collaborateur : collab.id
                  }
                })
  
                if(!collabFormation){
                   await GroupFormation.create({
                      formation : formation.id,
                      collaborateur : collab.id
                   })
                }
            }
          }
      } else if (formation.confidentialite === 'Public'){
        if(formationToUpdate.confidentialite = 'Privée') {
          if(critere){
              const collaborateur = await Collab.findAll({
                  where : buildCriteria(critere)
              })


              for(const collab of collaborateur){
                  await GroupFormation.create({
                    formation : formationToUpdate.id,
                    collaborateur : collab.id
                  })
              }
          }
        }
      }


      res.status(201).json(formation)
   }
  } catch (error) {
      console.error(error)
      res.status(500).json({error: 'Erreur lors de la récupération des formations'})
  }
})


//Récupérer toutes les formations formés par un collaborateur
router.get('/all/formateur/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const formation = await Formation.findAll({
      where : {
          formateur : id
      },
      include : [
        {
          model : Collaborateur,
          as : 'Formateur',
          attributes : ['id', 'nom', 'prenom', 'image']
        }
      ],
      attributes : ['id', 'theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'demande', 'dateDebutFormation', 'dateFinFormation']
    })

    res.status(200).json(formation)
  } catch (error) {
      console.error(error)
      res.status(500).json({error : 'Erreur lors de la récupération des formations.'})
  }
})


//Récupérer les formations formés par des formateurs externes
router.get('/all/formateurExt', async(req, res) => {
  try {
    const formation = await Formation.findAll({
      where : {
         formateurExt : {[Op.not] : null}
      },
      include : [
        {
          model : Collaborateur,
          as : 'Formateur',
          attributes : ['id', 'nom', 'prenom', 'image']
        }
      ],
      attributes : ['id', 'theme', 'description', 'formateur', 'formateurExterne', 'confidentialite', 'demande', 'dateDebutFormation', 'dateFinFormation']
    })
    res.status(200).json(formation)
  } catch (error) {
      console.error(error)
      res.status(500).json({error : 'Erreur lors de la récupération des formations'})
  }
})


//Supprimer une formation 
router.delete('/delete/:id', async(req, res) => {
    try {
      const {id} = req.params;
      const formationToDelete = await Formation.findByPk(id);

      if(!formationToDelete){
        res.status(500).json({error : 'Formation introuvable'})
      }

      const groupFormation = await GroupFormation.findAll({
        where : {
          formation : formationToDelete.id
        }
      })


      if(groupFormation){
        for(const groupe of groupFormation){
          await groupe.destroy();
        }
      }

      await formationToDelete.destroy();

      res.status(200).json('Formation supprimé avec succès')

    } catch (error) {
      console.error(error)
      res.status(500).json({error : 'Erreur lors de la suppression des formations'})
    }
})



//Récupérer toutes les formations publics
router.get('/all/publicFormation', async(req, res) => {
  try {
    const publicFormation = await Formation.findAll({
      include : [
        {
          model : Collaborateur,
          as : 'Formateur',
          attributes : ['id', 'nom', 'prenom', 'image']
        }
      ], 
    })
    res.status(200).json(publicFormation)
  } catch (error) {
    
  }
})



//Toutes les formations dont tout le monde peut assister
router.get('/all_formations', async(req,res) => {
    Formation.findAll({
        include: [
            {
              model: Collaborateur,
              as: 'Formateur',
              attributes: ['id','nom', 'prenom','image'],
            },
          ],
          attributes: ['id', 'theme', 'description', 'formateur','formateurExterne'],
            where:
            {
              confidentialite:0,
            },
    })
    .then((formation) => {
        res.status(200).json(formation)
        console.log(formation)
    }) 
})

router.get('/all_private', async(req,res) => {
  Formation.findAll({
      include: [
          {
            model: Collaborateur,
            as: 'Formateur',
            attributes: ['id','nom', 'prenom','image'],
          },
        ],
        attributes: ['id', 'theme', 'description', 'formateur','formateurExterne'],
          where:
          {
            confidentialite:1,
          },
  })
  .then((formation) => {
      res.status(200).json(formation)
      console.log(formation)
  }) 
})

router.get('/all_from_demande',async(req,res)=>{
  Formation.findAll({
    include: [
        {
          model: Collaborateur,
          as: 'Formateur',
          attributes: ['id','nom', 'prenom','image'],
        },
      ],
      attributes: ['id', 'theme', 'description', 'formateur','formateurExterne'],
        where:
        {
          demande:1,
        },
  })
  .then((formation) => {
      res.status(200).json(formation)
      console.log(formation)
  }) 
})


router.post('/addFormExt/:id', async(req,res)=>{
  const formationId = req.params.id;
  const formateurExt = req.body.formateurExt
  try{
      const updatedFormation = await Formation.update(
          {
            formateurExterne: formateurExt,
          },
          {
              where: {
                  id: formationId
              }
          }
      )        
  
      if (updatedFormation[0] === 0) {
          return res.status(404).json({ message: "Formation not found." });
      }

      return res.status(200).json({ message: "Formateur bien ajouté." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
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
          
            const formation = await Formation.findByPk(formationId, {
              include: [
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

            res.status(200).json({formation,modules});
        
        } 
        catch (error) {
            console.error('Erreur lors de la récupération des informations de la formation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des informations de la formation' });
        }
});

//Les formations organisées par une personne
router.get('/formations/:idPersonne', async(req, res) => {
  const idPersonne = req.params.idPersonne
  try {
    const formation = await Formation.findAll({
      where : {
        formateur : idPersonne
      }, 
      include : {
        model : Collaborateur,
        as : 'Formateur',
        attributes : ['nom', 'prenom', 'matricule', 'image']
      },
    })

    res.status(200).json(formation)
  } catch (error) {
    console.error('Error');
    res.status(404).json('Erreur lors de la récupération des formation organisé par une personne')
  }
})



router.get('/formationsPourMoi/:idPersonne',async(req,res)=>{

  const id = req.params.idPersonne;
  try{
    const formation = await FormationCollab.findAll({
      include : {
        model : Formation2
      },
      where : {
        collaborateur:id
      }
    })
      res.status(200).json(formation)
  }
  catch(error){
    console.error(error)
  }
})

//Ajout de formation par un formateur interne de l'entreprise
router.post('/addFormation',async(req,res)=>{
    try{
        const newFormation = await(Formation.create({
            theme:req.body.theme,
            description:req.body.description,
            formateur:req.body.formateur,
            confidentialite:0,
            formateurExt:null
        }))
        const formation = await newFormation.save();
        res.status(201).json(formation);
    }
    catch(err){
        console.error(err)
    }
})

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const formAediter = await Formation.findByPk(id);

    if (!formAediter) {
      return res.status(404).json({ error: 'Formation introuvable' });
    }

    const editedFormation = await formAediter.update({
      theme: req.body.theme,
      description: req.body.description
    });

    res.status(201).json(editedFormation);
  } catch (error) {
    console.error('Erreur lors de la mise à jour', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

module.exports = router;
