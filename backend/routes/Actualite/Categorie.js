const router = require('express').Router();
const { Actualite, Categorie, ActuCateg} = require('../../Modele/ActualityModel/associationActuCateg');

//Ajouter une nouvelle categorie d'actualité
router.post('/new', async (req, res) => {
    try {
        const newCategorie = await Categorie.create({ nom: req.body.nom });

        const savedCategorie = await newCategorie.save();

        res.status(200).json(savedCategorie);

    }
    catch (err) {
        console.error('Erreur lors de la création d\'une categorie actualitée: ', err);
        res.status(201).json({ message: 'Erreur lors de la création d\'une categorie actualitée' });
    }
})


//Afficher les listes de tous les categories d'actualités
router.get('/all', async (req, res) => {
    try {
        const categorie = await Categorie.findAll({
            order: [['nom', 'ASC']],
        });

        res.status(200).json(categorie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})



//Afficher seulement une categorie
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Categorie.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'categorie introuvable' });
        }
        res.json({ category });
    }
    catch (err) {
        console.error('Erreur lors de la récupération de la categorie', err);
        res.status(500).json({ error: 'Erreur lors de la récupération de la categorie' })
    }
})

//Afficher les listes de tous les actualités par l'id d'une categorie
router.get('/:id/actualites', async (req, res) => {

    const { id } = req.params;

    try {
        const actuality = await Categorie.findAll({
            include: [
              {
                model: Actualite,
                through: { 
                    model: ActuCateg,
                    attributes: [] 
                },
              },
            ],
            where: {
                id: id
            },
            limit: 3,
          })

        res.status(200).json(actuality)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})


//Mettre à jour une categorie existant 
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const updateCategorie = await Categorie.findByPk(id);

        if (!updateCategorie) {
            return res.status(404).json({ error: 'Categorie introuvable' });
        }

        const updatedCategorie = await updateCategorie.update({
            nom: req.body.nom,
        })


        res.status(201).json({success: 'la categorie a belle et bien mise à jour'})
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour de la categorie d\'actualité', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la categorie d\'actualité' });
    }
})



//Supprimer une categorie 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCategorie = await Categorie.findByPk(id);
        if (!deleteCategorie) {
            return res.status(404).json({ error: 'Categorie introuvable' });
        }
        await deleteCategorie.destroy();
        res.sendStatus(204)
    }
    catch (error) {
        console.error('Erreur lors de la suppression de la categorie d\'actualité :', error)
        res.status(500).json({ message: 'Erreur lors de la suppression de la categorie d\'actualité' })
    }
})

module.exports = router;