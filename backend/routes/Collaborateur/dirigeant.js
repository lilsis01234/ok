const { Op } = require('sequelize');
const TestPoste = require('../../Modele/Structure/TestPoste');
const TestDepartement = require('../../Modele/Structure/TestDepartement')
const Direction = require('../../Modele/Structure/Direction')
const Collab = require('../../Modele/CollabModel/Collab')

const router = require('express').Router()

router.get('/all', async (req, res) => {
    try {
        const nomDepartement = 'Direction';
        const departements = await TestDepartement.findAll({
            where: { nomDepartement: { [Op.like]: `%${nomDepartement}%` } }
        });

        if (departements.length === 0) {
            return res.status(201).json({ message: 'Aucun département Direction enregistré dans la base de données' });
        }

        let membresDirection = [];

        for (const departement of departements) {
            let departementId;
            if (departement) {
                departementId = departement.id;

                // Recherche des dirigeants dans la base de données
                const membres = await Collab.findAll({
                    where: {
                        [Op.or]: [
                            { departement: departementId },
                            // {departement2 : departementId},
                        ]
                    },
                    include: [
                        {
                            model: TestPoste,
                            as: 'poste1',
                            attributes: ['titrePoste']
                        },
                        {
                            model: TestDepartement,
                            as: 'departement1',
                            attributes: ['nomDepartement'],
                            include: [
                                {
                                    model: Direction,
                                    attributes: ['nomDirection'],
                                }
                            ]
                        }
                    ],
                    attributes: ['nom', 'prenom', 'matricule', 'image']
                });

                membresDirection = membresDirection.concat(membres);
            }
        }

        if (membresDirection.length > 0) {
            res.status(200).json(membresDirection);
        } else {
            res.status(201).json({ message: 'Aucun membre de la direction enregistré dans la base de données' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des membres de la direction', error);
        res.status(201).json({ message: 'Erreur lors de la récupération des membres de la direction' });
    }
});




module.exports = router;