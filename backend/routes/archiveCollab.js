const ArchiveCollab = require('../Modele/ArchiveCollab');
const Collaborateur = require('../Modele/Collaborateur');

const router = require('express').Router();

router.post('/:id/archive_collaborateur', async(req, res) => {
    const {id} = req.params;
    try {
        const collaborateur = await Collaborateur.findByPk(id);
        if (!collaborateur){
            return res.status(404).json({error : 'Collaborateur non trouvé'})
        }
        await ArchiveCollab.create({
            matricule : collaborateur.matricule,
            nom: collaborateur.nom,
            prenom : collaborateur.prenom,
            sexe : collaborateur.sexe,
            dateNaisance : collaborateur.dateNaisance,
            lot : collaborateur.lot,
            quartier : collaborateur.quartier,
            ville : collaborateur.ville,
            tel : collaborateur.tel,
            dateEmbauche : collaborateur.dateEmbauche,
            site : collaborateur.site,
            poste: collaborateur.poste,
            statut : req.body.statut
        })

        await collaborateur.destroy();
        return res.status(200).json({error : 'Collaborateur archivé avec succés'})
    }
    catch (err){
        console.error("Erreur lors de l'archivages des collaborateur", err);
        res.status(500).json({error : "Erreur lors de l'archivage des collaborateurs"})
    }
})

module.exports = router;