const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Compte = require('../../Modele/CompteModel/Compte');
const Collab = require('../../Modele/CollabModel/Collab');
const ActualityImg = require('../../Modele/ActualityModel/ActualityImg');
const fs = require('fs');
const { Actualite, Categorie, ActuCateg} = require('../../Modele/ActualityModel/associationActuCateg');
const {  Tag, ActuTag} = require('../../Modele/ActualityModel/associationActuTag');
const { Type, ActuType } = require('../../Modele/ActualityModel/associationActuType');
const Commentaire = require('../../Modele/ActualityModel/Commentaire');
const { Sequelize, Op } = require('sequelize');


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
            compte_id: req.body.compte_id,
            commentaire: req.body.commentaire
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

                const actualitecategory = await ActuCateg.create({
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

                const actualitetype = await ActuType.create({
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

                const actualitetag = await ActuTag.create({
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
            order: [['createdAt', 'DESC']],
            attributes: [
                'id',
                'titre',
                'contenu',
                'date_publication',
                'image',
                'extrait',
                'etat',
                'visibilite',
                'compte_id',
                'createdAt',
                'updatedAt',
                [Sequelize.literal('(SELECT COUNT(*) FROM Commentaires WHERE Commentaires.act_id = Actualite.id AND Commentaires.approuver = true)'), 'nombre_commentaires'],
                [Sequelize.literal('(SELECT COUNT(*) FROM Reactions WHERE Reactions.act_id = Actualite.id)'), 'nombre_reactions'],
            ],
            include: [
                {
                    model: Compte,
                    attributes: ["id", "email"],
                    include : [ { model : Collab, attributes: ["nom", "prenom"]} ]
                },
                {
                    model: Categorie,
                    as: "categorie",
                    attributes: ["nom"],
                    through: { attributes: [] }
                },
                {
                    model: Tag,
                    as: "Tag",
                    attributes: ["nom"],
                    through: { attributes: [] }
                },
                {
                    model: Type,
                    as: "Type",
                    attributes: ["nom"],
                    through: { attributes: [] }
                }
            ]
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


//Afficher les listes de tous les actualités
router.get('/categorie/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const actuality = await Actualite.findAll({
            attributes: [
                'id',
                'titre',
                'contenu',
                'date_publication',
                'image',
                'extrait',
                'etat',
                'visibilite',
                'compte_id',
                'createdAt',
                'updatedAt',
                [Sequelize.literal('(SELECT COUNT(*) FROM Commentaires WHERE Commentaires.act_id = Actualite.id AND Commentaires.approuver = true)'), 'nombre_commentaires'],
                [Sequelize.literal('(SELECT COUNT(*) FROM Reactions WHERE Reactions.act_id = Actualite.id)'), 'nombre_reactions'],
            ],
            include: [
                {
                    model: Categorie,
                    where: { id: id },
                    as: 'categorie',
                    attributes: ['id', 'nom'] ,
                    through: { 
                        model: ActuCateg,
                        attributes: [] 
                    }
                },
                {
                    model: Compte,
                    attributes: ["id", "email"],
                    include : [ { model : Collab, attributes: ["nom", "prenom"]} ]
                }
            ]
          })

          const category = await Categorie.findByPk(id);

          if (!category) {
            return res.status(404).json({ error: 'categorie introuvable' });
          }

        res.status(200).json({actuality,category })
    }
    catch (error) {
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})

//Afficher les listes de tous les actualités
router.get('/tag/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const actuality = await Actualite.findAll({
            attributes: [
                'id',
                'titre',
                'contenu',
                'date_publication',
                'image',
                'extrait',
                'etat',
                'visibilite',
                'compte_id',
                'createdAt',
                'updatedAt',
                [Sequelize.literal('(SELECT COUNT(*) FROM Commentaires WHERE Commentaires.act_id = Actualite.id AND Commentaires.approuver = true)'), 'nombre_commentaires'],
                [Sequelize.literal('(SELECT COUNT(*) FROM Reactions WHERE Reactions.act_id = Actualite.id)'), 'nombre_reactions'],
            ],
            include: [
                {
                    model: Tag,
                    where: { id: id },
                    as: 'Tag'
                }
            ]
          })

          const tag = await Tag.findByPk(id);

          if (!tag) {
            return res.status(404).json({ error: 'tag introuvable' });
          }

        res.status(200).json({actuality, tag})
    }
    catch (error) {
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})


//Afficher les listes de tous les actualités
router.get('/type/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const actuality = await Actualite.findAll({
            attributes: [
                'id',
                'titre',
                'contenu',
                'date_publication',
                'image',
                'extrait',
                'etat',
                'visibilite',
                'compte_id',
                'createdAt',
                'updatedAt',
                [Sequelize.literal('(SELECT COUNT(*) FROM Commentaires WHERE Commentaires.act_id = Actualite.id AND Commentaires.approuver = true)'), 'nombre_commentaires'],
                [Sequelize.literal('(SELECT COUNT(*) FROM Reactions WHERE Reactions.act_id = Actualite.id)'), 'nombre_reactions'],
            ],
            include: [
                {
                    model: Type,
                    where: { id: id },
                    as: 'Type',
                }
            ]
          })

          const type = await Type.findByPk(id);

          if (!type) {
            return res.status(404).json({ error: 'type introuvable' });
          }

        res.status(200).json({actuality, type})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})



//prendre l'id d'image par son nom dans actualityimgs
router.get('/getidimg', async (req, res) => {
    const { name } = req.query;
    try {
        const actualityImg = await ActualityImg.findOne({

            where: {
                nom: name
              }
        });

        if (!actualityImg) {
            return res.status(404).json({ error: 'Image Actualité introuvable' });
        }

        

        res.json({ actualityImg });
    }
    catch (err) {
        console.error('Erreur lors de la récupération de l\'actualité', err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'actualité' })
    }
})
//Afficher une actualitée
router.get('/:id(\\d+)', async (req, res) => {
    const { id } = req.params;
    try {
        const actuality = await Actualite.findByPk(id, {
            attributes: [
                'id',
                'titre',
                'contenu',
                'date_publication',
                'image',
                'extrait',
                'etat',
                'visibilite',
                'compte_id',
                'createdAt',
                'updatedAt',
                'commentaire',
                [Sequelize.literal(`(SELECT COUNT(*) FROM Commentaires WHERE Commentaires.act_id = ${id} AND Commentaires.approuver = true)`), 'nombre_commentaires']
            ],
            include: [{
                model: Compte,
                attributes: ["id", "email"],
                include: [{
                    model: Collab,
                    attributes: ["id", "nom", "prenom"],
                }]
            },
            {
                model: Categorie,
                as: "categorie",
                through: { attributes: [] }
            },
            {
                model: Tag,
                as: "Tag",
                through: { attributes: [] }
            },
            {
                model: Type,
                as: "Type",
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


//prendre les articles similaires par l'id de l'article
router.get('/related/:actualiteId', async (req, res) => {

    const { actualiteId } = req.params;

    try {
        // Récupérer la catégorie de l'actualité spécifiée
        const categorieIds = await ActuCateg.findAll({
            attributes: ['categ_id'],
            where: {
                act_id: actualiteId
            }
        });

        // Récupérer les deux actualités similaires par catégorie
        const actualitesSimilaires = await Actualite.findAll({
            include: [
                {
                    model: Compte,
                    attributes: ["id", "email"],
                    include: [{
                        model: Collab,
                        attributes: ["id", "nom", "prenom"],
                    }]
                },
                {
                    model: Categorie,
                    as: "categorie",
                    where: {
                        id: categorieIds.map(c => c.categ_id)
                    },
                    through: { attributes: [] } // Pour éviter de récupérer les colonnes de la table de liaison
                }
            ],
            where: {
                id: {
                    [Op.not]: actualiteId // Exclure l'actualité spécifiée
                }
            },
            order: [['date_publication', 'DESC']], // Tri par date de publication, du plus récent au plus ancien
            limit: 2 // Limiter à deux actualités similaires
        });

        res.json(actualitesSimilaires);
    } catch (error) {
        console.error('Erreur lors de la récupération des actualités similaires', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des actualités similaires' });
    }
})


//Prendre Le Actuelité next et prev d'une actualité par son id
router.get('/prevandnext/:id', async (req, res) => {
    const actualiteId = req.params.id;

    try {
        // Récupérer l'ID de l'actualité précédente
        const actualitePrecedente = await Actualite.findOne({
            where: {
                id: {
                    [Op.lt]: actualiteId // Utilisez l'opérateur de comparaison "inférieur à"
                }
            },
            order: [['id', 'DESC']], // Trier par ID dans l'ordre décroissant
            attributes: ['id'], // Sélectionner seulement l'ID
            limit: 1 // Limiter à une seule actualité
        });

        // Récupérer l'ID de l'actualité suivante
        const actualiteSuivante = await Actualite.findOne({
            where: {
                id: {
                    [Op.gt]: actualiteId // Utilisez l'opérateur de comparaison "supérieur à"
                }
            },
            order: [['id', 'ASC']], // Trier par ID dans l'ordre croissant
            attributes: ['id'], // Sélectionner seulement l'ID
            limit: 1 // Limiter à une seule actualité
        });

        res.json({
            actualitePrecedente: actualitePrecedente ? actualitePrecedente.id : null,
            actualiteSuivante: actualiteSuivante ? actualiteSuivante.id : null,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des actualités précédente et suivante', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des actualités précédente et suivante' });
    }
});

//Effectuer des recherches parmi les données 
router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const searchResult = await Actualite.findAll({
            order: [['createdAt', 'DESC']],
            attributes: [
                'id',
                'titre',
                'contenu',
                'date_publication',
                'image',
                'extrait',
                'etat',
                'visibilite',
                'compte_id',
                'createdAt',
                'updatedAt',
                [Sequelize.literal('(SELECT COUNT(*) FROM Commentaires WHERE Commentaires.act_id = Actualite.id AND Commentaires.approuver = true)'), 'nombre_commentaires'],
                [Sequelize.literal('(SELECT COUNT(*) FROM Reactions WHERE Reactions.act_id = Actualite.id)'), 'nombre_reactions'],
            ],
            where: {
                [Op.or]: [
                    // { id: { [Op.like]: `%${q}%` } },
                    { titre: { [Op.like]: `%${q}%` } },
                    { contenu: { [Op.like]: `%${q}%` } },
                    // { date_publication: { [Op.like]: `%${q}%` } },
                    { extrait: { [Op.like]: `%${q}%` } },
                    // Sequelize.literal(`"$Compte.collaborateur.nom$" LIKE '%${q}%'`),
                    // Sequelize.literal(`"$Compte.collaborateur.prenom$" LIKE '%${q}%'`)
                ]
            },
            include: [
                {
                    model: Compte,
                    attributes: ["id", "email"],
                    include : [ { model : Collab, attributes: ["nom", "prenom"]} ]
                },
                {
                    model: Categorie,
                    as: "categorie",
                    attributes: ["nom"],
                    through: { attributes: [] }
                },
                {
                    model: Tag,
                    as: "Tag",
                    attributes: ["nom"],
                    through: { attributes: [] }
                },
                {
                    model: Type,
                    as: "Type",
                    attributes: ["nom"],
                    through: { attributes: [] }
                }
            ]
        })

        res.json(searchResult)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la recherche d\'actualité' })
    }
})

//Mettre à jour un Actualité existant 
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const updateActuality = await Actualite.findByPk(id);

        if (!updateActuality) {
            return res.status(404).json({ error: 'Actualité introuvable' });
        }

        const updatedActuality = await updateActuality.update({
            titre: req.body.titre,
            contenu: req.body.contenu,
            date_publication: req.body.date_publication,
            image: req.body.image,
            extrait: req.body.extrait,
            etat: req.body.etat,
            visibilite: req.body.visibilite,
            compte_id: req.body.compte_id,
            commentaire: req.body.commentaire
        });

        const savedActuality = await updatedActuality.save();

        const category = req.body.category;
        const type = req.body.type;
        const tag = req.body.tag;


        await ActuCateg.destroy({
            where: {
                act_id: savedActuality.id
            }
        });

        await ActuType.destroy({
            where: {
                act_id: savedActuality.id
            }
        });

        await ActuTag.destroy({
            where: {
                act_id: savedActuality.id
            }
        });

        if (category.length > 0 && !category.every(element => element === "")) {

            for (const categoryId of category) {

                const categoryInstance = await Categorie.findByPk(categoryId)

                if (!categoryInstance) {
                    console.log('actualitecategory non sauvegardé', categoryId)
                    continue;  // Pass to the next iteration if categoryInstance doesn't exist
                }

                else {

                    const actualitecategory = await ActuCateg.create({
                        act_id: savedActuality.id,
                        categ_id: categoryId
                    });

                }
            }

        }
        if  (type.length > 0 && !type.every(element => element === "")) {

            for (const typeId of type) {

                const typeInstance = await Type.findByPk(typeId)

                if (!typeInstance) {
                    console.log('actualitetype non sauvegardé', typeId)
                    continue;  // Pass to the next iteration if categoryInstance doesn't exist
                } else {
        
                    const actualitecategory = await ActuType.create({
                        act_id: savedActuality.id,
                        type_id: typeId
                    });
                }   
            }

        }
        if  (tag.length > 0 && !tag.every(element => element === "")) {

            for (const tagId of tag) {

                const tagInstance = await Tag.findByPk(tagId)

                if (!tagInstance) {
                    console.log('actualitetag non sauvegardé', tagId)
                    continue;  // Pass to the next iteration if categoryInstance doesn't exist
                }

                else {
        
                    const actualitecategory = await ActuTag.create({
                        act_id: savedActuality.id,
                        tag_id: tagId
                    });

                 } 
            }

        }



        res.status(201).json(updatedActuality)
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour de l\'actualité', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'actualité' });
    }
})


//Mettre à jour un Actualité existant 
router.put('/image/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const updateActuality = await Actualite.findByPk(id);

        if (!updateActuality) {
            return res.status(404).json({ error: 'Actualité introuvable' });
        }

        const updatedActuality = await updateActuality.update({
            image: ''
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