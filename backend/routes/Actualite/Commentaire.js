const router = require('express').Router();
const Actualite = require('../../Modele/ActualityModel/Actualité');
const Compte = require('../../Modele/CompteModel/Compte');
const Collab = require('../../Modele/CollabModel/Collab');
const Commentaire = require('../../Modele/ActualityModel/Commentaire');

//Ajouter une nouvel commentaire
router.post('/new', async (req, res) => {
    try {
        
        const newComment = await Commentaire.create({ 

            contenu: req.body.contenu,
            date_comm: req.body.date_comm,
            act_id: req.body.act_id,
            compt_id: req.body.compt_id
        
        });

        const savedComment = await newComment.save();

        res.status(200).json(savedComment);

    }
    catch (err) {
        console.error('Erreur lors de la création de Commentaire: ', err);
        res.status(500).json({ message: 'Erreur lors de la création de Commentaire' });
    }
})

//Afficher les listes de tous les commentaires
router.get('/all', async (req, res) => {
    try {
        const commentaire = await Commentaire.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Compte,
                    attributes: ["id", "email"],
                    include : [ { model : Collab, attributes: ["nom", "prenom"]} ]
                },
                {
                    model: Actualite,
                    attributes: ["id", "titre"]
                }
            ]
        });

        res.status(200).json(commentaire);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données (commentaire)" })
    }
})

//Afficher les listes de tous les commentaires pour une actualite par l'id de l'actualité et qui sont des commentaires approuver
router.get('/actualite/:actualiteId', async (req, res) => {

    const actualiteId = req.params.actualiteId;

    try {
        const commentairesApprouves = await Commentaire.findAll({
            where: {
                act_id: actualiteId,
                approuver: true
            },
            include: [
                {
                    model: Compte,
                    attributes: ["id", "email"],
                    include: [{ model: Collab, attributes: ["nom", "prenom", "image"] }]
                },
                {
                    model: Actualite,
                    attributes: ["id", "titre"]
                }
            ]
        });

        res.status(200).json(commentairesApprouves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite dans la récupération des données (commentaire approuvé)" });
    }
});

//Approber un commentaire
router.put('/approuver/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const updateCommentaire = await Commentaire.findByPk(id);

        if (!updateCommentaire) {
            return res.status(404).json({ error: 'Commentaire introuvable' });
        }

        const updatedCommentaire = await updateCommentaire.update({
            approuver: true,
        })


        res.status(201).json({success: 'le commentaire est approuvé'})
    }
    catch (error) {
        console.error('Erreur lors de l\'approbation du commentaire', error);
        res.status(500).json({ error: 'Erreur lors de l\'approbation du commentaire' });
    }
})

//Approber un commentaire
router.put('/desapprouver/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const updateCommentaire = await Commentaire.findByPk(id);

        if (!updateCommentaire) {
            return res.status(404).json({ error: 'Commentaire introuvable' });
        }

        const updatedCommentaire = await updateCommentaire.update({
            approuver: false,
        })


        res.status(201).json({success: 'le commentaire est désapprouvé'})
    }
    catch (error) {
        console.error('Erreur lors du desapprobation du commentaire', error);
        res.status(500).json({ error: 'Erreur lors du désapprobation du commentaire' });
    }
})

//Supprimer un commentaire 
router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const deleteCommentaire = await Commentaire.findByPk(id);

        if (!deleteCommentaire) {
            return res.status(404).json({ error: 'Commentaire introuvable' });
        }

        await deleteCommentaire.destroy();

        res.sendStatus(204)
    }
    catch (error) {
        console.error('Erreur lors de la suppression du Commentaire', error)
        res.status(500).json({ message: 'Erreur lors de la suppression du Commentaire' })
    }

})

module.exports = router;