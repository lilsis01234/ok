const sequelize = require('../database/database');
const User = require('../Modele/User');
const Compte = require('../Modele/Compte');
const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste'); 
const Collaborateur = require ('../Modele/Collaborateur');
const CompteCollab = require('../Modele/CompteCollab');
const RoleCollab = require('../Modele/Role');



//Synchronisation de la base de donnée 
async function syncDatabase(){
    try{
        await sequelize.sync({force : true}); 
        console.log('La base de donnée est synchronisée avec succès')
    }  catch (error){
        console.error('Erreur lors de la synchronisation de la base de données :', error )
    } finally {
        sequelize.close();
    }
}

syncDatabase();