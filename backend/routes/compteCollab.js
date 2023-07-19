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
                    sexe : compte.Collaborateur.sexe,
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


//Modifer le mot de passe d'un compte collaborateur 
router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const updateCompte = await CompteCollab.findByPk(id);
        if (!updateCompte) {
            return res.status(404).json({error : 'Compte introuvable'});
        }
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds);   
        const updatedCompte= await updateCompte.update({
            password : hashedPassword
        })

        return res.status(201).json(updatedCompte);
    }
    catch (err){
        console.error("Erreur lors de la mise à jour du compte", err);
        res.status(500).json({error : 'Erreur lors de la mise à jour du compte'})
    }
})

//Supprimer un compte collaborateur
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deleteCompteCollab = await CompteCollab.findByPk(id);
        if (!deleteCompteCollab) {
            return res.status(404).json({error : 'Compte introuvable'});
        }
        await deleteCompteCollab.destroy();
        res.sendStatus(204);
    }
    catch (error){
        console.error('Erreur lors de la suppression du compte: ', error)
        res.status(500).json({message : 'Erreur lors de la suprresion du compte'})
    }
})


module.exports = router;