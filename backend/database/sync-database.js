const sequelize = require('../database/database');
const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste'); 
const Collaborateur = require ('../Modele/Collaborateur');
const CompteCollab = require('../Modele/CompteCollab');
const RoleCollab = require('../Modele/Role');
const PasswordResetRequest = require('../Modele/PasswordResetRequest');
const ArchiveCollab = require('../Modele/ArchiveCollab');



//Synchronisation de la base de donnée 
async function syncDatabase(){
    try{
        await sequelize.sync({force : false}); 
        console.log('La base de donnée est synchronisée avec succès')
    }  catch (error){
        console.error('Erreur lors de la synchronisation de la base de données :', error )
    } finally {
        sequelize.close();
    }
}

syncDatabase();