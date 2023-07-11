const {Sequelize} = require('sequelize');

//Initalisation de la base de donnée
const sequelize = new Sequelize('testintranet', 'root', '', {
    host : 'localhost', 
    dialect : 'mysql',
})




module.exports = sequelize;