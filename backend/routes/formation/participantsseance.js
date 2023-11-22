const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const ParticipantsSeanceCollab = require('../../Modele/formation/ParticipantsSeance');
const ParticipantsSeanceEquipe = require('../../Modele/formation/EquipeSeance');
const Collab = require('../../Modele/CollabModel/Collab');
const Seance = require('../../Modele/formation/Seance');
const Equipe = require('../../Modele/Structure/Equipe');

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

router.post('/addEquipeSeanceOnline', async(req,res)=>{
    try {
        const newParticipantSeance = await ParticipantsSeanceEquipe.create({
            seance: req.body.seance,
            equipe: req.body.equipe,
            online: req.body.online,
        });
        const newPartSeance = await newParticipantSeance.save();
        res.status(201).json(newPartSeance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la création de la discussion' });
    }
})

router.get('/allCollab/:idSeance', async(req,res)=>{
    const idSeance = req.params.idSeance
    try{
        const allParticipantSeance = ParticipantsSeanceCollab.findAll( 
            {
                include:
                    {
                        model: Collab,
                        attributes: ['nom', 'prenom'],
                    }
            },
            {
                where:
                {
                    seance:idSeance
                }
            }   
          )
        res.status(200).json(allParticipantSeance);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la création de la discussion' });
    }
})

router.get('/allEquipeSeance', async(req,res)=>{
    try{
        const equipeSeance = ParticipantsSeanceEquipe.findAll([
            {
                include:
                [
                    {
                        model:Equipe,
                        attributes: ['nom', 'prenom'],
                    },
                    {
                        model:Seance
                    }
                ]
            },
        ])
        res.status(200).json(equipeSeance);

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la création de la discussion' });

    }
})

