const sequelize = require('../database/database');
const Collab = require('../Modele/CollabModel/Collab')
const Compte = require('../Modele/CompteModel/Compte')
const ArchiveCollaborateur = require('../Modele/CollabModel/ArchiveCollab')
const RoleCollab = require('../Modele/RoleModel/Role');
const PasswordResetRequest = require('../Modele/CompteModel/PasswordResetRequest');
const TestPoste = require('../Modele/posteModel/TestPoste')
const TestDepartement = require('../Modele/posteModel/TestDepartement')
const PosteDepartement = require('../Modele/posteModel/PosteDepartement')
const association = require('../Modele/posteModel/association')




//Synchronisation de la base de donnée 
async function syncDatabase(){
    try{
        await sequelize.sync({force : false}); 
        const { TestPoste, TestDepartement, PosteDepartement } = association;
        TestPoste.belongsToMany(TestDepartement, { through: PosteDepartement });
        TestDepartement.belongsToMany(TestPoste, { through: PosteDepartement });
        console.log('La base de donnée est synchronisée avec succès')
    }  catch (error){
        console.error('Erreur lors de la synchronisation de la base de données :', error )
    } finally {
        sequelize.close();
    }
}

syncDatabase();