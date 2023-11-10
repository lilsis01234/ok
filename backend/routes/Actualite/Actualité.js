const router = require('express').Router();
const multer = require('multer'); //Package pour gérer l'upload des contenus multimédias
const path = require('path');

const Actualite = require('../../Modele/ActualityModel/Actualité');
const Compte = require('../../Modele/CompteModel/Compte');
const Collab = require('../../Modele/CollabModel/Collab');
const ActualityImg = require('../../Modele/ActualityModel/ActualityImg');
const Categorie = require('../../Modele/ActualityModel/Categorie');
const Type = require('../../Modele/ActualityModel/Type');
const Tag = require('../../Modele/ActualityModel/Tag');
const fs = require('fs');

//Configuration du stockages des fichiers uploader
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
})

const upload = multer({ storage });

//Ajouter une nouvelle categorie d'actualité
router.post('/categorie/new', async (req, res) => {
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


//Ajouter une nouvelle étiquettes d'actualité
router.post('/tag/new', async (req, res) => {
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



//Ajouter une nouvelle type d'actualité
router.post('/type/new', async (req, res) => {
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

//Ajouter une nouvelle images d'actualités
router.post('/image',upload.single('nom'), async (req, res) => {
    try {

        const nom = req.file;
        const newActualityImg = await ActualityImg.create({
            nom: nom ? nom.path : null,
        })

        const savedActualityImg = await newActualityImg.save();

        res.status(200).json(savedActualityImg)

    }
    catch (err) {
        console.error('Erreur lors de la création d\'image actualité: ', err);
        res.status(201).json({ message: 'Erreur lors de la création d\'image d\'actualité' });
    }
})


//Ajouter une nouvelle actualité
router.post('/new', upload.single('image'), async (req, res) => {
    try {
        const image = req.file;

        const newActuality = await Actualite.create({
            titre: req.body.titre,
            contenu: req.body.contenu,
            date_publication: req.body.date_publication,
            image: image ? image.path : null,
            extrait: req.body.extrait,
            etat: req.body.etat,
            visibilite: req.body.visibilite,
            compte_id: req.body.compte_id
        })

        const savedActuality = await newActuality.save();

        res.status(200).json(savedActuality)

    }
    catch (err) {
        console.error('Erreur lors de la création d\'une actualité: ', err);
        res.status(201).json({ message: 'Erreur lors de la création d\'une actualité' });
    }
})


//Afficher les listes de tous les categories d'actualités
router.get('/categorie/all', async (req, res) => {
    try {
        const categorie = await Categorie.findAll();

        res.status(200).json(categorie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})

//Afficher les listes de tous les categories d'actualités
router.get('/type/all', async (req, res) => {
    try {
        const categorie = await Type.findAll();

        res.status(200).json(categorie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})

//Afficher les listes de tous les étiquettes d'actualités
router.get('/tag/all', async (req, res) => {
    try {
        const Tags = await Tag.findAll();

        res.status(200).json(Tags);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})


//Afficher seulement une categorie
router.get('/categorie/:id', async (req, res) => {
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


//Afficher les listes de tous les actualités
router.get('/all', async (req, res) => {
    try {
        const actuality = await Actualite.findAll({

            include: [{
                model: Compte,
                include : [ { model : Collab} ]
            }]
        })

        res.status(200).json(actuality)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})


//Afficher la listes des 10 derniers collaborateurs
router.get('/new-actualities', async (req, res) => {
    try {
        const actualities = await Actualite.findAll({
            order: [['date_publication', 'DESC']],
            limit: 10,
            include: [{
                model: Compte,
                include : [ { model : Collab} ]
            }]
        })
        res.status(200).json(actualities)
    }
    catch (error) {
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})



//Afficher seulement un collaborateur
router.get('/view/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const actuality = await Actualite.findByPk(id, {
            include: [{
                model: Compte,
                include : [ { model : Collab} ]
            }]
        });
        if (!actuality) {
            return res.status(404).json({ error: 'Actualité introuvable' });
        }
        res.json({ actuality });
    }
    catch (err) {
        console.error('Erreur lors de la récupération de l\'actualité', err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'actualité' })
    }
})

//Mettre à jour une categorie existant 
router.put('/categorie/:id/edit', async (req, res) => {

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


//Mettre à jour une type existant 
router.put('/type/:id/edit', async (req, res) => {

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



//Mettre à jour un étiquette existant 
router.put('/tag/:id/edit', async (req, res) => {

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



//Mettre à jour un Actualité existant 
router.put('/:id/edit', upload.single('image'), async (req, res) => {

    const image = req.file;
    const { id } = req.params;

    try {
        const updateActuality = await Actualite.findByPk(id);
        const imageActulity = updateActuality.image
        if (!updateActuality) {
            return res.status(404).json({ error: 'Actualité introuvable' });
        }
        const updatedActuality = await updateActuality.update({
            titre: req.body.titre,
            contenu: req.body.contenu,
            date_publication: req.body.date_publication,
            image: image ? image.path : imageActulity,
            extrait: req.body.extrait,
            etat: req.body.etat,
            visibilite: req.body.visibilite,
            compte_id: req.body.compte_id
        })


        res.status(201).json(updatedActuality)
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour de l\'actualité', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'actualité' });
    }
})

//Supprimer une categorie 
router.delete('/categorie/:id/delete', async (req, res) => {
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


//Supprimer une type 
router.delete('/type/:id/delete', async (req, res) => {
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

//Supprimer une étiquette
router.delete('/tag/:id/delete', async (req, res) => {
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


//Supprimer une actualité 
router.delete('/:id/delete', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteActuality = await Actualite.findByPk(id);
        if (!deleteActuality) {
            return res.status(404).json({ error: 'Actualité introuvable' });
        }
        await deleteActuality.destroy();
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Erreur lors de la suppression d\'actualité :', error)
        res.status(500).json({ message: 'Erreur lors de la suppression d\'actualité' })
    }
})

router.delete('/image/:imageId', async (req, res) => {
    try {
      const imageId = req.params.imageId;
      // Ici, vous devrez extraire l'ID de l'image que vous souhaitez supprimer
      // À l'aide de cet ID, vous pouvez consulter la base de données pour obtenir le chemin de l'image.
      const image = await ActualityImg.findByPk(imageId);
  
      if (!image) {
        return res.status(404).json({ message: 'Image non trouvée' });
      }
  
      // Supprimez le fichier depuis le dossier "uploads" en utilisant le chemin de l'image stocké dans la base de données.
      if (image.nom) {
        fs.unlinkSync(image.nom); // Assurez-vous d'importer la bibliothèque 'fs'.
      }
  
      // Supprimez l'enregistrement de l'image de la base de données.
      await ActualityImg.destroy({
        where: {
          id: imageId
        }
      })
  
      res.status(200).json({ message: 'Image supprimée avec succès' });
    } catch (err) {
      console.error('Erreur lors de la suppression d\'image actualité :', err);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'image d\'actualité' });
    }
  });


module.exports = router;