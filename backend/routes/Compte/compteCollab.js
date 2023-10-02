const router = require('express').Router();
const bcrypt = require('bcrypt');
const Compte = require('../../Modele/CompteModel/Compte');
const Collab = require('../../Modele/CollabModel/Collab');
const TestPoste = require('../../Modele/Structure/TestPoste');
const TestDepartement = require('../../Modele/Structure/TestDepartement');



//Liste de tous les collaborateurs avec son email
router.get('/all', async (req, res) => {
    try {
        const collaborateur = await Compte.findAll({
          include : [
              {
                  model : Collab,
                  include : [
                    {
                        model : TestPoste,
                        as : 'poste1',
                    },{
                        model : TestPoste,
                        as : 'postes',
                    }, {
                        model : TestDepartement,
                        as : 'departement1',
                    }, {
                        model : TestDepartement,
                        as : 'departements',
                    }
                  ]}
                  
        ]
        })

        res.status(200).json(collaborateur)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message : "Une erreur s'est produit dans la récupération des données"})
    }
})



//Modifer le mot de passe d'un compte collaborateur 
router.put('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const updateCompte = await Compte.findByPk(id);
        if (!updateCompte) {
            return res.status(404).json({ error: 'Compte introuvable' });
        }
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds);
        const updatedCompte = await updateCompte.update({
            password: hashedPassword
        })

        return res.status(201).json(updatedCompte);
    }
    catch (err) {
        console.error("Erreur lors de la mise à jour du compte", err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du compte' })
    }
})



//Supprimer un compte collaborateur
router.delete('/:id/delete', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCompteCollab = await Compte.findByPk(id);
        if (!deleteCompteCollab) {
            return res.status(404).json({ error: 'Compte introuvable' });
        }
        await deleteCompteCollab.destroy();
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Erreur lors de la suppression du compte: ', error)
        res.status(500).json({ message: 'Erreur lors de la suprresion du compte' })
    }
})


module.exports = router;