const Site = require('../../Modele/Structure/Site');

const router = require('express').Router();

//Création d'un site 
router.post('/new', async(req, res)  => {
    try {
        const newSite = await Site.create({
            nomSite : req.body.nomSite,
        })
        const savedSite = await newSite.save()
        res.status(201).json(savedSite)
    }
    catch(error) {
        console.error('Erreur lors de la création du site:', error)
        res.status(500).json({message : 'Erreur lors de la créaton du site'})
    }
})

//Afficher le liste des sites
router.get('/all', async(req, res) => {
    try {
        const listSite = await Site.findAll();
        res.status(201).json(listSite);
    }
    catch (error){
        console.error('Erreur lors de la génération du liste des sites :', error)
        res.status(500).json({message : 'Erreur lors de la génération des liste des sites'})
    }
})

//Afficher seulement un site
router.get('/view/:id', async(req, res)=> {
    const {id} = req.params;
    try {
        const site = await Site.findByPk(id);
        if (!site) {
            return res.status(404).json({error : 'Site non trouvé'})
        }
        res.json({site})
    } catch (err){
        console.error('Erreur lors de la récupération du site:', err)
        res.status(500).json({error: 'Erreur lors de la récupération du site:'})
    }
})

//Mise à jour du site
router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const updateSite = await Site.findByPk(id)
        if(!updateSite) {
            return res.status(404).json({error : 'Site non trouvé'})
        }
        const newSite = await updateSite.update({
            nomSite : req.body.nomSite,
        })
        res.status(201).json(newSite);
    }
    catch(error){
        res.status(401).json({message : 'Erreur lors de la mise à jour du site'})
        console.error('Erreur lors de la mise à jour du site', error);
    }
})

//Supprimer un site
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params; 
    try {
        const deleteSite = await Site.findByPk(id);
        if(!deleteSite){
            return res.status(404).json({error : 'Site introuvable'})
        }
        await deleteSite.destroy()
        res.sendStatus(204)
    }
    catch(error){
        console.error('Erreur lors de la suppréssion du site:', error)
        res.status(500).json({error : 'Erreur lors de la suppression du site'})
    }
})





module.exports = router;