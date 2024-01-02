const ArchiveCollab = require('../../Modele/CollabModel/ArchiveCollab');
const Collab = require('../../Modele/CollabModel/Collab');
const Equipe = require('../../Modele/Structure/Equipe');
const Projet = require('../../Modele/Structure/Projet');
const Site = require('../../Modele/Structure/Site');
const TestDepartement = require('../../Modele/Structure/TestDepartement');
const TestPoste = require('../../Modele/Structure/TestPoste');

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
            lieuNaissance: collaborateur.lieuNaissance,
            lot : collaborateur.lot,
            quartier : collaborateur.quartier,
            adresse2: collaborateur.adresse2,
            ville : collaborateur.ville,
            tel : collaborateur.tel,
            tel2: collaborateur.tel2,
            telurgence : collaborateur.telurgence,
            CIN : collaborateur.CIN,
            dateDelivrance : collaborateur.dateDelivrance,
            lieuDelivrance : collaborateur.lieuDelivrance,
            statutmatrimoniale: collaborateur.statutmatrimoniale,
            nbEnfant: collaborateur.nbEnfant,
            dateEmbauche : collaborateur.dateEmbauche,
            site : collaborateur.site,
            entreprise : collaborateur.entreprise,
            numCNAPS: collaborateur.numCNAPS,
            shift: collaborateur.shift,
            poste: collaborateur.poste,
            departement : collaborateur.departement,
            poste2 : collaborateur.poste2,
            departement2 : collaborateur.departement2,
            projet: collaborateur.projet,
            projet2: collaborateur.projet2,
            equipe: collaborateur.equipe,
            equipe2: collaborateur.equipe2,
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


//Afficher les listes des archives
router.get('/all', async(req, res) => {
    try {
       const collaborateurArchive = await ArchiveCollab.findAll({
        include : [
            {
                model : Site,
                as:'sites'
            },
            {
                model: TestPoste,
                as: 'poste1',
            }, {
                model: TestPoste,
                as: 'postes',
            }, {
                model: TestDepartement,
                as: 'departement1',
            }, {
                model: TestDepartement,
                as: 'departements',
            },
            {
                model: Projet,
                as: 'projet1'
            }, {
                model: Projet,
                as: 'projets'
            }, {
                model: Equipe,
                as: 'equipe1'
            }, {
                model: Equipe,
                as: 'equipes'
            }
        ]
       }) 
       res.status(200).json(collaborateurArchive)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})

//routes pour afficher seulement un collaborateur archivé
router.get('/view/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const collaborateur = await ArchiveCollab.findByPk(id, {
            include: [
                {
                    model : Site,
                    as:'sites'
                },
                {
                    model: TestPoste,
                    as: 'poste1',
                }, {
                    model: TestPoste,
                    as: 'postes',
                }, {
                    model: TestDepartement,
                    as: 'departement1',
                }, {
                    model: TestDepartement,
                    as: 'departements',
                }, {
                    model: Projet,
                    as: 'projet1'
                }, {
                    model: Projet,
                    as: 'projets'
                }, {
                    model: Equipe,
                    as: 'equipe1'
                }, {
                    model: Equipe,
                    as: 'equipes'
                }]
        });
        if (!collaborateur) {
            return res.status(404).json({ error: 'Collaborateur introuvable' });
        }
        res.json({ collaborateur });
    }
    catch (err) {
        console.error('Erreur lors de la récupération du collaborateur', err);
        res.status(500).json({ error: 'Erreur lors de la récupération du collaborateur' })
    }
})




module.exports = router;