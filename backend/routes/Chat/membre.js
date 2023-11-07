const Membre = require('../../Modele/ChatModel/Membre');
const Collab = require('../../Modele/CollabModel/Collab');
const Compte = require('../../Modele/CompteModel/Compte');
const newLocal = '../../events/Chat/MembreEvents';
const MembreEvents = require(newLocal);
const { verifyToken } = require('../Compte/auth');


const router = require('express').Router();

//Ajouter un nouveau membre à la discussion
router.post('/addMember', verifyToken, async(req, res) => {
    try {
        const userDiscussion = await Membre.findOne({
            where: {
                membre: req.userId,
                discussion: req.params.discussionId
            }
        })

        if (!userDiscussion) {
            return res.status(404).json({ message: 'Discussion non trouvé' })
        }

        //Vérifier si l'utilisateur à ajouter est déjà membre de cette discussion
        const isUserAlreadyMember = await Membre.findOne({
            where: {
                membre: req.body.newMemberId,
                discussion: req.params.discussionId
            }
        })


        if (isUserAlreadyMember) {
            return res.status(400).json({ message: 'Utilisateur déjà membre de cette discussion' })
        }

        const newMembre = await Membre.create({
            discussion: req.params.discussionId,
            membre: req.body.newMemberId,
            pseudo: req.body.pseudo,
        })
        MembreEvents.ajouterMembre(newMembre)


        return res.status(201).json({ message: 'Nouveau membre ajouté avec succés' })
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un membre à la discussion')
        res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'ajout du membre à la discussion' });
    }
})

//Afficher les membres de la discussion
router.get('/alldiscussionMembers', verifyToken, async(req, res) => {
    try {
        const userDiscussion = await Membre.findOne({
            where: {
                membre: req.userId ?
                    discussion : req.params.discussionId
            }
        })

        if (!userDiscussion) {
            return res.status(404).json({ message: 'Discussion non trouvé' })
        }

        //Récupérer toute les membres de la discussion
        const discussionMembers = await Membre.findAll({
            where: {
                discussion: req.params.discussionId
            },
            attributes: ['membre', 'pseudo', 'image']
        })

        if (discussionMembers.length === 0) {
            return res.status(404).json({ message: 'Aucum membre non trouvé pour cette discussion' })
        }

        res.status(200).json({ members: discussionMembers });

    } catch (error) {
        console.error('Erreur lors de la récupération des membres de la discussion')
        res.status(500).json({ message: 'Une erreurs s\'est produite lors de la récupération de membre existants' })
    }
})


//Supprimer un membre discussion
router.delete('/deleteMember/:discussionID/:membreId', verifyToken, async(req, res) => {
    try {
        const userDiscussion = await Membre.findOne({
            where: {
                membre: req.userId,
                discussion: req.params.discussionID,

            }
        })

        if (!userDiscussion) {
            return res.status(404).json({ message: 'Discuusion non trouvé' })
        }

        const memberToRemove = await Membre.findOne({
            where: {
                discussion: req.params.discussionID,
                membre: req.params.membreId
            }
        })


        if (!memberToRemove) {
            return res.status(404).json({ message: 'Membre non trouvé' })
        }

        const deleteMembre = await memberToRemove.destroy();
        MembreEvents.supprimerMembre(deleteMembre)

        return res.status(200).json({ message: 'Membre retiré avec succès' })
    } catch (error) {
        console.error('Erreur lors de la suppréssion du membre de la discussion')
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du membre' })
    }
})

//Modifier le pseudo d'un membre de la discussion
router.put('/updateMembersPseudo/:discussionID/:membreId', verifyToken, async(req, res) => {
    try {
        const userDiscussion = await Membre.findOne({
            where: {
                membre: req.userId,
                discussion: req.params.discussionId
            }

        });

        if (!userDiscussion) {
            return res.status(404).json({ message: 'Discussion non trouvé' });
        }

        const memberToUpdate = await Membre.findOne({
            where: {
                discussion: req.params.discussionID,
                membre: req.params.membreId
            }
        })

        if (!memberToUpdate) {
            return res.status(404).json({ message: 'Membre non trouvé' })
        }


        if (req.body.pseudo.trim() === '') {
            const user = await Compte.findByPk(req.params.memberId, include = [{ model: Collab }])
            if (user) {
                memberToUpdate.pseudo = user.Collab.nom
            }
        } else {
            memberToUpdate.pseudo = req.body.pseudo
        }

        const updateMembre = await memberToUpdate.save()
        MembreEvents.modifierMembre(updateMembre)

        return res.status(200).json({ message: 'Pseudo du membre mise à jour' })

    } catch (error) {
        console.error('Erreur lors de la mise à jour du pseudo du membre de la discussion')
        res.status(500).json({
            message: 'Une erreur s\'est produite lors de la mise à jour du membre'
        })
    }
})




module.exports = router;