const Collab = require('../../Modele/CollabModel/Collab');
const InfoSocialCollab = require('../../Modele/CollabModel/InfoSocialCollab');

const router = require('express').Router()


//Afficher les informations sociales d'un collaborateurs
router.get('/view/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const infoCollab = await InfoSocialCollab.findOne({
            where : {collaborateur : id},
            include : {
                model : Collab
            }
        })
        if(!infoCollab){
            console.error("Information Sociale Collaborateur non trouvé");
        }
    } catch (error){
        console.error('Erreur lors de la récupération du collaborateur:', err);
        res.status(201).json({message : 'Erreur lors de la récupération des informations des collaborateur'})
    }
})


//Mettre à jour les informationss sociales des collaboratueurs
router.put('/:id/edit' , async(req, res) => {
    const {id} = req.params;

    try {
        const infoCollab = await InfoSocialCollab.findOne({
            where : {collaborateur : id}
        })

        if(!infoCollab){
            console.error("Information Sociale Collaborateur non trouvé");
        }

        const updatedCollab = await updatedCollab.update({
            numCnaps : req.body.numCnaps,
            Banque : req.body.Banque,
            RIB : req.body.RIB,
        })

        res.status(201).json(updatedCollab)

    }
    catch(error){
        console.error("Erreur lors de la mise à jour des infos collaborateur', error");
        res.status(500).json({error : 'Erreur lors de la mise à jour des infos collaborateurs'})
    }
})


//Supprimer les informations sociales des collaborateurs
router.delete('/:id/delete', async(req, res) => {
    const {id} = req.params;
    try {
        const infoCollab = await InfoSocialCollab.findOne({
            where : {collaborateur : id}
        })

        if(!infoCollab){
            console.error("Information Sociale Collaborateur non trouvé");
        }
        await infoCollab.destroy();
        res.sendStatus(204)
    }
    catch (error){
        console.error('Erreur lors de la suppressions des infos collaborateurs:', error)
        res.status(500).json({message : 'Erreur lors de la suppression des infos des collaborateurs'})
    }
})





module.exports = router;
