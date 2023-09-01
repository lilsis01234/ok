const {Sequelize} = require('sequelize');

//Initalisation de la base de donnée
const sequelize = new Sequelize('intranet', 'root', '' ,{ 
  host : 'localhost', 
  dialect :'mysql'
})




module.exports = sequelize;