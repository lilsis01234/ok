const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());


const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/CollabModel/Collab');
const Module = require('../../Modele/formation/Modules/Module');
const Role2 = require('../../Modele/RoleModel/RoleHierarchique');
const Sequelize = require('sequelize');
const DemandeFormation = require('../../Modele/formation/Demandes/demandeFormation');


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
          attributes: ['id', 'theme', 'description', 'formateur'],
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

router.post('/addFormExt/:id', async(req,res)=>{
  const formationId = req.params.id;
  const formateurExt = req.body.formateurExt
  try{
      const updatedFormation = await DemandeFormation.update(
          {
              formateurExt: formateurExt,
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

      return res.status(200).json({ message: "Formation approved successfully." });
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
                      as: 'Auteur',
                      attributes: ['nom', 'prenom','image'],
                  },
                  {
                      model: Role2,
                      as: 'RoleHierarchique',
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

            res.status(200).json({formation,modules});
        
        } 
        catch (error) {
            console.error('Erreur lors de la récupération des informations de la formation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des informations de la formation' });
        }
    });


//Les formations organisées par une personne
router.get('/formations/:idPersonne',async(req,res)=>{
    const idPersonne = req.params.idPersonne;
    Formation.findAll({
      include: [
        {
          model: Collaborateur,
          as: 'Formateur',
          attributes: ['nom', 'prenom','image'],
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
