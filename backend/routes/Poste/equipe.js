const router = require('express').Router()
const Equipe = require('../../Modele/Structure/Equipe')
const Projet = require('../../Modele/Structure/Projet')

//Pour le route import
const xlsx = require('xlsx')
const multer = require('multer');

//Conserver l'image dans le mémoire
const storage = multer.memoryStorage();
const upload = multer({storage : storage})


//Ajout d'une nouvelle Equipe
router.post('/new', async(req, res) => {
    try {
        const newEquipe = await Equipe.create({
            nomEquipe : req.body.nomEquipe,
            projet : req.body.projet
        })
        const savedEquipe = await newEquipe.save()
        res.status(201).json(savedEquipe)
    }
    catch (error){
        console.error('Erreur lors de la création de l\'equipe:', error);
        res.status(500).json({message : 'Erreur lors de la création de l\'equipe'})
    }
})

//Afficher toutes les equipe
router.get('/all', async(req, res) => {
    try {
        const equipe = await Equipe.findAll({
            include : [
                {
                    model : Projet,
                }
            ]
        })
        res.status(201).json(equipe)
    }
    catch (error){
        console.error('Erreur lors de la génération du liste des équipes')
        res.status(500).json({message : 'Erreur lors de la génération des listes des équipes '})
    }
})

//Afficher seulement un equipe 
router.get('/view/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const equipe = await Equipe.findByPk(id, {
            include : [
                {model : Projet}
            ]
        })

        if (!equipe) {
            return res.status(404).json({error : 'Equipe introuvable'})
        }
    }
    catch (error){
        console.error('Erreur lors de la récupération de l\'equipe')
        res.status(500).json({error : 'Erreur lors de la récupération de l\'équipe'})
    }
})

//Mettre à jour un equipe
router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const updatePoste = await Equipe.findByPk(id);
        if(!updatePoste){
            return res.status(400).json({error : 'Projet non trouvé'})
        }
        const updatedPoste = await updatePoste.update({
            nomEquipe : req.body.nomEquipe,
            projet : req.body.projet
        })
        res.status(201).json(updatedPoste)
    }
    catch(error){
        res.status(401).json({message : 'Erreur lors de la mise à jour des equipes'})
        console.error('Erreur lors de la mise à jour du projet', error)
    }
})

//Supprimer un équipe
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deleteEquipe = await Equipe.findByPk(id);
        if (!deleteEquipe){
            return res.status(404).json({error: 'Equipe introuvable'})
        }
        await deleteEquipe.destroy();
        res.sendStatus(204)
    }
    catch (error){
        console.error('Erreur lors de la suppréssion de l\'équipe :', error)
        res.status(500).json({error : 'Erreur lors de la suppréssion de l\'équipe' })
    }
})

//Importer un équipe
router.post('/import-excel', upload.single('excel'), async(req, res) => {
    if (!req.file){
        return res.status(400).json({message : 'Aucun fichier n\'a pas pu être téléchargés'})
    }

    const fileBuffer = req.file.buffer;
    const sheetName = req.body.sheetName;

    const fileExtension = req.file.originalname.split('.').pop().toLowerCase()
    if(fileExtension === 'xlsx' || fileExtension === 'xls'){
        const workbook = xlsx.read(fileBuffer, {type : 'buffer'})
        if(!sheetName || !workbook.Sheets[sheetName]){
            return res.status(400).json({message : 'Nom de feuille invalide ou introuvable'})
        }
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
            header : 1
        })
        try{
            for(let i = 1; i < data.length; i++){
                const record = data[i]
                const projet = await Projet.findOne({where : {nomEquipe : record[1]}})
                const equipeExiste = await Equipe.findOne({where : {nomEquipe : [record[0]]}})
                
                if(equipeExiste === null ){
                    await Equipe.create({
                        nomEquipe : record[0],
                        projet : projet,
                    })
                }
            
            } 
            res.status(200).json({message : 'Donnée des projets importées avec succès'})
        }
        catch{
            console.error(error);
            res.status(500).json({message : 'Erreur lors de l\'importation  des données'})
        }
    }

})

module.exports = router;
