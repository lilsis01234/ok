const router = require('express').Router();
const Type = require('../../Modele/ActualityModel/Type');


//Ajouter une nouvelle type d'actualité
router.post('/new', async (req, res) => {
    try {
        const newType = await Type.create({ nom: req.body.nom });

        const savedType = await newType.save();

        res.status(200).json(savedType);

    }
    catch (err) {
        console.error('Erreur lors de la création d\'une type actualitée: ', err);
        res.status(201).json({ message: 'Erreur lors de la création d\'une type actualitée' });
    }
})


//Afficher les listes de tous les categories d'actualités
router.get('/all', async (req, res) => {
    try {
        const categorie = await Type.findAll();

        res.status(200).json(categorie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})


//Mettre à jour une type existant 
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const updateType = await Type.findByPk(id);

        if (!updateType) {
            return res.status(404).json({ error: 'Type introuvable' });
        }

        const updatedType = await updateType.update({
            nom: req.body.nom,
        })


        res.status(201).json({success: 'la Type a belle et bien mise à jour'})
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour de la Type d\'actualité', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la Type d\'actualité' });
    }
})


//Supprimer une type 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteType = await Type.findByPk(id);
        if (!deleteType) {
            return res.status(404).json({ error: 'Type introuvable' });
        }
        await deleteType.destroy();
        res.sendStatus(204)
    }
    catch (error) {
        console.error('Erreur lors de la suppression de la Type d\'actualité :', error)
        res.status(500).json({ message: 'Erreur lors de la suppression de la Type d\'actualité' })
    }
})

module.exports = router;