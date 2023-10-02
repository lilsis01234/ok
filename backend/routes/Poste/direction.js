const Collab = require('../../Modele/CollabModel/Collab');
const Direction = require('../../Modele/Structure/Direction');

const router = require('express').Router();

//Créer un direction
router.post('/new', async(req, res)  => {
    try {
        const newDirection = await Direction.create({
            nomDirection : req.body.nomDirection,
        })
        const savedDirection = await newDirection.save()
        res.status(201).json(savedDirection)
    }
    catch(error) {
        console.error('Erreur lors de la création de la direction:', error)
        res.status(500).json({message : 'Erreur lors de la créaton de la direction'})
    }
})

//Afficher les listes des directions
router.get('/all', async(reqq, res) => {
    try {
        const listDirection = await Direction.findAll();
        res.status(201).json(listDirection);
    }
    catch (error){
        console.error('Erreur lors de la généeation du liste des direction :', error)
        res.status(500).json({message : 'Erreur lors de la génération des liste des direction'})
    }
})

//Afficher seulement un directions
router.get('/view/:id', async(req, res)=> {
    const {id} = req.params;
    try {
        const direction = await Direction.findByPk(id);
        if (!direction) {
            return res.status(404).json({error : 'Direction non trouvé'})
        }
        res.json({direction})
    } catch (err){
        console.error('Erreur lors de la récupération des directions:', error)
        res.status(500).json({error: 'Erruer lors de la récupération de la directions'})
    }
})

//Mise à jour de la direction
router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const updateDirection = await Direction.findByPk(id)
        if(!updateDirection) {
            return res.status(404).json({error : 'Direction non trouvé'})
        }
        const newDirection = await updateDirection.update({
            nomDirection : req.body.nomDirection,
        })
        res.status(201).json(newDirection);
    }
    catch(error){
        res.status(401).json({message : 'Erreur lors de la mise à jour de la direction'})
        console.error('Erreur lors de la mise à jour du département', error);
    }
})

//Supprimer un direction
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params; 
    try {
        const deleteDirection = await Direction.findByPk(id);
        if(!deleteDirection){
            return res.status(404).json({error : 'Direction introuvable'})
        }
        await deleteDirection.destroy()
        res.sendStatus(204)
    }
    catch(error){
        console.error('Erreur lors de la suppréssion du direction:', error)
        res.status(500).json({error : 'Erreur lors de la suppression du direction'})
    }
})

module.exports = router;