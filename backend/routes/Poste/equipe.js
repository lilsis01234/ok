const Equipe = require('../../Modele/Structure/Equipe');
const TestDepartement = require('../../Modele/Structure/TestDepartement');

const router = require('express').Router()

//Ajouter une nouvelle Equipe
router.post('/new', async(req, res) => {
    try {
        const newEquipe = await Equipe.create({
            nomEquipe : req.body.nomEquipe,
            departement : req.body.departement,
        });
        const savedEquipe = await newEquipe.save()
        res.status(201).json(savedEquipe)
    }
    catch (error){
        console.error('Erreur lors de la création de l\'equipe:', error);
        res.status(500).json({messafe : 'Erreur lors de la création de l\'équipe'})
    }
})

//Afficher toutes les Equipes
router.get('/all', async(req, res) => {
    try {
        const equipe = await Equipe.findAll({
            include : [
                {model : TestDepartement}
            ]
        });
        res.status(201).json(equipe)
    }
    catch (error) {
        console.error('Erreur lors de la généeation du liste des équipes: ', error)
        res.status(500).json({message : 'Erreur lors de la génération des listes des équipes '})
    }
})

//Afficher seulement un Equipe
router.get('/view/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const equipe = await Equipe.findByPk(id, {
            include : [
                {model : TestDepartement}
            ]
        })

        if (!equipe) {
            return res.status(404).json({error: 'Equipe introuvable'})
        }
        res.json({equipe})
    }
    catch (err){
        console.error('Erreur lors de la récupération de l\'equipe:', error);
        res.status(500).json({error : 'Erreur lors de la récupération de l\'équipe'})
    }
})

//Mettre à jour un équipe
router.put('/edit/:id', async(req,res) => {
    const {id} = req.params;
    try {
        const updateEquipe = await Equipe.findByPk(id)
        if(!updateEquipe){
            return res.status(400).json({error : 'Equipe non trouvé'})
        }
        const updatedEquipe = await updateEquipe.update({
            nomEquipe : req.body.nomEquipe,
            departement : req.body.departement
        })
        res.status(201).json(updatedEquipe)
    }
    catch(error){
        res.status(401).json({message : 'Erreur lors de la mise à jour de l\'équipe'})
        console.error('Erreur lors de la mise à jours de l\'equipe ', error);
    }
})

//Supprimer un équipe
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deleteEquipe = await Equipe.findByPk(id);
        if(!deleteEquipe){
            return res.status(404).json({error : 'Equipe introuvable'});
        }
        await deleteEquipe.destroy();
        res.sendStatus(204)
    }
    catch (error){
        console.error('Erreur lors de la suppréssion de l\'équipe :', error)
        res.status(500).json({error : 'Erreur lors de la suppréssion de l\'équipe'})
    }
})


module.exports = router;