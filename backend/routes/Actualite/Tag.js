const router = require('express').Router();
const Tag = require('../../Modele/ActualityModel/Tag');


//Ajouter une nouvelle étiquettes d'actualité
router.post('/new', async (req, res) => {
    try {
        const newTag = await Tag.create({ nom: req.body.nom });

        const savedTag = await newTag.save();

        res.status(200).json(savedTag);

    }
    catch (err) {
        console.error('Erreur lors de la création d\'une étiquette d\'actualitée: ', err);
        res.status(201).json({ message: 'Erreur lors de la création d\'une étiquette d\'actualitée' });
    }
})


//Afficher les listes de tous les étiquettes d'actualités
router.get('/all', async (req, res) => {
    try {
        const Tags = await Tag.findAll({
            order: [['nom', 'ASC']],
        });

        res.status(200).json(Tags);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})


//Mettre à jour un étiquette existant 
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const updateTag = await Tag.findByPk(id);

        if (!updateTag) {
            return res.status(404).json({ error: 'Tag introuvable' });
        }

        const updatedTag = await updateTag.update({
            nom: req.body.nom,
        })


        res.status(201).json({success: 'la Tag a belle et bien mise à jour'})
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour de la Tag d\'actualité', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la Tag d\'actualité' });
    }
})


//Supprimer une étiquette
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTag = await Tag.findByPk(id);
        if (!deleteTag) {
            return res.status(404).json({ error: 'Tag introuvable' });
        }
        await deleteTag.destroy();
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Erreur lors de la suppression de la Tag d\'actualité :', error)
        res.status(500).json({ message: 'Erreur lors de la suppression de la Tag d\'actualité' })
    }
})

module.exports = router;