const ArchiveCollab = require('../../Modele/CollabModel/ArchiveCollab');
const Collab = require('../../Modele/CollabModel/Collab');

const {verifyToken} = require('../Compte/auth')
const router = require('express').Router();


router.post('/collab/:id',  async(req, res) => {
    const {id} = req.params;
    try {
        const collaborateur = await Collab.findByPk(id);
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
            telurgence : collaborateur.telurgence,
            CIN : collaborateur.CIN,
            dateDelivrance : collaborateur.dateDelivrance,
            lieuDelivrance : collaborateur.lieuDelivrance,
            dateEmbauche : collaborateur.dateEmbauche,
            site : collaborateur.site,
            entreprise : collaborateur.entreprise,
            categorie : collaborateur.categorie,
            contrat : collaborateur.contrat,
            poste: collaborateur.poste,
            departement : collaborateur.departement,
            poste2 : collaborateur.poste2,
            departement2 : collaborateur.departement2,
            statut : req.body.statut,
            dateDebauche : req.body.dateDebauche
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