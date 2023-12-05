const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Compte = require('../../Modele/CompteModel/Compte');
const Collab = require('../../Modele/CollabModel/Collab');
const ActualityImg = require('../../Modele/ActualityModel/ActualityImg');
const ActType = require('../../Modele/ActualityModel/ActuType');
const ActTag = require('../../Modele/ActualityModel/ActuTag');
const fs = require('fs');
const { Actualite, Categorie} = require('../../Modele/ActualityModel/associationActuCateg');
const { Tag } = require('../../Modele/ActualityModel/associationActuTag');
const { Type } = require('../../Modele/ActualityModel/associationActuType');

//Configuration du stockages des fichiers uploader
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destination = 'uploads/';
        cb(null, destination.replace(/\\/g, '/'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
})

const upload = multer({ storage });



// Ajouter une nouvelle actualité
router.post('/new', async (req, res) => {
    try {
        
        const newActuality = await Actualite.create({
            titre: req.body.titre,
            contenu: req.body.contenu,
            date_publication: req.body.date_publication,
            image: req.body.image,
            extrait: req.body.extrait,
            etat: req.body.etat,
            visibilite: req.body.visibilite,
            compte_id: req.body.compte_id
        })

        
        const savedActuality = await newActuality.save();

        const category = req.body.category;
        const type = req.body.type;
        const tag = req.body.tag;

        if (category.length > 0 && !category.every(element => element === "")) {

            for (const categoryId of category) {

                const categoryInstance = await Categorie.findByPk(categoryId)

                if (!categoryInstance) {
                    console.log('actualitecategory non sauvegardé', categoryId)
                }

                const actualitecategory = await ActCateg.create({
                    act_id: savedActuality.id,
                    categ_id: categoryId
                })
            }

        }
        if  (type.length > 0 && !type.every(element => element === "")) {

            for (const typeId of type) {

                const typeInstance = await Type.findByPk(typeId)

                if (!typeInstance) {
                    console.log('actualitetype non sauvegardé', typeId)
                }

                const actualitetype = await ActType.create({
                    act_id: savedActuality.id,
                    type_id: typeId
                })
            }

        }
        if  (tag.length > 0 && !tag.every(element => element === "")) {

            for (const tagId of tag) {

                const tagInstance = await Tag.findByPk(tagId)

                if (!tagInstance) {
                    console.log('actualitetag non sauvegardé', tagId)
                }

                const actualitetag = await ActTag.create({
                    act_id: savedActuality.id,
                    tag_id: tagId
                })
            }

        }


        res.status(200).json(savedActuality)

    }
    catch (err) {
        console.error('Erreur lors de la création d\'une actualité: ', err);
        res.status(201).json({ message: 'Erreur lors de la création d\'une actualité' });
    }
})


//Ajouter une nouvelle images d'actualités
router.post('/image',upload.single('nom'), async (req, res) => {
    try {

        const nom = req.file;
        const newActualityImg = await ActualityImg.create({
            nom: nom ? nom.path.replace(/\\/g, '/') : null,
        })

        const savedActualityImg = await newActualityImg.save();

        res.status(200).json(savedActualityImg)

    }
    catch (err) {
        console.error('Erreur lors de la création d\'image actualité: ', err);
        res.status(201).json({ message: 'Erreur lors de la création d\'image d\'actualité' });
    }
})




//Afficher les listes de tous les actualités
router.get('/all', async (req, res) => {
    try {
        const actualities = await Actualite.findAll({
            order: [['date_publication', 'DESC']],
            include: [{
                model: Compte,
                attributes: ["id", "email"],
                include : [ { model : Collab, attributes: ["nom", "prenom"]} ]
            }]
        })

        res.status(200).json(actualities)
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
            limit: 5,
            include: [{
                model: Compte,
                attributes: ["id", "email"],
                include : [ { model : Collab, attributes: ["nom", "prenom"]} ]
            }]
        })
        res.status(200).json(actualities)
    }
    catch (error) {
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})



//Afficher seulement un collaborateur
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const actuality = await Actualite.findByPk(id, {
            include: [{
                model: Compte,
                attributes: ["id", "email"],
            },
            {
                model: Categorie,
                as: "categorie",
                attributes: ["id", "nom"],
                through: { attributes: [] }
            },
            {
                model: Tag,
                as: "Tag",
                attributes: ["id", "nom"],
                through: { attributes: [] }
            },
            {
                model: Type,
                as: "Type",
                attributes: ["id", "nom"],
                through: { attributes: [] }
            }
        ]
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


//Mettre à jour un Actualité existant 
router.put('/:id', upload.single('image'), async (req, res) => {

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


//Supprimer une actualité 
router.delete('/:id', async (req, res) => {
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