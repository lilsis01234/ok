const express = require('express');
const router = express.Router();
const  Agenda  = require('../../../Modele/formation/Seances/Seance');
const Formation = require('../../../Modele/formation/Formation');

// Route GET pour récupérer toutes les dates de l'agenda
router.get('/agenda', async (req, res) => {
  try {
    // Récupérez toutes les entrées de l'agenda depuis la base de données
    const agendaEntries = await Agenda.findAll({
      include: {
        model: Formation,
        attributes: ['theme','formateur','confidentialite']
      }
    });
    // Retournez les entrées de l'agenda en tant que réponse JSON
    res.status(200).json(agendaEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/seance/:id',async(req,res) =>{
  const { id } = req.params;
    try {
        const deletedSeance = await Agenda.findByPk(id);
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


//Route pour mettre à jour un formation existants
router.put('/edit/:id', async(req, res) => {
  try {
    const eventsData = req.body.events;
    const formation = req.body.idformation;

    const {id} = req.params;
  
    const agendaEntries = await Promise.all(eventsData.map(async event => {
      const { start, end, title, nombreDePlaces } = event;

      const sceanceToEdit = await Agenda.findByPk(id);

      if(!sceanceToEdit){
        res.status(404).json({error : 'Scéance introuvable'})
      }

      const agendaEntry = await sceanceToEdit.update({
        date : start,
        heureStart : start,
        heureEnd : end, 
        nombreDePlacesReservees : 0,
        nombreDePlaces : nombreDePlaces,
        title : title,
        formation,
        approbation : 1
      });

      return agendaEntry;


    }))


    res.status(201).json(agendaEntries)

  } catch (error) {
    console.error(error);
    res.status(500).json({error : 'Erreur serveur'})
  }
})



module.exports = router;
