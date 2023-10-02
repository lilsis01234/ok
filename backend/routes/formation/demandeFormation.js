const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());
const Sequelize = require('sequelize');


const Collaborateur = require('../../Modele/Collaborateur');
const Departement = require('../../Modele/Departement');
const Role2 = require('../../Modele/Role2');
const Module = require('../../Modele/formation/Module');
const Formation = require('../../Modele/formation/Formation');
const sequelize = require('../../database/database');
const DiscussionFormation = require('../../Modele/formation/DiscussionFormation');
const Seance = require('../../Modele/formation/Seance');
const { resourceLimits } = require('worker_threads');


//demandes acceptées par la direction
  router.get('/all_confirmed_formations', async (req, res) => {
    const idConsultant = await Role2.findOne ({
      where : {
        titreRole2: {
          [Sequelize.Op.like]: "formateurExt"
        }
    }})
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
      attributes: ['id', 'theme', 'description', 'auteur', 'personneAFormer', 'formateur', 'departementAFormer'],
      where: {
        approbation1: 0,
        destinataireDemande:idConsultant.id,
      },
    })
      .then((formationapprouved) => {
        res.status(200).json(
          formationapprouved.map((formation) => {
            return {
              id: formation.id,
              theme: formation.theme,
              description: formation.description,
              auteur: formation.Auteur ? `${formation.Auteur.nom} ${formation.Auteur.prenom}` : null,
              formateur: formation.Formateur ? `${formation.Formateur.titreRole}` : null,
              personneAFormer: formation.Collaborateur ? `${formation.Collaborateur.nom} ${formation.Collaborateur.prenom}` : null,
              departementAFormer: formation.Departement ? formation.Departement.nomDepartement : null,
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de formation.' });
      });
  });


// envoi des demandes pour la direction à partir des RRH
router.post('/envoiDirection/:id', async (req, res) => {
  const formationId = req.params.id;

  const idDirection = await Role2.findOne ({
    where : {
      titreRole2: {
        [Sequelize.Op.like]: "direction"
      }
  }})
  try {
      const updatedFormation = await Formation.update(
          {destinataireDemande:idDirection.id},
          { where: { id: formationId } }
      );

      if (updatedFormation[0] === 0) {
          return res.status(404).json({ message: "Formation not found." });
      }

      return res.status(200).json({ message: "Formation approved successfully." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
});


// annulation de l'envoi vers la direction
router.post('/annulationenvoiDirection/:id', async (req, res) => {
  const formationId = req.params.id;

  const idRrh = await Role2.findOne ({
    where : {
      titreRole2: {
        [Sequelize.Op.like]: "Rrh"
      }
  }})
  try {
      const updatedFormation = await Formation.update(
          {destinataireDemande:idRrh.id},
          { where: { id: formationId } }
      );

      if (updatedFormation[0] === 0) {
          return res.status(404).json({ message: "Formation not found." });
      }

      return res.status(200).json({ message: "Formation approved successfully." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
});


//les demandes approuvées par les RRH
router.get('/approuveparRrh', async (req, res) => {
const idDirection = await Role2.findOne ({
    where : {
      titreRole2: {
        [Sequelize.Op.like]: "direction"
      }
  }})
  try {
      const formation = await Formation.findAll(
          { where: { 
            destinataireDemande:idDirection.id,
            approbation1:0 
          } }
      );

      if (formation[0] === 0) {
          return res.status(404).json({ message: "pas de formation approuvé par les rrh." });
      }

      return res.status(200).json(formation);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
});


//approbation de la direction
router.post('/approbationDirection/:id', async (req, res) => {
  const formationId = req.params.id;
  const idConsultant = await Role2.findOne ({
    where : {
      titreRole2: {
        [Sequelize.Op.like]: "formateurext"
      }
  }})

  try {
      const updatedFormation = await Formation.update(
          {approbation1:0,
           destinataireDemande:idConsultant.id},
          { where: { id: formationId } }
      );

      if (updatedFormation[0] === 0) {
          return res.status(404).json({ message: "Formation not found." });
      }

      return res.status(200).json({ message: "Formation approved successfully." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
});

//annulation de l'approbation par la direction
router.post('/annulerApprobation/:id', async (req, res) => {
  const formationId = req.params.id;
  const idDirection = await Role2.findOne ({
    where : {
      titreRole2: {
        [Sequelize.Op.like]: "direction"
      }
  }})
  try {
      const updatedFormation = await Formation.update(
          {approbation1:0,
          destinataireDemande:idDirection.id},
          { where: { id: formationId } }
      );

      if (updatedFormation[0] === 0) {
          return res.status(404).json({ message: "Formation not found." });
      }

      return res.status(200).json({ message: "Formation approved successfully." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
});

// Approbation des Demandes par le coatch
router.post('/approuverpourCoatch/:id', async (req, res) => {
  const formationId = req.params.id;
  const idCoatch = Role2.findOne({
    where:{
      titreRole2:{
        [sequelize.Op.like]:"Coatch"
      }
    }
  })
  try {
      const updatedFormation = await Formation.update(
          { approbation1: 1 ,
          destinataireDemande:null},
          { where: { id: formationId ,
                    destinataireDemande:idCoatch.id} }
      );

      if (updatedFormation[0] === 0) {
          return res.status(404).json({ message: "Formation not found." });
      }

      return res.status(200).json({ message: "Formation approved successfully." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
});


//annulation de l'approbation par le coatch
router.post('/annulerapprobation/:id', async (req, res) => {
    const formationId = req.params.id;
    const idCoatch = Role2.findOne({
      where:{
        titreRole2:{
          [sequelize.Op.like]:"coatch"
        }
      }
    })
    try {
        const updatedFormation = await Formation.update(
            { approbation1: 0 },
            { where: { id: formationId,
              destinataireDemande:idCoatch.id } }
        );
        if (updatedFormation[0] === 0) {
            return res.status(404).json({ message: "Formation not found." });
        }
        return res.status(200).json({ message: "Formation approved successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while approving the formation." });
    } 
});


//desapprobation
router.delete('/desapprouver/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const deleteDemandeFormation = await Formation.findByPk(id);
      if (!deleteDemandeFormation) {
          return res.status(404).json({ error: 'Formation introuvable' });
      }
      
      const modules = await Module.findAll({
          where: {
              formation: id
          }
      });

      // Supprimer les séances associées à chaque module
      for (const module of modules) {
          await Seance.destroy({
              where: {
                  module: module.id
              }
          });
      }

      await DiscussionFormation.destroy({
          where: {
              formation: id
          }
      });

      // Supprimer les modules associés
      for (const module of modules) {
          await module.destroy();
      }

      // Supprimer la formation elle-même
      await deleteDemandeFormation.destroy();

      res.sendStatus(204);
  } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
});

//approbation du formateur externe
router.post('/approuverformext/:idFormation/:idFormateur',async(req,res)=>{
  const idFormation = req.params.idFormation;
  const idFormateur = req.params.idFormateur;
  try {
    const updatedFormation = await Formation.update(
        { approbation1: 1,
        formateur:idFormateur },
        { where: { id: idFormation} }
    );
    if (updatedFormation[0] === 0) {
        return res.status(404).json({ message: "Formation not found." });
    }
    return res.status(200).json({ message: "Formation approved successfully." ,updatedFormation});
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while approving the formation." });
} 
})

//annulation de l'approbation du formateur externe
router.post('/annulationapprouverformext/:idFormation',async(req,res)=>{
  const idFormation = req.params.idFormation;
  try {
    const updatedFormation = await Formation.update(
        { approbation1: 0 },
        { where: { id: idFormation} }
    );
    if (updatedFormation[0] === 0) {
        return res.status(404).json({ message: "Formation not found." });
    }
    return res.status(200).json({ message: "Formation approved successfully." ,updatedFormation});
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while approving the formation." });
} 
})

// ajout demande de formation
router.post('/addDemandeFormation',async(req,res)=>{
    try{
        const newFormation = await(Formation.create({
            theme:req.body.theme,
            description:req.body.description,
            duree:req.body.duree,
            formateur:req.body.formateur,
            auteur:req.body.auteur,
            departementAFormer: req.body.departementAFormer,
            personneAFormer:req.body.personneAFormer,
            destinataireDemande:req.body.destinataireDemande,
            approbation1:0,
        }))
        const demandeFormation = await newFormation.save();
        res.status(201).json(demandeFormation);
    }
    catch(err){
        console.error(err)
    }
})
//verification des receuils de demandes

module.exports = router;