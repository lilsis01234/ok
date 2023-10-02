const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const multer = require('multer'); //Package pour gérer l'upload des contenus multimédias
const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config();

const bcrypt = require('bcrypt');

const transporter = require('../../config/mailConfig')

const Collab = require('../../Modele/CollabModel/Collab');
const Compte = require('../../Modele/CompteModel/Compte');
const TestPoste = require('../../Modele/Structure/TestPoste');
const TestDepartement = require('../../Modele/Structure/TestDepartement')
const Role = require('../../Modele/RoleModel/Role');

const { verifyToken } = require('../Compte/auth');
const Projet = require('../../Modele/Structure/Projet');
const RoleHierarchique = require('../../Modele/RoleModel/RoleHierarchique');
const Equipe = require('../../Modele/Structure/Equipe');

//Pour le route import
const excel = require('exceljs');
const { type } = require('os');

//Conserver l'image dans le mémoire
const storages = multer.memoryStorage();
const uploads = multer({ storage: storages })


//Configuration du stockages des fichiers uploader
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
})

const upload = multer({ storage });

//Génération du mot de passe
function generateRandomPassword() {
    const lenght = 10;
    const charset = 'abcdefghijkimnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345689'
    let password = "";
    for (let i = 0; i < lenght; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex)
    }
    return password;
}

//Ajouter un nouvel utilisateur
router.post('/new', upload.single('image'), async (req, res) => {
    try {
        const image = req.file;

        const newCollab = await Collab.create({
            matricule: req.body.matricule,
            nom: req.body.nom,
            prenom: req.body.prenom,
            dateNaissance: req.body.dateNaissance,
            lieuNaissance: req.body.lieuNaissance,
            sexe: req.body.sexe,
            lot: req.body.lot,
            quartier: req.body.quartier,
            ville: req.body.ville,
            adresse2: req.body.adresse2,
            tel: req.body.tel,
            tel2: req.body.tel2,
            telurgence: req.body.telurgence,
            CIN: req.body.CIN,
            dateDelivrance: req.body.dateDelivrance,
            lieuDelivrance: req.body.lieuDelivrance,
            statutmatrimoniale: req.body.statutmatrimoniale,
            nbEnfant: req.body.nbEnfant,
            dateEmbauche: req.body.dateEmbauche,
            site: req.body.site,
            image: image ? image.path : null,
            entreprise: req.body.entreprise,
            numCNAPS: req.body.numCNAPS,
            shift: req.body.shift,
            poste: req.body.poste,
            poste2: req.body.poste2,
            departement: req.body.departement,
            departement2: req.body.departement2,
            projet: req.body.projet,
            projet2: req.body.projet2,
            equipe: req.body.equipe,
            equipe2: req.body.equipe2
        })
        const savedCollab = await newCollab.save();

        //Hachage du mot de passe
        const saltRounds = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds);
        const generatePassword = generateRandomPassword();

        const hashedPassword = await bcrypt.hash(generatePassword, saltRounds);


        // //Insertion des informations sociales des utilisateurs
        // const newInfoSocialCollab = await InfoSocialCollab.create({
        //     collaborateur : savedCollab.id,
        //     numCnaps : req.body.email,
        //     Banque : req.body.Banque,
        //     RIB : req.body.RIB,
        // })

        // await newInfoSocialCollab.save()



        //Définition du formulaire par défaut
        let role = req.body.RoleId
        if (!role) {
            const UserRole = await RoleHierarchique.findOne({
                where: { RoleHierarchique: "User" }
            })

            if (UserRole) {
                role = UserRole.id;
            } else {
                console.error("Le rôle 'User' n'a pas été trouvé");
            }

        }


        const newCompte = await Compte.create({
            email: req.body.email,
            password: hashedPassword,
            collaborateur: savedCollab.id,
            RoleId: role
        })
        const savedCompte = await newCompte.save();

        res.status(201).json(savedCompte);


        //Envoie de mail quand l'utilisateur est crée
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: req.body.email,
            subject: 'Détails de votre compte',
            html: `<div>
                        <p>Votre compte a été crée avec succès.</p>
                        <p>Voici vos identifiant </p>
                        <p>Email : ${req.body.email}</p>
                        <p>Mot de passe : ${generatePassword}<p>            
                    </div>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\envoie de l\'email : ', error)
            }
            else {
                console.log('E-mail envoyé:', info.response)
            }
        });



    }
    catch (err) {
        console.error('Erreur lors de la création d\'un collaborateur: ', err);
        res.status(201).json({ message: 'Erreur lors de la création d\'un collaborateur' });
    }
})

//Afficher les listes de tous les collaborateurs
router.get('/all', async (req, res) => {
    try {
        const collaborateur = await Collab.findAll({
            include: [
                {
                    model: TestPoste,
                    as: 'poste1',
                }, {
                    model: TestPoste,
                    as: 'postes',
                }, {
                    model: TestDepartement,
                    as: 'departement1',
                }, {
                    model: TestDepartement,
                    as: 'departements',
                },
                {
                    model: Projet,
                    as: 'projet1'
                }, {
                    model: Projet,
                    as: 'projets'
                }, {
                    model: Equipe,
                    as: 'equipe1'
                }, {
                    model: Equipe,
                    as: 'equipe2'
                }
            ]
        })
        res.status(200).json(collaborateur)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})


//Afficher la listes des 10 derniers collaborateurs
router.get('/newcollab', async (req, res) => {
    try {
        const collaborateur = await Collab.findAll({
            order: [['dateEmbauche', 'DESC']],
            limit: 10,
            include: [
                {
                    model: TestPoste,
                    as: 'poste1',
                }, {
                    model: TestPoste,
                    as: 'postes',
                }, {
                    model: TestDepartement,
                    as: 'departement1',
                }, {
                    model: TestDepartement,
                    as: 'departements',
                }, {
                    model: Projet,
                    as: 'projet1'
                }, {
                    model: Projet,
                    as: 'projets'
                }, , {
                    model: Equipe,
                    as: 'equipe1'
                }, {
                    model: Equipe,
                    as: 'equipe2'
                }
            ]
        })
        res.status(200).json(collaborateur)
    }
    catch (error) {
        res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
    }
})



//Afficher seulement un collaborateur
router.get('/view/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const collaborateur = await Collab.findByPk(id, {
            include: [
                {
                    model: TestPoste,
                    as: 'poste1',
                }, {
                    model: TestPoste,
                    as: 'postes',
                }, {
                    model: TestDepartement,
                    as: 'departement1',
                }, {
                    model: TestDepartement,
                    as: 'departements',
                }, {
                    model: Projet,
                    as: 'projet1'
                }, {
                    model: Projet,
                    as: 'projets'
                }, {
                    model: Equipe,
                    as: 'equipe1'
                }, {
                    model: Equipe,
                    as: 'equipe2'
                }]
        });
        if (!collaborateur) {
            return res.status(404).json({ error: 'Collaborateur introuvable' });
        }
        res.json({ collaborateur });
    }
    catch (err) {
        console.error('Erreur lors de la récupération du collaborateur', err);
        res.status(500).json({ error: 'Erreur lors de la récupération du collaborateur' })
    }
})

//Mettre à jour un collaborateur existant 
router.put('/:id/edit', upload.single('image'), async (req, res) => {
    const image = req.file;

    const { id } = req.params;
    try {
        const updateCollab = await Collab.findByPk(id);
        const imageCollab = updateCollab.image
        if (!updateCollab) {
            return res.status(404).json({ error: 'Collaborateur introuvable' });
        }
        const updatedCollab = await updateCollab.update({
            nom: req.body.nom,
            prenom: req.body.prenom,
            dateNaissance: req.body.dateNaissance,
            lieuNaissance: req.body.lieuNaissance,
            lot: req.body.lot,
            quartier: req.body.quartier,
            ville: req.body.ville,
            adresse2: req.body.adresse2,
            tel: req.body.tel,
            tel2: req.body.tel2,
            telurgence: req.body.telurgence,
            CIN: req.body.CIN,
            dateDelivrance: req.body.dateDelivrance,
            lieuDelivrance: req.body.lieuDelivrance,
            statutmatrimoniale: req.body.statutmatrimoniale,
            nbEnfant: req.body.nbEnfant,
            site: req.body.site,
            entreprise: req.body.entreprise,
            numCNAPS: req.body.numCNAPS,
            shift: req.body.shift,
            image: image ? image.path : imageCollab,
            poste: req.body.poste,
            poste2: req.body.poste2,
            departement: req.body.departement,
            departement2: req.body.departement2,
            projet: req.body.projet,
            projet2: req.body.projets,
            equipe: req.body.equipe,
            equipe2: req.body.equipe2,
        })


        res.status(201).json(updatedCollab)
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour du collaborateur', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du collaborateur' });
    }
})

//Supprimer un collaborateur 
router.delete('/:id/delete', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCollaborateur = await Collab.findByPk(id);
        if (!deleteCollaborateur) {
            return res.status(404).json({ error: 'Collaborateur introuvable' });
        }
        await deleteCollaborateur.destroy();
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Erreur lors de la suppression du poste :', error)
        res.status(500).json({ message: 'Erreur lors de la suppression du poste' })
    }
})


//Importer les données 
router.post('/import-excel', uploads.single('excel'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Aucun fichier n\'a pu être téléchargé' })
    }

    const fileBuffer = req.file.buffer;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase()

    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        const workBook = new excel.Workbook();
        const workSheet = await workBook.xlsx.load(fileBuffer)

        const sheetName = req.body.sheetName;

        if (!sheetName) {
            return res.status(400).json({ message: 'Nom de feuille invalide ou introuvable' })
        }

        const sheet = workSheet.getWorksheet(sheetName);
        if (!sheet) {
            return res.status(400).json({ message: 'Nom de feuille introuvable' })
        }

        const firstRow = sheet.getRow(1);
        const headers = [];

        firstRow.eachCell((cell) => {
            headers.push(cell.value)
        })

        try {
            for (let i = 2; i <= sheet.rowCount; i++) {
                const row = sheet.getRow(i);
                const collab = {}

                let isEmpty = true;

                headers.forEach((header, index) => {
                    const cellValue = row.getCell(index + 1).value;
                    if (cellValue !== null && cellValue !== undefined && cellValue !== '') {
                        isEmpty = false
                    }
                    collab[header] = cellValue;
                })

                if (!isEmpty) {
                    //Parcours des lignes de données à partir de la deuxième ligne
                    const poste = await TestPoste.findOne({ where: { titrePoste: collab.poste } })
                    const poste2 = await TestPoste.findOne({ where: { titrePoste: collab.poste2 } })
                    const departement = await TestDepartement.findOne({ where: { nomDepartement: collab.departement } })
                    const departement2 = await TestDepartement.findOne({ where: { nomDepartement: collab.departement2 } })
                    const projet = await Projet.findOne({ where: { nomProjet: collab.projet } })
                    const projet2 = await Projet.findOne({ where: { nomProjet: collab.projet2 } })
                    const equipe = await Equipe.findOne({ where: { nomEquipe: collab.equipe } })
                    const equipe2 = await Equipe.findOne({ where: { nomEquipe: collab.equipe2 } })

                    const collaborateurExist = await Collab.findOne({ where: { matricule: collab.matricule } })
                    if (collaborateurExist === null) {
                        const newCollab = await Collab.create({
                            matricule: collab.matricule,
                            nom: collab.nom,
                            prenom: collab.prenom,
                            dateNaissance: collab.dateNaissance,
                            lieuNaissance: collab.lieuNaissance,
                            sexe: collab.sexe,
                            lot: collab.lot,
                            quartier: collab.quartier,
                            ville: collab.ville,
                            adresse2: collab.adresse2,
                            tel: collab.tel,
                            tel2: collab.tel2,
                            telurgence: collab.telurgence,
                            CIN: collab.CIN,
                            dateDelivrance: collab.dateDelivrance,
                            lieuDelivrance: collab.lieuDelivrance,
                            statutmatrimoniale: collab.statutmatrimoniale,
                            nbEnfant: collab.nbEnfant,
                            dateEmbauche: collab.dateEmbauche,
                            site: collab.site,
                            entreprise: collab.entreprise,
                            numCNAPS: collab.shift,
                            shift: collab.numCNAPS,
                            poste: poste ? poste.id : null,
                            poste2: poste2 ? poste2.id : null,
                            departement: departement ? departement.id : null,
                            departement2: departement2 ? departement2.id : null,
                            projet: projet ? projet.id : null,
                            projet2: projet2 ? projet2.id : null,
                            equipe: equipe ? equipe.id : null,
                            equipe2: equipe ? equipe2.id : null
                        })

                        const saved = await newCollab.save()
                        const saltRounds = await bcrypt.genSalt(10);
                        const generatePassword = generateRandomPassword();
                        const hashedPassword = await bcrypt.hash(generatePassword, saltRounds)

                        let role = req.body.RoleId
                        if (!role) {
                            const UserRole = await RoleHierarchique.findOne({
                                where: { RoleHierarchique: 'User' }
                            })

                            if (UserRole) {
                                role = UserRole.id;
                            } else {
                                console.error("Le rôle user n'a pas été trouvé")
                            }
                        }

                        let email = ''
                        if (typeof collab.email === 'string') {
                            email = collab.email
                        } else {
                            email = collab.email.text
                        }


                        await Compte.create({
                            email: email,
                            password: hashedPassword,
                            collaborateur: saved.id,
                            RoleId: role
                        })

                        // const mailOptions = {
                        //     from: process.env.MAIL_USER,
                        //     to: req.body.email,
                        //     subject: 'Détails de votre compte',
                        //     html: `<div>
                        //                 <p>Votre compte a été crée avec succès.</p>
                        //                 <p>Voici vos identifiant </p>
                        //                 <p>Email : ${email}</p>
                        //                 <p>Mot de passe : ${generatePassword}<p>            
                        //             </div>`
                        // }
                
                        // transporter.sendMail(mailOptions, (error, info) => {
                        //     if (error) {
                        //         console.error('Erreur lors de l\envoie de l\'email : ', error)
                        //     }
                        //     else {
                        //         console.log('E-mail envoyé:', info.response)
                        //     }
                        // });



                    }


                }
            }
            res.status(200).json({ message: 'Donnée des projets importées avec succès' })
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'importation  des données' })
        }
    }
    else {
        return res.status(400).json({ message: 'Format de fichier non pris en charge' })
    }

})


module.exports = router;