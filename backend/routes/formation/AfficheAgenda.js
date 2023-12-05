const express = require('express');
const router = express.Router();
const  Agenda  = require('../../Modele/formation/Seance');

// Route GET pour récupérer toutes les dates de l'agenda
router.get('/agenda', async (req, res) => {
  try {
    // Récupérez toutes les entrées de l'agenda depuis la base de données
    const agendaEntries = await Agenda.findAll();
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

module.exports = router;
