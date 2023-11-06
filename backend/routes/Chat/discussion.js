const router = require('express').Router();

const { Discussion, Compte, Membre } = require('../../Modele/ChatModel/associationChat.js');
const Collab = require('../../Modele/CollabModel/Collab.js');
const discussionEvents = require('../../events/Chat/discussionEvents.js');
const { verifyToken } = require('../Compte/auth.js')

const multer = require('multer')
const path = require('path')

require('dotenv').config();



const storage = multer.diskStorage({
    destination: 'uploads/chat',
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
})

const upload = multer({ storage });


//Créer une nouvelle discussions et ajouter une nouvelle membre
router.post('/new', verifyToken, upload.single('imageDiscussion'), async(req, res) => {
    try {
        const { membre, nomDiscussion } = req.body



        //si membre de la discussion est égale à 2 personne
        let nomsDiscussion = ''
        let imagesDiscussion = ''
        if (membre.length <= 2) {
            nomsDiscussion = ''
            imagesDiscussion = ''
        } else {
            if (req.file) {
                imagesDiscussion = req.file.path;
            } else {
                imagesDiscussion = ''
            }
            nomsDiscussion = nomDiscussion
        }

        //Création d'une nouvelle discussion
        const nouvelleDiscussion = await Discussion.create({
            nomDiscussion: nomsDiscussion,
            imageDiscussion: imagesDiscussion
        })

        //Recherche des infos de la collaborateur connecté
        const collabConnected = Compte.findByPk(req.userId, {
            include: [{
                model: Collab,
            }]
        })

        const nomUser = collabConnected.Collab.prenom + ' ' + collabConnected.Collab.nom
        const imageUser = collabConnected.Collab.image

        //Création du premier membre du discussion crée c'est l'utilisateur connecté
        await Membre.create({
            discussion: nouvelleDiscussion.id,
            membre: req.userId,
            pseudo: nomUser,
            image: imageUser

        })


        //Ajout des autres membres de la discussion
        if (membre && membre.length > 0) {
            for (const membreId of membre) {
                const user = await Compte.findByPk(membreId, {
                    include: [{
                        model: Collab
                    }]
                })
                if (!user) {
                    console.log('Utilisateur non trouvé', user)
                }

                const nameOtherMembre = user.Collab.prenom + '' + user.Collab.nom
                const imageOtherDiscussion = user.Collab.image
                await Membre.create({
                    discussion: nouvelleDiscussion.id,
                    membre: membreId,
                    pseudo: nameOtherMembre,
                    image: imageOtherDiscussion,
                })
            }
        }

        discussionEvents.ajouterDiscussion(nouvelleDiscussion);
        return res.status(201).json({ message: 'Discussion crée avec succés' })
    } catch (error) {
        console.error('Erreur lors de la création de la discussion :', error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de la discussion' });
    }
})

//Récupérer tout les discussion de l'utilisateur connecté à travers le table Discussion
router.get('/user/allDiscussion', verifyToken, async(req, res) => {
    try {
        const userDiscussions = await Membre.findAll({
            where: {
                membre: req.userId
            }
        })

        const discussionDetails = await Promise.all(userDiscussions.map(async(membre) => {
            const similarMembers = await Membre.findAll({
                where: {
                    discussion: membre.discussion
                }
            })

            const memberCount = similarMembers.length;
            if (memberCount === 2) {
                const otherMember = similarMembers.find(member => member.member !== req.userId)
                if (otherMember) {
                    const otherMemberDetails = await Membre.findByPk(otherMember.membre, { attributes: ['pseudo', 'image'] })


                    return {
                        id: membre.discussion,
                        nomDiscussion: otherMemberDetails.pseudo,
                        imageDiscussion: otherMemberDetails.image
                    }
                }
            } else {
                const discussionDetails = await Discussion.findByPk(membre.discussion, {
                    attributes: ['nomDiscussion', 'imageDiscussion']
                })

                return {
                    id: membre.discussion,
                    nomDiscussion: discussionDetails.nomDiscussion,
                    imageDiscussion: discussionDetails.imageDiscussion
                }
            }

            return null;

        }))

        const filteredDetails = discussionDetails.filter(Boolean)
        res.status(200).json(filteredDetails)
    } catch (error) {
        console.error('Errur lors de la récupération des discussions')
        res.status(500).json({ message: 'Une erreur s\est produite lors de la récupération des discussion' })
    }
})

//Récupérer un des discussion de l'utilisateur connecté
router.get('/view/:id', verifyToken, async(req, res) => {
    try {
        const userDiscussions = await Membre.findOne({
            where: {
                membre: req.userId,
                discussion: req.params.id
            }
        })

        if (!userDiscussions) {
            return res.status(404).json({ message: 'Discussion non trouvé' })
        }

        const similarMembers = await Membre.findAll({
            where: {
                discussion: userDiscussions.discussion
            }
        });

        const memberCount = similarMembers.length;

        if (memberCount === 2) {
            const otherMember = similarMembers.find(member => member.member !== req.userId);

            if (otherMember) {
                const otherMemberDetails = await Membre.findByPk(otherMember.member, { attributes: ['pseudo', 'image'] })


                return res.status(200).json({
                    id: userDiscussions.discussion,
                    nomDiscussion: otherMemberDetails.pseudo,
                    imageDiscussion: otherMemberDetails.image
                })
            }

        } else {
            const discussionDetails = await Discussion.findByPk(userDiscussions, {
                attributes: ['nomDiscussion', 'imageDiscussion']
            })

            return res.status(200).json({
                id: userDiscussions.discussion,
                nomDiscussion: discussionDetails.nomDiscussion,
                imageDiscussion: discussionDetails.imageDiscussion
            })
        }



    } catch (error) {
        console.error('Erreur lors de la récupération de la discussion : ', error)
        res.status(500).json({ message: 'Une erreur s\est produite lors de la récupération de la discussion' })
    }
})


// Modifier la discussion
router.put('/edit/:id', verifyToken, upload.single('discussionImage'), async(req, res) => {
    try {
        const userDiscussions = await Membre.findOne({
            where: {
                membre: req.userId,
                discussion: req.params.id
            }
        })

        if (!userDiscussions) {
            return res.status(404).json({ message: 'Discussion non trouvé' })
        }

        const similarMembers = await Membre.findAll({
            where: {
                discussion: userDiscussions.discussion
            }
        })

        if (similarMembers.length > 2) {
            const discussionDetails = await Discussion.findByPk(userDiscussions.discussion);

            if (!discussionDetails) {
                return res.status(404).json({ message: 'Détail de la discussion non trouvé' })
            }

            if (req.file) {
                discussionDetails.imageDiscussion = req.file.path
            }

            if (req.body.nomDiscussion) {
                discussionDetails.nomDiscussion = req.body.nomDiscussion
            }


            const updateDiscussion = await discussionDetails.save();
            discussionEvents.modifierDiscussion(updateDiscussion);

            return res.status(200).json({ message: 'Discussion modifié avec succés' })

        } else {
            return res.status(403).json({ message: 'Modification non trouvé' })
        }

    } catch (error) {
        console.error('Erreur lors de la modification de la discussion')
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la modification de la discussion' })
    }
})


//Supprimer les discussions
router.delete('/delete/:id', verifyToken, async(req, res) => {
    try {
        const userDiscussion = await Membre.findOne({
            where: {
                membre: req.userId,
                discussion: req.params.id
            }
        })

        if (!userDiscussion) {
            return res.status(404).json({ message: 'Discussion non trouvé' })
        }

        const deletedDiscussion = await Discussion.destroy({
            where: {
                id: req.params.discussionId
            }
        })

        if (deletedDiscussion === 1) {
            discussionEvents.supprimerDiscussion(deletedDiscussion)
            return res.status(200).json({ message: 'Discussion supprimés avec succés' })
        } else {
            return res.status(500).json({ message: 'Erreur de la suppréssion de la discussion' })
        }



    } catch (error) {
        console.error('Erreur lors de la suppression de la discussion :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de la discussion' });
    }
})





module.exports = router;