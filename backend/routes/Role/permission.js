const Role = require('../../Modele/RoleModel/Role');
const Compte = require('../../Modele/CompteModel/Compte')
const {RoleHierarchique, Permission, RolePermission} = require('../../Modele/RoleModel/associationPermission')


const router = require('express').Router();

router.post('/new', async (req, res) => {
    try {
        const { permission, role } = req.body;

        const newPermission = await Permission.create({
            permission
        })


        if (role && role.length > 0) {
            for (const roleId of role) {
                const roleInstance = await RoleHierarchique.findByPk(roleId)
                if (!roleInstance) {
                    console.log('RolePermission non sauvegardé', roleId)
                }

                console.log(typeof(newPermission.id))
                console.log(typeof(roleInstance.id))
                 await RolePermission.create({
                    permission: newPermission.id,
                    role: roleInstance.id
                })

            }
        }
        return res.status(201).json({ message: 'Permission crée avec succès' })


    } catch (error) {
        console.error('Erreur lors de la création de la permission :', error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du permission' });
    }
})


//Récupérer toutes les permissions 
router.get('/all', async (req, res) => {
    try {
        const permission = await Permission.findAll({
            include: [
                {
                    model: RoleHierarchique,
                    as: 'role',
                    include: {
                        model: Role
                    }
                }
            ]
        })
        res.status(200).json(permission)
    } catch (error) {
        console.error('Erreur lors de la récupération des permission', error)
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération de la permission' })
    }
})

//Afficher seulement un permission et les rôles qui lui sont associés
router.get('/view/:id', async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id, {
            include: [{
                model: RoleHierarchique,
                as: 'roleHierarchique',
                include: {
                    model: Role
                }
            }]

        })
        return res.status(200).json(permission)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Une erreur s\'est survenue lors de la récupération des permissions' })
    }
})

//Modifier les permisssion et les roles qui lui sont associé
router.put('/:id/edit', async (req, res) => {
    try {
        const permissionId = req.params.id;
        const { permission, role } = req.body;

        const permissionInstance = await Permission.findByPk(permissionId);

        if (!permissionInstance) {
            return res.status(401).json({ message: "La permission n'existe pas" })
        }

        permissionInstance.permission
        await permissionInstance.save();

        //Récupérer les associtions actuelles de la permission
        const association = await RolePermission.findAll({
            where: {
                permission: permission.id
            }
        })

        //Récupérer les id des departements associés 
        const roleActuelle = association.map((assoc) => assoc.role)

        //Identifier les departement à ajouter
        const roleAAjouter = role.filter((roleId) => !roleId.includes(roleId))

        //Identifier les departements avec les associations 
        const roleASupprimer = roleActuelle.filter((roleId) => !role.includes(roleId))

        await RolePermission.destroy({
            where : {
                permission : permissionInstance.id,
                role : roleASupprimer.id
            }
        })

        //Ajouter nouvelle associations
        for (const roleId of roleAAjouter) {
            const roles = await RoleHierarchique.findByPk(roleId)

            if (!roles) {
                return res.status(404).json({ message: `Le département avec l'ID ${roleId} est introuvable` })
            }

            await RoleHierarchique.create({
                permission : permissionInstance.id,
                role: roles.id
            })

        }

        return res.status(200).json({ message: 'Permission mise à jour avec succès' })
    } catch (error) {
        console.error('Erreur lors de la mise à jour du permission', error)
        return res.status(401).json({ message: 'Erreur lors de la mise à jour du permission' })
    }
})


//Pour supprimer les postes et ses associations
router.delete('/:id/delete', async (req, res) => {
    try {
        const permissionId = req.params.id;
        const permission = await Permission.findByPk(permissionId)

        if (!permission) {
            return res.status(404).json({ message: "La permission n'existe pas" });
        }

        await RolePermission.destroy({
            where: {
                permission: permission.id
            }
        })

        await Permission.destroy({
            where: {
                id: permission.id,
            }
        })

        return res.status(200).json({ message: 'Permision supprimé avec succès' })

    }
    catch (error) {
        console.error('Erreur lors de la suppression de la permission:', error);
        return res.status(401).json({ message: 'Erreur lors de la suppression de la permission' })
    }
})

//Récuperer les permissions de l'utilisateurs
router.get('/user/:id', async(req, res) => {
    const compteId = req.params.id;
    try {
        const compte = await Compte.findByPk(compteId, {
            include : [
                {
                    model : RoleHierarchique,
                    include : [
                        {
                            model : Permission,
                            as : 'permission',
                            attributes: ['permission'],
                        }, {
                            model : Role
                        }
                    ]
                }
            ]
        })


        if(compte){
            const role = Array.isArray(compte.RoleHierarchique) ? compte.RoleHierarchique : [];
            const permission = role.reduce((acc, role) => {
                return acc.concat(role.Permissions || []);
            }, [])
            return res.status(200).json({permission});
        } else {
            return res.status(401).json({message : 'Compte non trouvé'})
        }

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return res.status(401).json({ message: 'Une erreur s\'est produite lors de la récupération des données' });
    }
})




module.exports = router;