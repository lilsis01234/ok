const { Router, application } = require('express');

const { TestPoste, TestDepartement, PosteDepartement } = require('../../Modele/Structure/association.js');


const router = require('express').Router();

//Pour le route import
const xlsx = require('xlsx')
const multer = require('multer');
const { Op } = require('sequelize')

//Conserver l'image dans le mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })



//Afficher toutes les postes et les départements qui lui est associé
router.get('/all', async (req, res) => {
    try {
        const postes = await TestPoste.findAll({
            include: [
                {
                    model: TestDepartement,
                    as: 'departement',
                }]
        })
        res.status(200).json(postes);
    } catch (error) {
        console.error('Erreur lors de la récupération des postes', error)
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des postes" })
    }
})





//Créer une nouvelle poste et une instance de la table association
router.post('/new', async (req, res) => {
    try {
        const { titrePoste, departement, direction } = req.body;

        //Creation du poste
        const newPoste = await TestPoste.create({
            titrePoste
        })

        if (departement && departement.length > 0) {
            for (const departementId of departement) {
                // console.log(departementId)
                const departementInstance = await TestDepartement.findByPk(departementId)
                if (!departementInstance) {
                    console.log('PosteDepartement non sauvegardé', departementId)
                }
                const postedepartement = await PosteDepartement.create({
                    poste: newPoste.id,
                    departement: departementId
                })
            }

        }
        return res.status(201).json({ message: 'Poste crée avec succès' })
    }
    catch (error) {
        console.error('Erreur lors de la création du poste :', error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors du poste' });
    }
})


//Importer les postes
router.post('/import-excel', upload.single('excel'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé' })
    }
    const fileBuffer = req.file.buffer;
    const sheetName = req.body.sheetName;

    //Récupération de l'extension du fichier
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase()

    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' })

        if (!sheetName || !workbook.Sheets[sheetName]) {
            return res.status(400).json({ message: 'Nom de la feuille invalide ou introuvable' })
        }

        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
            header: 1
        })

        try {
            for (let i = 1; i < data.length; i++) {
                const record = data[i];

                const posteExiste = await TestPoste.findOne({ where: { titrePoste: record[0] } })
                const departement = await TestDepartement.findOne({ where: { nomDepartement: record[1] } })

                if (posteExiste !== null) {
                    const posteDepartement = await PosteDepartement.findOne({ where: { [Op.and]: [{ poste: posteExiste.id }, { departement: departement.id }] } })
                    if (posteDepartement === null) {
                        await PosteDepartement.create({
                            poste: posteExiste.id,
                            departement: departement.id
                        })
                    }

                } else {
                    const newPoste = await TestPoste.create({
                        titrePoste: record[0]
                    })

                    await PosteDepartement.create({
                        poste: newPoste.id,
                        departement: departement.id
                    })
                }
            }

            res.status(500).json({message : 'Importaton des données fait avec succès'})
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de l\'importation des données' })
        }
    } else {
        return res.status(400).json({ message: 'Formati de fichier non pris en charge' })
    }


})

//Afficher un poste et les departements qui lui sont associés
router.get('/view/:id', async (req, res) => {
    try {
        const poste = await TestPoste.findByPk(req.params.id, {
            include: [{
                model: TestDepartement,
                as: 'departement'
            }]
        });
        res.json(poste)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du postes' })
    }
})


//Modifier un poste et les départements qui lui sont associés
router.put('/:id/edit', async (req, res) => {
    try {
        const posteId = req.params.id;
        const { titrePoste, departement, direction } = req.body;


        //Vérifier d'abord si le poste existe
        const poste = await TestPoste.findByPk(posteId);

        if (!poste) {
            return res.status(404).json({ message: "Le poste n'existe pas" })
        }

        poste.titrePoste = titrePoste;
        await poste.save();



        //Récupérer les associtions actuelles du poste
        const association = await PosteDepartement.findAll({
            where: {
                poste: poste.id
            }
        })

        //Récupérer les id des departements associés 
        const departementActuelle = association.map((assoc) => assoc.departement)

        //Identifier les departement à ajouter
        const departementAajouter = departement.filter((departementId) => !departementActuelle.includes(departementId))


        //Identifier les departements avec les associations 
        const departementSupprimer = departementActuelle.filter((departementId) => !departement.includes(departementId))



        //Supprimer les associations avec les départements
        await PosteDepartement.destroy({
            where: {
                poste: poste.id,
                departement: departementSupprimer
            }
        })


        //Ajouter nouvelle associations
        for (const departementId of departementAajouter) {
            const departements = await TestDepartement.findByPk(departementId)

            if (!departements) {
                return res.status(404).json({ message: `Le département avec l'ID ${departementId} est introuvable` })
            }

            await PosteDepartement.create({
                poste: poste.id,
                departement: departements.id
            })

        }

        return res.status(200).json({ message: 'Poste mise à jour avec succès' })
    }
    catch (err) {
        console.error('Erreur lors de la mise à jour du poste', err)
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du poste' })
    }
})

//Pour supprimer les postes et ses associations
router.delete('/:id/delete', async (req, res) => {
    try {
        const posteId = req.params.id;
        const poste = await TestPoste.findByPk(posteId)

        if (!poste) {
            return res.status(404).json({ message: "Le poste n'existe pas" });
        }

        await PosteDepartement.destroy({
            where: {
                poste: poste.id
            }
        })

        await TestPoste.destroy({
            where: {
                id: poste.id,
            }
        })

        return res.status(200).json({ message: 'Poste supprimé avec succès' })

    }
    catch (error) {
        console.error('Erreur lors de la suppressiuon du poste:', error);
        return res.status(500).json({ message: 'Erreur lors de la suppression du poste' })
    }
})




module.exports = router;
