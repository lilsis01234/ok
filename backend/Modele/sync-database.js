const sequelize = require('./database');
//const User = require('./user');


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