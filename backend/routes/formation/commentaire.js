const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());
const Commentaire = require('../../Modele/formation/CommentaireFormation')
const Collaborateur = require('../../Modele/Collaborateur');

router.get('/all_comments/:idDiscussion', async(req,res)=>{
    const formationId = req.params.idDiscussion;
        try {
            const commentaireDiscussion = await Commentaire.findAll({
                include: {
                    model: Collaborateur,
                    attributes: ['nom', 'prenom']
                },
                where:
                    {
                        discussion: formationId,
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

    
//Ajout de commentaire et fichiers par foreach

module.exports = router;