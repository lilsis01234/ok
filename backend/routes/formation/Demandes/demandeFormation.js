const Sequelize = require('sequelize');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const {  DemandeFormation2,Collab2,DemandeCollab } = require('../../../Modele/formation/associationDemandeCollab');
const {  DemandeFormation,Equipe2,DemandeEq,  } = require('../../../Modele/formation/associationDemandeEq');
const RoleHierarchique = require('../../../Modele/RoleModel/RoleHierarchique');
const Seance = require('../../../Modele/formation/Seance');
const Collab = require('../../../Modele/CollabModel/Collab');
const DemandeFormation= require('../../../Modele/formation/demandeFormation');

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
            destinataireDemande:{ [Sequelize.Op.not]: null },
            approbation: null,
          },
        });
        res.status(200).json(demandes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
});

router.get('/allWithoutFormateurExterne', async(req,res)=>{
    try{
        const demandes = await DemandeFormation.findAll({
            include: [
                {
                    model: Collab2,
                    as: 'Auteur',
                    attributes: ['nom', 'prenom','image'],
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
            where: { formation: idDemande },
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
            where: { formation: idDemande },
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

router.get('/all_demande/:id', async(req,res)=>{
    const id = req.params.id
    try{
        const demandesPourMoi = await DemandeFormation.findAll({
            include:{
                model: RoleHierarchique,
                attributes:['roleHierarchique']
            },
            where:{
                destinataireDemande: { [Sequelize.Op.not]: null },
                auteur:id
            }
        })
        res.status(200).json(demandesPourMoi)
    }
    catch(err){
        console.error(err)
    }
})

router.post('/approuver/:id', async(req,res)=>{
  const formationId = req.params.id;
    try{
        const updatedFormation = await DemandeFormation.update(
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

router.post('/addDemandeFormation', async (req, res) => {
    try {
        const newDemande = await DemandeFormation.create({
            theme: req.body.theme,
            description: req.body.description,
            auteur: req.body.auteur,
            destinataireDemande: req.body.destinataire,
            approbation:null
        });

        const demandeFormationId = newDemande.id;

        const collaborateurs = req.body.collaborateurs;

        const equipe = req.body.equipe;

        if (collaborateurs && collaborateurs.length !== 0) {
            await Promise.all(collaborateurs.map(async (collaborateurId) => {
                await DemandeCollab.create({
                    formation: demandeFormationId,
                    collaborateur: collaborateurId,
                });
            }));
        }

        if (equipe && equipe.length !== 0) {
            await DemandeEq.create({
                formation: demandeFormationId,
                equipe: equipe,
            });
        }
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

router.delete('/formation/:id', async(req,res) =>{
    const { id } = req.params.id;
    try {
        const deletedFormation = await DemandeFormation.findByPk(id);
        if (!deletedFormation) {
            return res.status(404).json({ error: 'demande introuvable' });
        }
        await deletedFormation.destroy();
        const SeancesToDelete = await Seance.findAll({
            where : {
                formation : deletedFormation
            }
        }
        )
        if(SeancesToDelete){
            await SeancesToDelete.destroy();
        }
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