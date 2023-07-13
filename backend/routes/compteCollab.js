const Collaborateur = require('../Modele/Collaborateur');
const CompteCollab = require('../Modele/CompteCollab');
const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste');

const router = require('express').Router();

//Liste de tous les collaborateurs avec son email
router.get('/liste_collaborateur', (req, res) => {
    CompteCollab.findAll({
        include : {model : Collaborateur, attributes : ['matricule', 'nom', 'prenom', 'dateNaissance', 'lot', 'quartier', 'ville', 'tel', 'dateEmbauche', 'site', 'image', 'poste'],
            include : {model: Poste, attributes : ['titrePoste', 'departement'],
                include : {model : Departement, attributes : ['nomDepartement']}}
        }
    })
    .then((comptes) => {
        res.status(200).json(
            comptes.map((compte) => {
                return {
                    matricule : compte.Collaborateur.matricule,
                    nom : compte.Collaborateur.nom,
                    prenom : compte.Collaborateur.prenom,
                    dateNaissance : compte.Collaborateur.dateNaissance,
                    lot : compte.Collaborateur.lot,
                    quartier : compte.Collaborateur.quartier,
                    ville : compte.Collaborateur.ville,
                    tel : compte.Collaborateur.tel,
                    email : compte.email,
                    dateEmbauche : compte.Collaborateur.dateEmbauche,
                    site : compte.Collaborateur.site,
                    image : compte.Collaborateur.image,
                    poste : compte.Collaborateur.Poste.titrePoste,
                    departement : compte.Collaborateur.Poste.Departement.nomDepartement,
                    password : compte.password,
                }
            })
        )
    })
    .catch((err) => {
        console.error('Erreur lors de la récupération des collaborateur', err);
        res.status(500).json({error : 'Erreur lors de la récupération des collaborateur'})
    })
})


module.exports = router;