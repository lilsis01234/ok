const { Router } = require('express');
const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste');

const router = require('express').Router();

//Ajout d'un nouveau poste
router.post('/add', async(req, res) => {
    try {
        const newPoste = await Poste.create({
            titrePoste : req.body.titrePoste,
            departement : req.body.departement,
        })
        const savedPoste = await newPoste.save();
        res.status(201).json(savedPoste);
    }
    catch (error){
        console.error('Erreur lors de la création d\'un départemtent: ', error);
        res.status(201).json({message : 'Erreur lors de la création de l\'utilisateur'});
    }
})


//Afficher la liste des postes 
router.get('/all_postes', async(req, res) => {
    Poste.findAll({
        include : {model : Departement, attributes : ['nomDepartement']}
    })
    .then((postes) => {
        res.status(200).json(
            postes.map((poste) => {
                return {
                    id : poste.id,
                    titrePoste : poste.titrePoste,
                    nomDepartement : poste.Departement.nomDepartement
                }
            })
        )
    })
    .catch((err) => {
        res.send(err);
    })
    



    // try {
    //     const listesPostes = await Poste.findAll({
    //         include: {model : Departement, attributes : ['nomDepartement']}
    //     });
    //     res.status(201).json();
    // }
    // catch (error){
    //     console.error('Erreur lors de la génération du liste des postes'),
    //     res.status(500).json({message : 'Erreur lors de la génération du listes des départements'});
    // }
})

//Afficher seuleument un poste
router.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const poste = await Poste.findByPk(id);
        if (!poste) {
            return res.status(404).json({error : 'Poste introuvable'});
        }
        res.json({poste});
    } catch (err) {
        console.error('Erreur lors de la récupération du poste', err);
        res.status(500).json({error : 'Erreur lors de la récupération du poste'});
    }
})

//Supprimer un poste
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deletePoste = await Poste.findByPk(id);
        if (!deletePoste) {
            return res.status(404).json({error : 'Poste introuvable'});
        }
        await deletePoste.destroy();
        res.sendStatus(204);
    }
    catch (error){
        console.error('Erreur lors de la suppréssion du poste :', error)
        res.status(500).json({message : 'Erreur lors de la suppression du poste'})
    }
})

//Mettre à jour un poste existant 
router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const updatePoste = await Poste.findByPk(id);
        if (!updatePoste) {
            return res.status(404).json({error : 'Poste introuvable'});
        }
        const updatedPoste = await updatePoste.update({
            titrePoste : req.body.titrePoste,
            departement : req.body.departement,
            })
        // const savedPoste = await updatedPoste.save()
        res.status(201).json(updatedPoste);
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour du poste', error);
        res.status(500).json({error : 'Erreur lors de la mise à jour de l\'utilisateur'});
    }
})

module.exports = router;
