const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const ParticipantsSeanceCollab = require('../../../Modele/formation/ParticipantsSeance');
const ParticipantsSeanceEquipe = require('../../../Modele/formation/EquipeSeance');
const Collab = require('../../../Modele/CollabModel/Collab');
const Seance = require('../../../Modele/formation/Seance');
const Equipe = require('../../../Modele/Structure/Equipe');
const { where } = require('sequelize');

router.post('/addCollabSeancePres', async(req,res)=>{
    try {
        const newParticipantSeance = await ParticipantsSeanceCollab.create({
            seance: req.body.seance,
            collaborateur: req.body.collaborateur,
            online: req.body.online,
        });
        const newPartSeance = await newParticipantSeance.save();
        res.status(201).json(newPartSeance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la création de la discussion' });
    }
})

router.post('/addCollabSeanceEq', async(req,res)=>{
    try {
        const newEquipeSeance = await ParticipantsSeanceEquipe.create({
            seance: req.body.seance,
            equipe: req.body.equipe,
            online: req.body.online,
        });
        const newPartSeance = await newEquipeSeance.save();
        res.status(201).json(newPartSeance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la création de la discussion' });
    }
})

router.get('/allCollab/:idSeance', async (req, res) => {
    const idSeance = req.params.idSeance;
    try {
      const allParticipantSeance = await ParticipantsSeanceCollab.findAll({
        attributes: ['collaborateur'],
        where: {
          seance: idSeance,
        },
      });
  
      const collaboratorIds = allParticipantSeance.map((participant) => participant.collaborateur);
  
      const collabNames = await Collab.findAll({
        attributes: ['nom', 'prenom'],
        where: {
          id: collaboratorIds,
        },
      });
  
      const allEquipeSeance = await ParticipantsSeanceEquipe.findAll({
        attributes: ['equipe'],
        where: {
          seance: idSeance,
        },
      });
  
      const allCollabEquipeSeance = allEquipeSeance.map((participant) => participant.equipe);
  
      // Flatten the array of arrays into a single array of collaborateur IDs
      const flattenedCollabIds = [].concat(...allCollabEquipeSeance);
  
      const collabNames2 = await Collab.findAll({
        attributes: ['nom', 'prenom'],
        where: {
          id: flattenedCollabIds,
        },
      });
  
      res.status(200).json({ collabNames, collabNames2 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la récupération des noms de collaborateurs' });
    }
  });
  
module.exports = router;

