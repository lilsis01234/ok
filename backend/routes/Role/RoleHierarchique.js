const Role = require('../../Modele/RoleModel/Role');
const RoleHierarchique = require('../../Modele/RoleModel/RoleHierarchique');

const router = require('express').Router();

//Créer un rôle
router.post('/new', async(req, res) => {
    try {
        const newRoleHierarchique = await RoleHierarchique.create({
            roleHierarchique : req.body.roleHierarchique,
            RoleId : req.body.RoleId
        })
        const savedRoleHierarchique = await newRoleHierarchique.save();
        return res.status(201).json(savedRoleHierarchique)
    }
    catch(err){
        console.error('Erreur lors de la création d\'un rôle hiérarchique:' , err);
        res.status(201).json({message : 'Erreur lors de la création d\'un rôle'})
    }
})

//Liste de tous les rôles
router.get('/all', async(req, res) => {
    try {
        const listRoleHierarchique = await RoleHierarchique.findAll({
            include : {
                model : Role
            }
        });
        res.status(201).json(listRoleHierarchique);
    }
    catch (error){
        console.error('Erreur lors de la génération du liste des rôles:', error)
        res.status(500).json({message : 'Erreur lors de la génération du liste des rôles hierarchiques'})
    }
})

//Mise à jour des rôles existants
router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const updateRoleHierarchique = await RoleHierarchique.findByPk(id);
        if (!updateRoleHierarchique) {
            return res.status(404).json({error : 'Rôle introuvable'})
        }
        const updatedRolHierarchique = await updateRoleHierarchique.update({
            roleHierarchique : req.body.roleHierarchique,
            RoleId : req.body.RoleId
        })

        res.status(201).json(updatedRolHierarchique)
    }
    catch(error){
        console.error('Erreur lors de la mise à jour du rôle', error);
        res.status(500).json({error : 'Erreur lors de la mise à jour du rôle'})
    }
})

//Voir le rôle hierarchique
router.get('/view/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const roleHierarchique = await RoleHierarchique.findByPk(id);
        if(!roleHierarchique){
            return res.status(404).json({error: 'Rôle introuvable'})
        }
        res.status(201).json(roleHierarchique)
    }
    catch(error){
        console.error('Erreur lors de l\'affichage du rôle', error);
        res.status(500).json({error : 'Erreur lors de l\'affichage du rôle'})
    }
})

//Effacer le rôle hierarchique
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deleteRole = await RoleHierarchique.findByPk(id);
        if(!deleteRole){
            return res.status(404).json({error : 'Rôle introuvable'});
        }
        await deleteRole.destroy();
        res.sendStatus(204)
    }
    catch(error){
        console.error('Erreur lors de la suppréssion du rôle:', error)
        res.status(500).json({message : 'Erreur lors de la suppression du rôle'})
    }

})

module.exports = router;