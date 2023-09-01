const Role = require('../../Modele/RoleModel/Role');

const router = require('express').Router();

//Ajouter un rôle
router.post('/add_role', async(req, res) => {
    try {
        const newRole = await Role.create({
            titreRole : req.body.titreRole
        })
        const savedRole = await newRole.save();
        return res.status(201).json(savedRole);
    }
    catch (err) {
        console.error('Erreur lors de la création d\'un rôle: ', err);
        res.status(201).json({message : 'Erreur lors de la création d\'un rôle'});
    }
})

//Listes des rôles
router.get('/all_role', async(req, res) => {
    try {
        const listRole = await Role.findAll();
        res.status(201).json(listRole);
    }
    catch (error){
        console.error('Erreur lors de la génération du liste des rôles :', error);
        res.status(500).json({message : 'Erreur lors de la génération du liste des rôle'});
    }
})

//Mise à jour des rôle existants
router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const updateRole = await Role.findByPk(id);
        if (!updateRole) {
            return res.status(404).json({error : 'Rôle introuvable'});
        }
        const updatedRole = await updateRole.update({
            titreRole : req.body.titreRole,
        })

        res.status(201).json(updatedRole);
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour du rôle', error);
        res.status(500).json({error : 'Erreur lors de la mise à jour du rôle'})
    }
})

//Supprimer un rôle
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params; 
    try {
        const deleteRole = await Role.findByPk(id);
        if (!deleteRole) {
            return res.status(404).json({error : 'Rôle introuvable'});
        }
        await deleteRole.destroy();
        res.sendStatus(204);
    }
    catch (error){
        console.error('Erreur lors de la suppression du rôle:', error)
        res.status(500).json({message : 'Erreur lors de la suppression du rôle'})
    }
})

module.exports = router;