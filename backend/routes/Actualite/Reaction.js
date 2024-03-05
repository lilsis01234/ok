const router = require('express').Router();
const Actualite = require('../../Modele/ActualityModel/Actualité');
const Compte = require('../../Modele/CompteModel/Compte');
const Collab = require('../../Modele/CollabModel/Collab');
const Reaction = require('../../Modele/ActualityModel/Reaction');

//Ajouter une nouvel Reaction
router.post('/new', async (req, res) => {
    try {
        const { type, act_id, compte_id } = req.body;

        // Vérifiez d'abord si la réaction existe déjà
        const existingReaction = await Reaction.findOne({
            where: { type, act_id, compte_id }
        });

        if (existingReaction) {
            // La réaction existe déjà, vous pouvez la supprimer ici si nécessaire
            await existingReaction.destroy();

            // Envoyer une réponse pour indiquer que la réaction existait déjà et a été supprimée
            return res.status(200).json({ message: 'La réaction existait déjà et a été supprimée.' });
        }

        // La réaction n'existe pas encore, vous pouvez l'ajouter
        const newReaction = await Reaction.create({ type, act_id, compte_id });

        // Envoyer une réponse pour indiquer que la réaction a été ajoutée avec succès
        res.status(201).json({ message: 'Réaction ajoutée avec succès.' });
    } catch (err) {
        console.error('Erreur lors de la création/suppression de la Réaction :', err);
        res.status(500).json({ message: 'Erreur lors de la création/suppression de la Réaction' });
    }
});

//lister tous les reactions d'une actualité par son id
router.get('/actualite/:actualiteId', async (req, res) => {

    const actualiteId = req.params.actualiteId;

    try {
        const reactions = await Reaction.findAll({
            where: {
                act_id: actualiteId
            },
            order: [['createdAt', 'DESC']],
            attributes: [
                'type'
            ],
            include: [
                {
                    model: Compte,
                    attributes: ["id"],
                    include: [{ model: Collab, attributes: ["nom", "prenom"] }]
                }
            ]
        });

        const transformReactions = (reactions) => {
            const emojiMapping = {
              jadore: 'love',
              jaime: 'like',
              drole: 'haha'
            };
          
            return reactions.map((reaction) => {
              const emoji = emojiMapping[reaction.type] || 'unknown';
              const by = `${reaction.Compte.Collab.nom} ${reaction.Compte.Collab.prenom}`;
          
              return { emoji, by };
            });
          };
          
          const transformedData = transformReactions(reactions);

        res.status(200).json(transformedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite dans la récupération des données (reaction d'une actualitée)" });
    }
});



module.exports = router;