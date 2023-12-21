const express = require('express');
const router = express.Router();
const Conges = require('../../../Modele/conge/CongeModel');
const moment = require('moment');
const timezone = require('moment-timezone');
moment.tz.setDefault('Indian/Antananarivo');

router.post('/agendaConge', async (req, res) => {
  try {
    const eventsData = req.body.events;
    const Collab = req.body.collab; 

    const agendaEntries = await Promise.all(eventsData.map(async event => {
      const { start, end, motif, description } = event;

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
