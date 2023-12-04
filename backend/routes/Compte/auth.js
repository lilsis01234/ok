const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const crypto = require('crypto');
const Role = require('../../Modele/RoleModel/Role');
const Compte = require('../../Modele/CompteModel/Compte');
// const { RoleHierarchique, Permission } = require('../../Modele/RoleModel/associationPermission')
const RoleHierarchique = require('../../Modele/RoleModel/RoleHierarchique');
const Collab = require('../../Modele/CollabModel/Collab');


const router = require('express').Router();
router.use(cookieParser());

const secretKey = crypto.randomBytes(32).toString('hex');



//Route pour se connecter
router.post('/connect', (req, res, next) => {
    Compte.findOne({
            where: { email: req.body.email },
            include: [{
                model: Collab,
                attributes: ['id','nom', 'prenom', 'matricule', 'image', 'equipe']
            }, {
                model: RoleHierarchique,
                include: {
                    model: Role
                }
            }],
           
        })
        .then(comptes => {
            if (!comptes) {
                return res.status(401).json({ message: 'Identifiant non trouvé' })
            }
            bcrypt
                .compare(req.body.password, comptes.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect' })
                    }

                    const userRoleId = comptes.RoleHierarchiqueId;

                    RoleHierarchique.findOne({
                        where: { id: userRoleId },
                        attributes: ['roleHierarchique'],
                        include: [{
                            model: Role,
                        }]
                    })
                        .then((roles) => {
                            const userRoles = roles ? [roles.roleHierarchique] : [];
                            if (userRoles.length === 0) {
                                return res.status(401).json({ message: 'Rôles non définis pour l\'utilisateur ' });
                            }
                            // const roleTitle = userRoles.length > 0 ? userRoles[0] :null;

                            const { password, ...comptesWithoutPassword } = comptes.toJSON();

                            const token = jwt.sign({ id: comptes.id },
                                secretKey, { expiresIn: '1h' }
                            )
                            const refresh_token = jwt.sign({ id: comptes.id },
                                secretKey, { expiresIn: '2h' }
                            )
                            // res.cookie('token', token, {httpOnly: true, secure: true, maxAge: 86400000})

                            res.status(200).json({
                                id: comptes.id,
                                compte: comptesWithoutPassword,
                                token: token,
                                refresh_token,
                                role: roles.Role.titreRole,
                            })
                            console.log('Utilisateur connecté avec succés')


                        })
                })
                .catch(error =>{ 
                    res.status(401).json({error})
                    console.log(error)
            });
        })
        .catch(error => res.status(401).json(error));
})


//Renouveler le token
function verifyJWTToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
}

function refreshTokenIsValid(refresh_token) {
    try {
        jwt.verify(refresh_token, secretKey)
        return true
    } catch (error) {
        return false;
    }
}

function getUserIdFromRefreshToken(refresh_token) {
    try {
        const decoded = jwt.verify(refresh_token, secretKey)
        return decoded.id
    } catch (error) {
        throw new Error('Erreur lors de l\'extraction de l\'ID utilisateurs du refresh_token')
    }
}



router.post('/refresh_token', (req, res) => {
    const refresh_token = req.body.refresh_token

    if (refreshTokenIsValid(refresh_token)) {
        const userId = getUserIdFromRefreshToken(refresh_token)
        const token = jwt.sign({ id: userId },
            secretKey, { expiresIn: '1h' }
        )
        const refresh_token = jwt.sign({ id: userId },
            secretKey, { expiresIn: '2h' }
        )
        res.json({ token, refresh_token })
    } else {
        res.status(401).json({ message: 'Refresh Token invalide' })
    }


})





//Renouveler le token et vérifier que l'un des deux token est toujours valide
router.post('/access-token', async (req, res) => {
    const { acess_token, refresh_token } = req.body;

    const decodedToken = verifyJWTToken(acess_token);
    const decodedRefreshToken = refreshTokenIsValid(refresh_token)

    if (decodedRefreshToken) {
        if (decodedToken) {
            const id = decodedToken.id;
            const newAcessToken = jwt.sign({ id }, secretKey, {
                expiresIn: '1h'
            })

            const refresh_token = jwt.sign({ id },
                secretKey, { expiresIn: '2h' }
            )

            const compte = await Compte.findByPk(id, {
                include : [{
                    model : RoleHierarchique,
                    include : [{
                        model : Role
                    }]
                }], 
                include : [{
                    model : Collab,
                    attributes: ['id','nom', 'prenom', 'matricule', 'image']
                }],
                attributes: ['email', 'collaborateur', 'lastResetRequest', 'RoleHierarchiqueId']
            })
            console.log(compte)


            return res.status(200).json({
                id,
                compte,
                token: newAcessToken,
                refresh_token,
                role: compte.RoleHierarchique?.Role?.titreRole
            })
        }
    }
    console.log('Token invalide')
    return res.status(401).json({ error: 'Token invalide' })
})



const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).json("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, secretKey); // Utilisez la clé secrète correcte
        req.user = verified;
        req.userId = verified.id
        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





module.exports = router;
module.exports.verifyToken = verifyToken