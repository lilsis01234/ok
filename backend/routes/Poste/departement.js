const router = require('express').Router();
const TestDepartement = require('../../Modele/Structure/TestDepartement');
const Collab = require('../../Modele/CollabModel/Collab');
const TestPoste = require('../../Modele/Structure/TestPoste');
const { Op } = require('sequelize');
const Direction = require('../../Modele/Structure/Direction');


//Afficher les listes des départements
router.get('/all', async(req, res) => {
    try {
        const listDepartement = await TestDepartement.findAll(
            {
                include : [
                    {model: Direction}
                ]
            }
        );
        res.status(201).json(listDepartement);
    }
    catch (error){
        console.error('Erreur lors de la génération du liste des département :', error);
        res.status(500).json({message : 'Erreur lors de génération du liste de l\'utilisateur'});
    }
})

//Récupérer les membres de chaque departement
router.get('/collab/:departementId', async(req, res) => {
    try {
        const departementId = req.params.departementId;

        const collab = await Collab.findAll({
            where : {
                [Op.or] : [
                    {departement : departementId},
                    {departement2 : departemetnId}
                ]
            },
            include :[
                {
                    model : TestPoste,
                    as : 'poste1',
                },{
                    model : TestPoste,
                    as : 'postes',
                }, {
                    model : TestDepartement,
                    as : 'departement1',
                }, {
                    model : TestDepartement,
                    as : 'departements',
                }
            ]

        })

        res.status(200).json(collab)
    }
    catch (error){
        console.error(error);
        res.status(500).json({message : "Une erreur s'est produit lors de la récupération des données"})
    }
})


//Ajouter un nouveau département (nouveau)
router.post('/new', async(req, res) => {
    try {
      const newDepartement = await TestDepartement.create({
          nomDepartement : req.body.nomDepartement,
          direction : req.body.direction,
      });
      const savedDepartement = await newDepartement.save()
      res.status(201).json(savedDepartement);
    }
    catch (error){
        console.error('Erreur lors de la création d\'un département :', error);
        res.status(500).json({message :  'Erreur lors de la création de l\'utilisateur'});
    }
})

//Afficher seuleument un département
router.get('/view/:id', async(req, res) =>{
    const {id} = req.params;
    try {
        const departement = await TestDepartement.findByPk(id, 
            {include : [
                {model: Direction}
            ]}
            );

        if (!departement ) {
            return res.status(404).json({error : 'Departement introuvable'});
        }
        res.json({departement});
    } catch (err) {
        console.error('Erreur lors de la récupération du département:', error);
        res.status(500).json({error : 'Erreur lors de la récupération du département'});
    }
})


//Mettre à jour les enregistrements existant 
router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const updateDepartement = await TestDepartement.findByPk(id)
        if (!updateDepartement){
            return res.status(400).json({error : 'Département non trouvé'})
        }
        const newDepartement = await updateDepartement.update({
            nomDepartement : req.body.nomDepartement, 
            direction : req.body.direction,
            })
        res.status(201).json(newDepartement); 
    } 
    catch(error) {
        res.status(401).json({message : 'Erreur lors de la mise à jour du département'});
        console.error('Erreur lors de la mise à jour du département', error);
        
    }


})

//Supprimer un département
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const deleteDepartement = await TestDepartement.findByPk(id);
        if (!deleteDepartement){
            return res.status(404).json({error : 'Departement introuvable'});
        }
        await deleteDepartement.destroy();
        res.sendStatus(204);
    } 
    catch (error){
        console.error('Erreur lors de la suppression du département: ', error)
        res.status(500).json({error : 'Erreur lors de la suppression du département'})
    }
})

module.exports = router;