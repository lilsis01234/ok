const { Router, application } = require('express');

<<<<<<< HEAD
const { TestPoste, TestDepartement, PosteDepartement } = require('../../Modele/Structure/association.js');

=======
const { TestPoste, TestDepartement, PosteDepartement } = require('../../Modele/posteModel/association.js')
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9

const router = require('express').Router();



//Afficher toutes les postes et les départements qui lui est associé
router.get('/all', async (req, res) => {
    try {
        const postes = await TestPoste.findAll({
            include: [
                {
                    model: TestDepartement,
                    as: 'departement',
<<<<<<< HEAD
                }]
=======
                }
            ]
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
        })
        res.status(200).json(postes);
    } catch (error) {
        console.error('Erreur lors de la récupération des postes', error)
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des postes" })
    }
})





//Créer une nouvelle poste et une instance de la table association
router.post('/new', async (req, res) => {
    try {
<<<<<<< HEAD
        const { titrePoste, departement, direction} = req.body;
=======
        const { titrePoste, departement } = req.body;
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9

        //Creation de l'étudiant
        const newPoste = await TestPoste.create({
            titrePoste
        })

<<<<<<< HEAD
=======

>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
        if (departement && departement.length > 0) {
            for (const departementId of departement) {
                // console.log(departementId)
                const departementInstance = await TestDepartement.findByPk(departementId)
                if (!departementInstance) {
                    console.log('PosteDepartement non sauvegardé', departementId)
                }
<<<<<<< HEAD
=======

>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
                const postedepartement = await PosteDepartement.create({
                    poste: newPoste.id,
                    departement: departementId
                })
            }

        }
<<<<<<< HEAD
=======

>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
        return res.status(201).json({ message: 'Poste crée avec succès' })
    }
    catch (error) {
        console.error('Erreur lors de la création du poste :', error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors du poste' });
    }
})

//Afficher un poste et les departements qui lui sont associés
router.get('/view/:id', async (req, res) => {
    try {
        const poste = await TestPoste.findByPk(req.params.id, {
<<<<<<< HEAD
            include: [{
                model: TestDepartement,
                as: 'departement'
            }]
=======
            include: {
                model: TestDepartement,
                as: 'departement'
            }
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
        });
        res.json(poste)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du postes' })
    }
})


//Modifier un poste et les départements qui lui sont associés
router.put('/:id/edit', async (req, res) => {
    try {
        const posteId = req.params.id;
<<<<<<< HEAD
        const { titrePoste, departement, direction} = req.body;
=======
        const { titrePoste, departement } = req.body;
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9


        //Vérifier d'abord si le poste existe
        const poste = await TestPoste.findByPk(posteId);

        if (!poste) {
            return res.status(404).json({ message: "Le poste n'existe pas" })
        }

        poste.titrePoste = titrePoste;
        await poste.save();

<<<<<<< HEAD


=======
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
        //Récupérer les associtions actuelles du poste
        const association = await PosteDepartement.findAll({
            where: {
                poste: poste.id
            }
        })

        //Récupérer les id des departements associés 
        const departementActuelle = association.map((assoc) => assoc.departement)

        //Identifier les departement à ajouter
        const departementAajouter = departement.filter((departementId) => !departementActuelle.includes(departementId))

<<<<<<< HEAD

        //Identifier les departements avec les associations à supprimer
        const departementSupprimer = departementActuelle.filter((departementId) => !departement.includes(departementId))

    

=======
        //Identifier les departements avec les associations à supprimer
        const departementSupprimer = departementActuelle.filter((departementId) => !departement.includes(departementId))

>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
        //Supprimer les associations avec les départements
        await PosteDepartement.destroy({
            where: {
                poste: poste.id,
                departement: departementSupprimer
            }
        })

<<<<<<< HEAD
       
=======
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
        //Ajouter nouvelle associations
        for (const departementId of departementAajouter) {
            const departements = await TestDepartement.findByPk(departementId)

            if (!departements) {
                return res.status(404).json({ message: `Le département avec l'ID ${departementId} est introuvable` })
            }

            await PosteDepartement.create({
                poste: poste.id,
                departement: departements.id
            })

        }

        return res.status(200).json({ message: 'Poste mise à jour avec succès' })
    }
    catch (err) {
        console.error('Erreur lors de la mise à jour du poste', err)
        return res.status(500).json({message : 'Erreur lors de la mise à jour du poste'})
    }
})

//Pour supprimer les postes et ses associations
router.delete('/:id/delete', async (req, res) => {
    try {
        const posteId = req.params.id;
        const poste = await TestPoste.findByPk(posteId)

        if (!poste){
            return res.status(404).json({message : "Le poste n'existe pas"});
        }

        await PosteDepartement.destroy({
            where : {
                poste : poste.id
            }
        })

        await TestPoste.destroy({
            where : {
                id : poste.id,
            }
        })

        return res.status(200).json({message : 'Poste supprimé avec succès'})

    }
    catch (error) {
        console.error('Erreur lors de la suppressiuon du poste:', error);
        return res.status(500).json({message : 'Erreur lors de la suppression du poste'})
    }
})

module.exports = router;
