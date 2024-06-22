const express = require('express');
const router = express.Router();
const Agenda = require('../../../Modele/formation/Seances/SeanceFormation');
const moment = require('moment');
const timezone = require('moment-timezone');
moment.tz.setDefault('Indian/Antananarivo');

router.post('/agenda', async (req, res) => {
  try {
    const eventsData = req.body.events;
    const formation = req.body.idformation;

    const agendaEntries = await Promise.all(eventsData.map(async event => {
      const { start, end, title, nombreDePlaces,module } = event;

      const agendaEntry = await Agenda.create({
        date: start,
        heureStart: start,
        heureEnd: end, 
        nombredePlacesReservees: 0,
        nombreDePlaces: nombreDePlaces,
        title: title,
        module:module,
        formation:formation,
        approbation: 1
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
