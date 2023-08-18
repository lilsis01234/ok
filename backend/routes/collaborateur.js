const router = require('express').Router();

const Collaborateur = require('../Modele/Collaborateur');
const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste');
const CompteCollab = require('../Modele/CompteCollab');
const authentificateToken = require('../middlware/authentificationMiddlware')
const multer = require('multer'); //Package pour gérer l'upload des contenus multimédias
const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config();

const bcrypt = require('bcrypt');
const Role = require('../Modele/Role');
const transporter  = require('../config/mailConfig');




//Configuration du stockages des fichiers uploader
const storage = multer.diskStorage({
    destination : 'uploads/',
    filename : (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
})

const upload = multer({storage});

//Génération du mot de passe
function generateRandomPassword(){
    const lenght = 10;
    const charset = 'abcdefghijkimnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345689'
    let password = "";
    for (let i = 0; i < lenght; i++){
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex)
    }
    return password;
}


//Ajouter des collaborateurs
router.post('/add', upload.single('image') ,async (req, res) => {
    try {
        const image = req.file;

        const newCollab = await Collaborateur.create({
            matricule : req.body.matricule,
            nom : req.body.nom,
            prenom : req.body.prenom,
            dateNaissance : req.body.dateNaissance,
            sexe : req.body.sexe,
            lot : req.body.lot,
            quartier : req.body.quartier,
            ville : req.body.ville,
            tel : req.body.telephone,
            dateEmbauche : req.body.dateEmbauche,
            site : req.body.site,
            image : image ? image.path : null ,
            poste: req.body.poste,
            sexe:req.body.sexe
        })
        const savedCollab = await newCollab.save();

        //Hachage du mot de passe
        const saltRounds = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds);
        const generatePassword = generateRandomPassword();

        const hashedPassword = await bcrypt.hash(generatePassword, saltRounds);

        //Définition du formulaire par défaut
        let role = req.body.RoleId
        if (!role) {
            const UserRole = await Role.findOne({
                where: {titreRole  : "User"}
            })

            if(UserRole) {
                role = UserRole.id;
            } else {
                console.error("Le rôle 'User' n'a pas été trouvé");
            }
    
        }


        const newCompte = await CompteCollab.create({
            email : req.body.email,
            password : hashedPassword,
            collaborateur : savedCollab.id,
            RoleId : role
        })
        const savedCompte = await newCompte.save();

        res.status(201).json(savedCompte);


        //Envoie de mail quand l'utilisateur est crée
        const mailOptions = {
            from : process.env.MAIL_USER,
            to : req.body.email,
            subject : 'Détails de votre compte',
            html : `<div>
                        <p>Votre compte a été crée avec succès.</p>
                        <p>Voici vos identifiant </p>
                        <p>Email : ${req.body.email}</p>
                        <p>Mot de passe : ${generatePassword}<p>            
                    </div>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error){
                console.error('Erreur lors de l\envoie de l\'email : ', error)
            }
            else {
                console.log('E-mail envoyé:', info.response)
            }
        });



    }
    catch (err) {
        console.error('Erreur lors de la création d\'un collaborateur: ', err);
        res.status(201).json({message : 'Erreur lors de la création d\'un collaborateur'});
    }
})


//Afficher la liste des postes 
router.get('/all_collaborateurs', async(req,res) => {
    Collaborateur.findAll({
        include : {model : Poste, attributes : ['titrePoste', 'departement'], 
             include : {model : Departement, attributes : ['nomDepartement']}   
            }
    })
    .then((collaborateur) => {
        res.status(200).json(
            collaborateur.map((collaborateur) => {
                return {
                    id : collaborateur.id,
                    matricule : collaborateur.matricule,
                    nom : collaborateur.nom,
                    prenom : collaborateur.prenom,
                    sexe : collaborateur.sexe,
                    dateNaissance: collaborateur.dateNaissance,
                    lot : collaborateur.lot,
                    quartier : collaborateur.quartier,
                    ville : collaborateur.ville,
                    tel : collaborateur.tel,
                    dateEmbauche : collaborateur.dateEmbauche,
                    site : collaborateur.site,
                    image : collaborateur.image,
                    titrePoste : collaborateur.Poste.titrePoste,
                    departement : collaborateur.Poste.Departement.nomDepartement,
                }
            })
        )
        console.log(collaborateur)
    }) 
})


//Liste des derniers collaborateurs
router.get('/listes_derniers_embauches',  async (req, res) => {
    try {
        const collaborateur = await Collaborateur.findAll({
            order : [['dateEmbauche', 'DESC']],
            limit : 10,
            include : {
                model : Poste,
                attributes : ['titrePoste', 'departement'],
                include : {
                    model : Departement,
                    attributes : ['nomDepartement']
                }
            }
        })

        res.status(200).json(
            collaborateur.map((collaborateur) => {
                return {
                    id : collaborateur.id,
                    matricule : collaborateur.matricule,
                    nom : collaborateur.nom,
                    prenom : collaborateur.prenom,
                    dateEmbauche : collaborateur.dateEmbauche,
                    site : collaborateur.site,
                    titrePoste : collaborateur.Poste.titrePoste,
                    departement : collaborateur.Poste.Departement.nomDepartement,
                    image : collaborateur.image,
                }
            })
        )
    }
    catch (error) {
        res.status(500).json({message : "Une erreur s'est produit dans la récupération des données"})
    }
})


//Afficher seulement un collaborateur
router.get('/:id', async(req, res) => {
    const {id} = req.params; 
    try {
        const collaborateur = await Collaborateur.findByPk(id, {
            include : [
                {
                    model: Poste,
                    attributes : ['titrePoste'],
                    include : [
                       {
                           model : Departement,
                           attributes : ['nomDepartement']
                       }
                    ]
                }
            ]
        });
        if (!collaborateur) {
            return res.status(404).json({error : 'Collaborateur introuvable'});
        }
        res.json({collaborateur});
    }
    catch (err) {
        console.error('Erreur lors de la récupération du collaborateur', err);
        res.status(500).json({error : 'Erreur lors de la récupération du collaborateur'})
    }
})

//Mettre à jour un collaborateur existant 
router.put('/edit/:id', upload.single('image') ,async(req, res) => {
    const image = req.file;

    const  {id} = req.params;
    try {
        const updateCollab = await Collaborateur.findByPk(id);
        const imageCollab = updateCollab.image
        if (!updateCollab) {
            return res.status(404).json({error : 'Collaborateur introuvable'});
        }
        const updatedCollab = await updateCollab.update({
            lot : req.body.lot,
            quartier : req.body.quartier,
            ville : req.body.ville,
            tel : req.body.tel,
            site : req.body.site,
            image : image ? image.path : imageCollab ,
            poste: req.body.poste,
            })
       

        res.status(201).json(updatedCollab)
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour du collaborateur', error);
        res.status(500).json({error : 'Erreur lors de la mise à jour du collaborateur'});
    }
})

//Supprimer un collaborateur 
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deleteCollaborateur = await Collaborateur.findByPk(id);
        if (!deleteCollaborateur) {
            return res.status(404).json({error : 'Collaborateur introuvable'});
        }
        await deleteCollaborateur.destroy();
        res.sendStatus(204);
    }
    catch (error){
        console.error('Erreur lors de la suppression du poste :', error)
        res.status(500).json({message : 'Erreur lors de la suppression du poste'})
    }
})




module.exports = router;