const router = require('express').Router();
<<<<<<< HEAD
const TestDepartement = require('../../Modele/Structure/TestDepartement');
const Collab = require('../../Modele/CollabModel/Collab');
const TestPoste = require('../../Modele/Structure/TestPoste');
const { Op } = require('sequelize');
const Direction = require('../../Modele/Structure/Direction');
=======
const TestDepartement = require('../../Modele/posteModel/TestDepartement');
const Collab = require('../../Modele/CollabModel/Collab');
const TestPoste = require('../../Modele/posteModel/TestPoste');
const { Op } = require('sequelize');
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9


//Afficher les listes des départements
router.get('/all', async(req, res) => {
    try {
<<<<<<< HEAD
        const listDepartement = await TestDepartement.findAll(
            {
                include : [
                    {model: Direction}
                ]
            }
        );
=======
        const listDepartement = await TestDepartement.findAll();
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
        res.status(201).json(listDepartement);
    }
    catch (error){
        console.error('Erreur lors de la génération du liste des département :', error);
        res.status(500).json({message : 'Erreur lors de génération du liste de l\'utilisateur'});
    }
})

<<<<<<< HEAD
=======

//Récupérer tous les membres du departement direction
router.get('/collab/direction', async(req, res) => {
    try {
        const direction = await TestDepartement.findOne({
            where : {nomDepartement : "Direction"}
        })

        if(!direction){
            return res.status(404).json({message : 'Aucun département direction trouvé'})
        }

        const directionMember = await Collab.findAll({
            where : {departement : direction.id},
            include : [
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
        res.json(directionMember)

    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erreur lors de la récupération des employés'})
    }
})





>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
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
<<<<<<< HEAD
          direction : req.body.direction,
=======
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
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
<<<<<<< HEAD
        const departement = await TestDepartement.findByPk(id, 
            {include : [
                {model: Direction}
            ]}
            );

=======
        const departement = await TestDepartement.findByPk(id);
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
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
<<<<<<< HEAD
            nomDepartement : req.body.nomDepartement, 
            direction : req.body.direction,
=======
            nomDepartement : req.body.nomDepartement
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
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