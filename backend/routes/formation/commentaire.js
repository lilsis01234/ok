const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());
const Commentaire = require('../../Modele/formation/CommentaireFormation')
const Collaborateur = require('../../Modele/Collaborateur');
const DiscussionFormation = require('../../Modele/formation/DiscussionFormation');

router.get('/all_comments/:idDiscussion', async(req,res)=>{
    const formationId = req.params.idDiscussion;
        try {
            const commentaireDiscussion = await Commentaire.findAll({
                include: [
                    {
                        model: Collaborateur,
                        attributes: ['nom', 'prenom']
                    },
                    {
                        model:DiscussionFormation,
                    }
                ],
                where:
                    {
                        discussion: formationId,
                    },
                order: [['created_at', 'ASC']],
            });
            res.status(200).json(commentaireDiscussion);
        } catch (error) {
            console.error('Erreur lors de la récupération des discussions sur la formation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des discussions sur la formation' });
        }
    });

    
    router.delete('/deletecomment/:id',async(req,res)=>{
        const idCommentaire = req.params.id
        try {
            const commentaire = await Commentaire.findByPk(idCommentaire);
            if (!commentaire) {
                return res.status(404).json({ error: 'commentaire introuvable' });
            }
            
            // Supprimer la formation elle-même
            const supp = await commentaire.destroy();
            if(supp){
                res.status(200).send('bien supprimé');
            }
            
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            res.status(500).json({ message: 'Erreur lors de la suppression' });
        }
    });

    router.post('/addComment', async(req,res)=>{
        try {
            const newCommentaire = await Commentaire.create({
                contenu: req.body.contenu,
                collaborateur: req.body.idCollaborateur,
                discussion:req.body.idDiscussion
            });
            const newComment = await newCommentaire.save();
            res.status(201).json(newComment);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la création de la discussion' });
        }
    })
    
//Ajout de commentaire et fichiers par foreach

module.exports = router;