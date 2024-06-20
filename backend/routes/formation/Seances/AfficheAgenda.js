const express = require('express');
const router = express.Router();
const Agenda = require('../../../Modele/formation/Seances/SeanceFormation');
const Formation = require('../../../Modele/formation/Formation');
const Collab = require('../../../Modele/CollabModel/Collab');

// Route GET pour récupérer toutes les dates de l'agenda
router.get('/agenda', async (req, res) => {
  try {
    // Récupérez toutes les entrées de l'agenda depuis la base de données
    const agendaEntries = await Agenda.findAll({
      include: {
        model: Formation,
        attributes: ['theme', 'formateur', 'confidentialite','module']
      }
    });
    // Retournez les entrées de l'agenda en tant que réponse JSON
    res.status(200).json(agendaEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/seance/:id', async (req, res) => {
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


//Route pour mettre à jour un seance existants
router.put('/edit/:id', async (req, res) => {
  try {
    const {title, start, end, nombreDePlaces, formation} = req.body;

    const { id } = req.params;

  
      const seanceToEdit = await Agenda.findByPk(id);

      if (!seanceToEdit) {
        res.status(404).json({ error: 'Séance introuvable' })
      }

      const agendaEntry = await seanceToEdit.update({
        date : start,
        heureStart : start,
        heureEnd : end,
        nombreDePlacesReservees : 0,
        nombreDePlaces : nombreDePlaces,
        title : title,
        formation : formation,
        approbation : 1
      });


    res.status(201).json(agendaEntry)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' })
  }
})


//Récupérer les informations d'une concernant une formation
router.get('/view/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const seance = await Agenda.findByPk(
      id, 
      {
      include: [{
        model: Formation,
        include : {
          model: Collab,
          as: 'Formateur',
          attributes: ['id','nom', 'prenom','image'],
        }
      }],
      attributes: ['id', 'date', 'heureStart', 'heureEnd', 'formation', 'nombreDePlaces', 'title','module']

    });

    if (!seance) {
      res.status(404).json({ error: 'Séance introuvable' })
    }


    res.status(201).json(seance)
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des séances", error);
    res.status(500).json({ error: 'Erreur lors de la récupération des informations concernant les formations' })
  }
})



module.exports = router;
