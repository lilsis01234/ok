const Role = require('../../Modele/RoleModel/Role');
const Compte = require('../../Modele/CompteModel/Compte')
const {RoleHierarchique, Permission, RolePermission} = require('../../Modele/RoleModel/associationPermission')


const router = require('express').Router();

router.post('/new', async (req, res) => {
    try {
        const { permission, role } = req.body;

        // Créer la nouvelle permission
        const newPermission = await Permission.create({
            permission
        });

        // if (!permissionId) {
        //     throw new Error("L'ID de la nouvelle permission n'a pas été correctement obtenu.");
        // }

        // Si des rôles sont associés, les ajouter à la table RolePermission
        if (role && role.length > 0) {
            for (const roleId of role) {
                const roleInstance = await RoleHierarchique.findByPk({
                    ProfileRoleId : roleId,
                });
                if (!roleInstance) {
                    console.log('RolePermission non sauvegardé', roleId);
                }

                // Créer l'association entre la permission et le rôle
                await RolePermission.create({
                    role: roleInstance.id,
                    permission: newPermission.id,   
                });
            }
        }

        return res.status(201).json({ message: 'Permission créée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la création de la permission :', error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de la création de la permission' });
    }
});




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
                as: 'role',
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
        const id = req.params.id;
        const { permission, role } = req.body;

        console.log(req.body);
        
        const permissionInstance = await Permission.findByPk(id);

        if (!permissionInstance) {
            return res.status(404).json({ message: "La permission n'existe pas" });
        }

        // Mettez à jour la propriété "permission"
        permissionInstance.permission = permission;
        await permissionInstance.save();

        // Récupérer les associations actuelles de la permission
        const associations = await RolePermission.findAll({
            where: {
                permission: permissionInstance.id
            }
        });

        // Récupérer les id des rôles associés
        const rolesActuels = associations.map((assoc) => assoc.role);

        // Identifier les rôles à ajouter
        const rolesAAjouter = role.filter((roleId) => !rolesActuels.includes(roleId));

        // Identifier les rôles à supprimer
        const rolesASupprimer = rolesActuels.filter((roleId) => !role.includes(roleId));

        // Supprimer les associations existantes
        await RolePermission.destroy({
            where: {
                permission: permissionInstance.id,
                role: rolesASupprimer
            }
        });

        // Ajouter de nouvelles associations
        for (const roleId of rolesAAjouter) {
            const roleInstance = await RoleHierarchique.findByPk(roleId);

            if (!roleInstance) {
                return res.status(404).json({ message: `Le rôle avec l'ID ${roleId} est introuvable` });
            }

            await RolePermission.create({
                permission: permissionInstance.id,
                role: roleInstance.id
            });
        }

        return res.status(200).json({ message: 'Permission mise à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la permission', error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de la permission' });
    }
});


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