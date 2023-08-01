const router = require('express').Router();

const Collaborateur = require('../Modele/Collaborateur');
const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste');
const CompteCollab = require('../Modele/CompteCollab');
const multer = require('multer'); //Package pour gérer l'upload des contenus multimédias
const path = require('path');

const bcrypt = require('bcrypt');


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


//Ajouter des collaborateurs
router.post('/add', upload.single('image') ,async (req, res) => {
    try {
        const image = req.file;

        const newCollab = await Collaborateur.create({
            matricule : req.body.matricule,
            nom : req.body.nom,
            prenom : req.body.prenom,
            dateNaissance : req.body.dateNaissance,
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
        const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds);

        const newCompte = await CompteCollab.create({
            email : req.body.email,
            password : hashedPassword,
            collaborateur : savedCollab.id,
            RoleId : req.body.RoleId
        })
        const savedCompte = await newCompte.save();

        res.status(201).json(savedCompte);
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
router.get('/listes_derniers_embauches', async (req, res) => {
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
                    matricule : collaborateur.matricule,
                    nom : collaborateur.nom,
                    prenom : collaborateur.prenom,
                    dateEmbauche : collaborateur.dateEmbauche,
                    site : collaborateur.site,
                    titrePoste : collaborateur.Poste.titrePoste,
                    departement : collaborateur.Poste.Departement.nomDepartement,
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
        const collaborateur = await Collaborateur.findByPk(id);
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
    console.log(req.body.lot);
    const  {id} = req.params;
    try {
        const updateCollab = await Collaborateur.findByPk(id);
        if (!updateCollab) {
            return res.status(404).json({error : 'Collaborateur introuvable'});
        }
        const updatedCollab = await updateCollab.update({
            lot : req.body.lot,
            quartier : req.body.quartier,
            ville : req.body.ville,
            tel : req.body.tel,
            site : req.body.site,
            image : image ? image.path : null ,
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