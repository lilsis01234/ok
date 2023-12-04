const Sequelize = require('sequelize');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
// const Formation = require('../../Modele/formation/Formation');
// const Collab = require('../../Modele/CollabModel/Collab');
const {  Formation2,Collab2,FormationCollab } = require('../../Modele/formation/associationFormationCollab');
const {  Formation,Equipe2,FormationEq } = require('../../Modele/formation/associationFormationDep');
const RoleHierarchique = require('../../Modele/RoleModel/RoleHierarchique');

router.get('/all', async(req,res)=>{
    try{
        const demandes = await Formation.findAll({
            include: [
                {
                    model: Collab2,
                    as: 'Auteur',
                    attributes: ['nom', 'prenom'],
                },
            ],
            where: {
                destinataireDemande: { [Sequelize.Op.not]: null },
                approbation: null,
            }
        })
        res.status(200).json(demandes)
    }
    catch(err){
        console.error(err)
    }
}
)

router.get('/allWithoutForm', async(req,res)=>{
    try{
        const demandes = await Formation.findAll({
            include: [
                {
                    model: Collab2,
                    as: 'Auteur',
                    attributes: ['nom', 'prenom'],
                },
            ],
            where: {
                destinataireDemande: { [Sequelize.Op.not]: null },
                formateurExt:  null ,
                approbation: 1
            }
        })
        res.status(200).json(demandes)
    }
    catch(err){
        console.error(err)
    }
}
)

router.get('/demande/:idDemande', async (req, res) => {
    const idDemande = req.params.idDemande;

    try {
        const demandes = await Formation.findAll({
            include: [
                {
                    model: Collab2,
                    as: 'Auteur',
                    attributes: ['nom', 'prenom'],
                },
            ],
            where: {
                destinataireDemande: { [Sequelize.Op.not]: null },
                // approbation: null,
                id: idDemande,
            },
        });

        const Collabs = await FormationCollab.findAll({
            where: { formation: idDemande },
            include:
            [
                {
                    model:Collab2
                },
                {
                    model:Formation2
                }
            ]
        });

        const equipe = await FormationEq.findAll({
            where: { formation: idDemande },
            include : 
            [
                {
                    model:Equipe2
                },
                {
                    model:Formation
                }
            ]
        });


        if (!Collabs) {
            res.status(200).json({demandes,equipe});
        }
        else if (!equipe) {
            res.status(200).json({demandes,Collabs});
        } 
        else {
            res.status(200).json({demandes,Collabs,equipe});
            console.log({ demandes, Collabs, equipe });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/all_demande/:id', async(req,res)=>{
    const id = req.params.id
    try{
        const mesDemandes = await Formation.findAll({
            include:{
                model: RoleHierarchique,
                attributes:['roleHierarchique']
            },
            where:{
                destinataireDemande: { [Sequelize.Op.not]: null },
                auteur:id
            }
        })
        res.status(200).json(mesDemandes)
    }
    catch(err){
        console.error(err)
    }
})


router.get('/alldemande/coatch', async (req, res) => {
    const coatch = "coatch";

    try {
        // Find IDs of coatch role in RoleHierarchique
        const idCoatch = await RoleHierarchique.findAll({
            attributes: ['id'],
            where: {
                roleHierarchique: {
                    [Sequelize.Op.like]: `%${coatch}%`, // Use `%` for wildcard matching
                },
            },
            raw: true, // Make sure to get raw data (array of objects)
        });

        // Extract the IDs from the array of objects
        const coatchIds = idCoatch.map(entry => entry.id);

        // Find formations where destinataireDemande is in the list of coatch IDs
        const demandes = await Formation.findAll({
            include: [
                {
                    model: Collab2,
                    as: 'Auteur',
                    attributes: ['nom', 'prenom'],
                },
            ],
            where: {
                destinataireDemande: {
                    [Sequelize.Op.in]: coatchIds,
                },
                approbation: null,
            },
        });

        res.status(200).json(demandes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Approbation
router.post('/approuver/:id', async(req,res)=>{
  const formationId = req.params.id;
    try{
        const updatedFormation = await Formation.update(
            {
                approbation: 1,
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

router.post('/desapprouver/:id', async(req,res)=>{
    const formationId = req.params.id;
      try{
          const updatedFormation = await Formation.update(
              {
                  approbation: 0,
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


router.post('/addDemandeFormation', async (req, res) => {
    try {
        // Create a new Formation
        const newDemande = await Formation.create({
            theme: req.body.theme,
            description: req.body.description,
            duree: req.body.duree,
            auteur: req.body.auteur,
            destinataireDemande: req.body.destinataire,
            approbation:null
        });

        const demandeFormationId = newDemande.id;

        // Get collaborators from the request body
        const collaborateurs = req.body.collaborateurs;

        const equipe = req.body.equipe;

        // Use Promise.all to wait for all FormationCollab creations
        if (collaborateurs && collaborateurs.length !== 0) {
            await Promise.all(collaborateurs.map(async (collaborateurId) => {
                // Create FormationCollab for each collaborateur
                await FormationCollab.create({
                    formation: demandeFormationId,
                    collaborateur: collaborateurId,
                });
            }));
        }

        if (equipe && equipe.length !== 0) {
            await FormationEq.create({
                formation: demandeFormationId,
                equipe: equipe,
            });
        }

        // Respond with the created Formation
        res.status(201).json(newDemande);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/addFormExt/:id', async(req,res)=>{
    const formationId = req.params.id;
    const formateurExt = req.body.formateurExt
    try{
        const updatedFormation = await Formation.update(
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

module.exports = router;