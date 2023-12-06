const Projet = require('../../Modele/Structure/Projet');
const TestDepartement = require('../../Modele/Structure/TestDepartement');

const router = require('express').Router()

//Pour le route import
const xlsx = require('xlsx')
const multer = require('multer');
const Collab = require('../../Modele/CollabModel/Collab');
const Compte = require('../../Modele/CompteModel/Compte');
const TestPoste = require('../../Modele/Structure/TestPoste');
const { Op } = require('sequelize');
const Equipe = require('../../Modele/Structure/Equipe');

//Conserver l'image dans le mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

//Ajouter une nouvelle Projet
router.post('/new', async (req, res) => {
    try {
        const newProjet = await Projet.create({
            nomProjet: req.body.nomProjet,
            departement: req.body.departement,
        });
        const savedProjet = await newProjet.save()
        res.status(201).json(savedProjet)
    }
    catch (error) {
        console.error('Erreur lors de la création du projet:', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'équipe' })
    }
})

//Afficher toutes les Projets
router.get('/all', async (req, res) => {
    try {
        const projet = await Projet.findAll({
            include: [
                { model: TestDepartement }
            ]
        });
        res.status(201).json(projet)
    }
    catch (error) {
        console.error('Erreur lors de la génération du liste des projets: ', error)
        res.status(500).json({ message: 'Erreur lors de la génération des listes des projet ' })
    }
})

//Afficher seulement un Projet
router.get('/view/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const projet = await Projet.findByPk(id, {
            include: [
                { model: TestDepartement }
            ]
        })

        if (!projet) {
            return res.status(404).json({ error: 'Projet introuvable' })
        }
        res.json({ projet })
    }
    catch (err) {
        console.error('Erreur lors de la récupération du projet:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du projet' })
    }
})

//Mettre à jour un projet
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updateProjet = await Projet.findByPk(id)
        if (!updateProjet) {
            return res.status(400).json({ error: 'Projet non trouvé' })
        }
        const updatedProjet = await updateProjet.update({
            nomProjet: req.body.nomProjet,
            departement: req.body.departement
        })
        res.status(201).json(updatedProjet)
    }
    catch (error) {
        res.status(401).json({ message: 'Erreur lors de la mise à jour du projet' })
        console.error('Erreur lors de la mise à jours du projet ', error);
    }
})

//Supprimer un projet
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProjet = await Projet.findByPk(id);
        if (!deleteProjet) {
            return res.status(404).json({ error: 'Projet introuvable' });
        }
        await deleteProjet.destroy();
        res.sendStatus(204)
    }
    catch (error) {
        console.error('Erreur lors de la suppréssion du projet :', error)
        res.status(500).json({ error: 'Erreur lors de la suppréssion du projet' })
    }
})

//Importer les projet
router.post('/import-excel', upload.single('excel'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Aucun fichier n\'a pu être téléchargée' })
    }

    const fileBuffer = req.file.buffer;
    const sheetName = req.body.sheetName;

    const fileExtension = req.file.originalname.split('.').pop().toLowerCase()

    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' })
        if (!sheetName || !workbook.Sheets[sheetName]) {
            return res.status(400).json({ message: 'Nom de feuille invalide ou introuvable' })
        }
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
            header: 1
        })
        try {
            for (let i = 1; i < data.length; i++) {
                const record = data[i]
                const departement = await TestDepartement.findOne({ where: { nomDepartement: record[1] } })
                const projetExiste = await Projet.findOne({ where: { nomProjet: record[0] } })

                if (projetExiste === null) {
                    await Projet.create({
                        nomProjet: record[0],
                        departement: departement.id
                    })
                }

            }
            res.status(200).json({ message: 'Donnée des projets importées avec succès' })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'importation  des données' })
        }

    }
    else {
        return res.status(400).json({ message: 'Format de fichier non pris en charge' })
    }


})


router.get('/:id/allCollab', async (req, res) => {
    try {
        const { id } = req.params;
        const collab = await Collab.findAll({
            where: {
                [Op.or]: [
                    { projet: id },
                    { projet2: id }
                ]
            },
            attributes: ['id']
        })


        let collaborateurs = [];
        for (const n of collab) {
            let collaborateurId = n.id;
            if (collaborateurId) {
                const collaborateur = await Compte.findAll({
                    where: { collaborateur: collaborateurId },
                    attributes: ['id', 'email'],
                    include: [{
                        model: Collab,
                        attributes: ['id', 'nom', 'prenom', 'matricule', 'image'],
                        include: [
                            {
                                model: TestPoste,
                                as: 'poste1',
                                attributes: ['titrePoste']
                            }
                        ]
                    }]
                })

                collaborateurs = collaborateurs.concat(collaborateur);
            }


        }

        res.status(200).json(collaborateurs)
    } catch (error) {
        console.error('Erreur lors de la récupération des collaborateurs du projets', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des collaborateurs du projets' });
    }
})

//Récupérer les équipes associés à un projet
router.get('/:id/allTeams', async (req, res) => {
    try {
        const { id } = req.params;
        const equipes = await Equipe.findAll({
            where: { projet: id },
            attributes: ['id', 'nomEquipe', 'projet'],
            include: [
                {
                    model: Projet,
                    attributes: ['nomProjet']
                }
            ]
        });

        let equipewithMember = [];

        for (const equipe of equipes) {
            const equipeId = equipe.id;

            const membres = await Collab.findAll({
                where: {
                    [Op.or]: [
                        { equipe: equipeId },
                        { equipe2: equipeId }
                    ]
                },
                limit: 4,
                attributes: ['id', 'nom', 'image']
            });

            equipewithMember.push({
                equipe: equipe,
                membres: membres,
            });
        }

        res.status(200).json(equipewithMember);

    } catch (error) {
        console.error('Erreur lors de la récupération des équipes associées au département', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des équipes associées au département' });
    }
});



module.exports = router;