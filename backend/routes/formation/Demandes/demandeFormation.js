const Sequelize = require('sequelize');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const {  DemandeFormation2,Collab2,DemandeCollab } = require('../../../Modele/formation/associationDemande/associationDemandeCollab');
const {  DemandeFormation,Equipe2,DemandeEq,  } = require('../../../Modele/formation/associationDemande/associationDemandeEq');
const RoleHierarchique = require('../../../Modele/RoleModel/RoleHierarchique');
const Seance = require('../../../Modele/formation/Seances/Seance');
const Collab = require('../../../Modele/CollabModel/Collab');
const Formation = require('../../../Modele/formation/Formation');
const FormationCollab = require('../../../Modele/formation/PublicCible/PublicCibleCollab');
const FormationEq = require('../../../Modele/formation/PublicCible/PublicCibleEquipe');
const Module = require('../../../Modele/formation/Modules/Module');

router.post('/addDemandeFormationPublic', async (req, res) => {
    try {
        const newDemande = await DemandeFormation.create({
            theme: req.body.theme,
            description: req.body.description,
            auteur: req.body.auteur,
            destinataireDemande: req.body.destinataire,
            approbation:null,
            confidentialite:req.body.confidentialite
        });
        res.status(201).json(newDemande);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/addDemandeFormationPrivate', async (req, res) => {
    try {
        const newDemande = await DemandeFormation.create({
            theme: req.body.theme,
            description: req.body.description,
            auteur: req.body.auteur,
            destinataireDemande: req.body.destinataire,
            approbation: null,
            confidentialite: req.body.confidentialite
        });

        const demandeFormationId = newDemande.id;

        const collaborateurs = req.body.collaborateurs;
        const equipe = req.body.equipe;

        if (collaborateurs && collaborateurs.length !== 0) {
            await Promise.all(collaborateurs.map(async (collaborateurId) => {
                await DemandeCollab.create({
                    demande: demandeFormationId,
                    collaborateur: collaborateurId,
                });
            }));
        }

        if (equipe && equipe.length !== 0) {
            await DemandeEq.create({
                demande: demandeFormationId,
                equipe: equipe,
            });
        }

        res.status(201).json(newDemande);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/demande/:idDemande', async (req, res) => {
    const idDemande = req.params.idDemande;

    try {
        const demandes = await DemandeFormation.findAll({
            include: [
                {
                    model: Collab2,
                    as: 'Auteur',
                    attributes: ['nom', 'prenom','image'],
                },
            ],
            where: {
                id: idDemande,
            },
        });

        const Collabs = await DemandeCollab.findAll({
            where: { demande: idDemande },
            include:
            [
                {
                    model:Collab2
                },
                {
                    model:DemandeFormation2
                }
            ]
        });

        const equipe = await DemandeEq.findAll({
            where: { demande: idDemande },
            include : 
            [
                {
                    model:Equipe2
                },
                {
                    model:DemandeFormation
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

router.get('/all', async (req, res) => {
      try {
        const demandes = await DemandeFormation.findAll({
          include: [
            {
              model: Collab,
              as: 'Auteur',
              attributes: ['nom', 'prenom','image'],
            },
          ],
          where: {
            approbation: null,
          },
        });
        res.status(200).json(demandes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
});

router.get('/all_demande/:id', async(req,res)=>{
    const id = req.params.id
    try{
        const mesDemandes = await DemandeFormation.findAll({
            include:{
                model: RoleHierarchique,
                attributes:['roleHierarchique']
            },
            where:{
                auteur:id
            }
        })
        res.status(200).json(mesDemandes)
    }
    catch(err){
        console.error(err)
    }
})

router.post('/approuver/:id', async (req, res) => {
    const DemandeformationId = req.params.id;

    try {
        // Find the demandeFormation by primary key
        const updatedFormation = await DemandeFormation.findByPk(DemandeformationId);

        if (!updatedFormation) {
            return res.status(404).json({ message: "Formation not found." });
        }
        // Create a new Formation based on the updatedFormation
        const formationApp = await Formation.create({
            theme: updatedFormation.theme,
            description: updatedFormation.description,
            formateur: updatedFormation.auteur,
            confidentialite: updatedFormation.confidentialite,
            formateurExt: null,
        });

        // Check if confidentialite is 1 and handle Collabs and Equipe
        if (updatedFormation.confidentialite === 1) {
            const Collabs = await DemandeCollab.findAll({
                where: { demande: DemandeformationId },
            });

            await FormationCollab.bulkCreate(
                Collabs.map((collab) => ({
                    formation: formationApp.id,
                    collaborateur: collab.collaborateur,
                }))
            );

            const equipe = await DemandeEq.findAll({
                where: { demande: DemandeformationId },
            });

            await FormationEq.bulkCreate(
                equipe.map((eq) => ({
                    formation: formationApp.id,
                    equipe: eq.equipe,
                }))
            );
        }

        await DemandeFormation.update(
            { approbation: 1 },
            { where: { id: DemandeformationId }}
        );

        return res.status(200).json({ message: "Formation approved successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while approving the formation." });
    }
});

router.post('/desapprouver/:id', async(req,res)=>{
    const formationId = req.params.id;
      try{
          const updatedFormation = await DemandeFormation.update(
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

router.delete('/formation/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedFormation = await Formation.findByPk(id);
        if (!deletedFormation) {
            return res.status(500).json({ error: 'formation introuvable' });
        }

        const ModulesToDelete = await Module.findAll({
            where: {
                formation: deletedFormation.id
            }
        });

        // Parcourir les modules
        for (const moduleInstance of ModulesToDelete) {
            await moduleInstance.destroy();
        }

        const SeancesToDelete = await Seance.findAll({
            where: {
                formation: deletedFormation.id
            }
        });

        // Parcourir les séances
        for (const seanceInstance of SeancesToDelete) {
            await seanceInstance.destroy();
        }

        await deletedFormation.destroy();
        res.sendStatus(204);
    } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
});


router.delete('/demande_formation/:id',async(req,res)=>{
    const { id } = req.params.id;
    try {
        const deletedFormation = await DemandeFormation.findByPk(id);
        if (!deletedFormation) {
            return res.status(404).json({ error: 'demande introuvable' });
        }
        await deletedFormation.destroy();
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Erreur lors de la suppression :', error)
        res.status(500).json({ message: 'Erreur lors de la suppression' })
    }
})

router.get('/demandesPourVous/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const demandePourVous = await DemandeCollab.findAll({
            where:{
                collaborateur:id
            },
            include:[
                {
                    model:DemandeFormation2
                },
                {
                    model:Collab2
                }
            ]
        })
    res.status(200).json(demandePourVous)
    }
    catch(err){
        console.error(err)
    }
})

router.get('/demandesPourVotreEquipe/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const demandePourVotreEquipe = await DemandeEq.findAll({
            where:{
                equipe:id
            },
            include:[
                {
                    model:DemandeFormation
                },
                {
                    model:Equipe2
                }
            ]
        })
    res.status(200).json(demandePourVotreEquipe)
    }
    catch(err){
        console.error(err)
    }
})

module.exports = router;