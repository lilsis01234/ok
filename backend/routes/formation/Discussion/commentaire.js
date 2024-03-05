const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());
const Commentaire = require('../../../Modele/formation/Discussions/CommentaireFormation')
const Collaborateur = require('../../../Modele/CollabModel/Collab');
const DiscussionFormation = require('../../../Modele/formation/Discussions/DiscussionFormation');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads2/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/all_comments/:idDiscussion', async(req,res)=>{
    const discussionId = req.params.idDiscussion;
        try {
            const commentaireDiscussion = await Commentaire.findAll({
                include: [
                    {
                        model: Collaborateur,
                        attributes: ['id','nom', 'prenom']
                    },
                ],
                where:
                    {
                        discussion: discussionId,
                    },
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

    router.post('/addComment',upload.array('pieceJointes', 5), async(req,res)=>{
        const pieceJointes = [];
        req.files.forEach((file) => {
            pieceJointes.push(file.path);
        });
        try {
            const newCommentaire = await Commentaire.create({
                contenu: req.body.contenu,
                collaborateur: req.body.idCollaborateur,
                discussion:req.body.idDiscussion,
                fichier: pieceJointes.join(', ')
            });
            const newComment = await newCommentaire.save();
            res.status(201).json(newComment);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la création du commentaire' });
        }
    })
    

module.exports = router;