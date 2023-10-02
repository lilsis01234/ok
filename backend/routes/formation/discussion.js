const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const Collaborateur = require('../../Modele/Collaborateur');
const DiscussionFormation = require('../../Modele/formation/DiscussionFormation');

router.get('/all_discussions/:idformation', async(req,res)=>{
    const formationId = req.params.idformation;
        try {
            const discussionFormation = await DiscussionFormation.findAll({
                include: {
                    model: Collaborateur,
                    attributes: ['nom', 'prenom']
                },
                where:
                    {
                        formation: formationId,
                    },
            });
            res.status(200).json(discussionFormation);
        } catch (error) {
            console.error('Erreur lors de la récupération des discussions sur la formation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des discussions sur la formation' });
        }
    });

    router.post('/nouveauDiscussion',async(req,res)=>{
        try{
            const newDiscussion = await(DiscussionFormation.create({
                sujet:req.body.sujet,
                contenu:req.body.contenu,
                formateur:req.body.formateur,
                formation:req.body.formation,
                collaborateur:req.body.collaborateur,
                module:req.body.module,
            }))
            //fichier à ajouter par multer à regarder sur l'appli dokotera 
            //recueil des fichiers par boucle
            const newdiscussion = await newDiscussion.save();
            res.status(201).json(newdiscussion);
        }
        catch(err){
            console.error(err)
        }
    })
module.exports = router;