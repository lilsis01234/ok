const express = require('express');
const router = express.Router();
const   Conge = require('../../../Modele/conge/CongeModel');
const Collab = require('../../../Modele/CollabModel/Collab');
const Type = require('../../../Modele/conge/Types');

// Route GET pour récupérer toutes les dates de l'agenda
router.get('/agendaConge', async (req, res) => {
  try {
    // Récupérez toutes les entrées de l'agenda depuis la base de données
    const agendaEntries = await Conge.findAll({
      
      include: 
      [{
        model: Collab,
        attributes: ['nom', 'prenom', 'matricule']
       },
        
       {
        model : Type,
        attributes:['nom']
       }
      ]
    });
    // Retournez les entrées de l'agenda en tant que réponse JSON
    res.status(200).json(agendaEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/conge/:id',async(req,res) =>{
  const { id } = req.params;
    try {
        const deletedSeance = await Conges.findByPk(id);
        if (!deletedSeance) {
            return res.status(404).json({ error: 'discussion introuvable' });
        }
        await deletedSeance.destroy();
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Erreur lors de la suppression de la séance :', error)
        res.status(500).json({ message: 'Erreur lors de la suppression' })
    }
})

router.post('/agendaConge', async (req, res) => {
  try {
    const eventsData = req.body.events;

    const agendaEntries = await Promise.all(eventsData.map(async event => {
      const { start, end,Collab,motif, description } = event;

      const agendaEntry = await Conges.create({
        dayStart: start,
        dayEnd: end, 
        collaborateur: Collab,
        description: description,
        motif: motif,
        approbation: 0
      });
      return agendaEntry;
    }));

    res.status(201).json(agendaEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


module.exports = router;
