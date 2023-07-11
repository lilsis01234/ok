const sequelize = require('../database/database');
const User = require('../Modele/User');
const Compte = require('../Modele/Compte');


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