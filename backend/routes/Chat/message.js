const router = require('express').Router();
const Message = require('../../Modele/ChatModel/Membre');
const PieceJointeMessage = require('../../Modele/ChatModel/PieceJointeMessage');
const messageEvents = require('../../events/Chat/messageEvents');


//Ajouter une nouvelle message et une nouvelle piece jointe si on a besoin
router.post('/new', async(req, res) => {
    try {
        const { content, envoyeur, discussionId, typefichier, fichiers } = req.body;

        let newMessage = ''
        if (typefichier && fichiers) {
            const newPieceJointe = await PieceJointeMessage.create({
                typefichier,
                fichiers
            })

            newMessage = await Message.create({
                message: content,
                dateEnvoie: new Date(),
                envoyeur,
                discussion: discussionId,
                pieceJointe: newPieceJointe.id
            })
        } else {
            newMessage = await Message.create({
                message: content,
                dateEnvoie: new Date(),
                envoyeur,
                discussion: discussionId,
            })
        }

        messageEvents.ajouterMessage(newMessage)
        return res.status(201).json({ message: 'Message crée avec succés' })

    } catch (error) {
        console.error('Erreur lors de la création du message :', error)
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du message' })
    }
})


//Affichage de toutes les messages d'une discussion
router.get('/discussion/allMessage/:discussionId', async(req, res) => {
    try {
        const discussionId = req.params.discussionId;

        const messages = await Message.findAll({
            where: { discussion: discussionId },
            include: [{
                model: PieceJointeMessage
            }]
        })

        if (messages.length === 0) {
            res.status(404).json({ message: 'Aucun message trouvé' })
        }

        return res.status(200).json(messages)
    } catch (error) {
        console.error("Erreur lors de la récupération des messages :", errors)
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des messages' })
    }
})

//Modification du message de l'utilisateur
router.put('/edit/:messageId', async(req, res) => {
    try {
        const { content, envoyeur } = req.body;
        const messageId = req.params.messageId

        const messageToUpdate = await Message.findOne({ where: { id: messageId, envoyeur } })
        if (!messageToUpdate) {
            return res.status(404).json({ message: 'Message non trouvé' })
        }

        const updateMessage = await messageToUpdate.update({ message: content })

        messageEvents.modifierMessage(updateMessage)
        return res.status(200).json({ message: 'Message modifié avec succès' })

    } catch (error) {
        console.error('Erreur lors de la modification du message :', error)
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la modification de la message' })
    }
})

router.delete('/delete/:messageId', async(req, res) => {
    try {
        const { envoyeur } = req.body
        const messageId = req.params.messageId

        const messageToDelete = await Message.findOne({ where: { id: messageId, envoyeur } })
        if (!messageToDelete) {
            return res.status(404).json({ message: 'Message non trouvé' })
        }

        const deleteMessage = await messageToDelete.destroy()
        messageEvents.modifierMessage(deleteMessage)
        return res.status(200).json({ message: 'Message supprimé avec succès' })
    } catch (error) {
        console.error('Erreur lors de la suppression du message:', error)
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppréssion du message' })
    }
})

//Afficher toutes les pièces jointes d'une discussion
router.get('/allPieceJointe/:discussionId', async(req, res) => {
    try {
        const pieceJointe = await PieceJointeMessage.findAll({
            include: {
                model: Message,
                where: { discussion: req.params.discussionId }
            }
        })

        return res.status(200).json({ piecesJointes });
    } catch (error) {
        console.error('Erreur lors de la récupération des pièces jointes')
        res.status(500).json({ message: 'Une erreur s\'est produit lors de la récupération des pièces jointes' })
    }
})








module.exports = router