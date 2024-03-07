const Collab = require('../../Modele/CollabModel/Collab');
const GroupFormation = require('../../Modele/formation/PublicCible/GroupFormation');

const router = require('express').Router();

function buildCriteria(criteria){
    const where = {};
    for (let key in criteria){
      let value = criteria[key];
      if(Array.isArray(value)){
        where[key] = {[Op.or] : value};
      } else {
        where[key] = value
      }
    }
  
    return where;
  }
  

//Récupérer toutes les membres du groupe d'une formations
router.get('/all/:id', async(req, res) => {
    try {
        const membreGroupeFormation = await GroupFormation.findAll({
            where : {
                formation : id
            }, 
            include : [{
                model : Collab,
                attributes : ['id', 'nom', 'prenom', 'image']
            }]
        })

        res.status(200).json(membreGroupeFormation)

    } catch (error) {
        console.error('Erreur lors de la récupération des groupes de formation', error)
        res.status(500).json({error: 'Une erreur s\'est produite lors de la récupération des groupe de formation'})
    }
})


//Ajouter une nouveau membre au groupe d'informations
router.post('/add', async(req, res) => {
    try {
        const {formation , critere} = req.body;

        const collaborateur = await Collab.findAll({
            where : buildCriteria(critere)
        })

        for(const collab of collaborateur){
            await GroupFormation.create({
                formation : formation.id,
                collaborateur : collab.id
            })
        }


        res.status(200).json({message : 'Ajout de nouveau membre du formation est '})
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de l`\'ajout de nouveau membre dans le groupe'})
    }
})


//Supprimer un nouveau membre au groupe
router.delete('/delete/:id', async(req, res) => {
    try {
        const groupToDelete = await GroupFormation.findByPk(id)

        if(!groupToDelete){
            res.status(500).json({error :'Groupe Formation '})
        }

        await groupToDelete.destroy();
        res.status(200).json('Membre supprimé avec succès')
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Erreur lors de la suppression des formations'})
    }
})



module.exports = router