const PasswordResetRequest = require('../Modele/CompteModel/PasswordResetRequest');
const {Op} = require('sequelize');
const cron = require('node-cron');



//fonction pour supprimer les demandes de réinitialisation expirées
const deleteExpiredResetRequest = async () => {
    try {
        const now = new Date();
        await PasswordResetRequest.destroy({
            where : {
                expiresAt : {
                    [Op.lt]: now
                }
            }
        });
    }
    catch (error) {
        console.error('Erreur lors de la suppression des demandes de réinitialisation')
    }
}

//Planifier la tâche pour s'executer toutes les heures 
cron.schedule('0 * * * *', deleteExpiredResetRequest);
