const express = require('express');
//const mysql = require('mysql');
const {Sequelize} = require('sequelize');

const app = express();


/*
const connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root',
    password : '',
    database : 'testintranet',
})
*/

const sequelize = new Sequelize('testintranet', 'root', '', {
    host : 'localhost', 
    dialect : 'mysql',
})

sequelize.authenticate()
    .then(() => {
        console.log('Connecté à la base de données MySQL');
    })
    .catch((err) =>{
        console.error('Erreur à la connexion à la base de donnes:', err)
    })

/*
connection.connect((err) =>{
    if (err){
        console.log('Erreur de connexion à la base de donnée', err)
    }
    else {
        console.log('Connexion à la base de donnée réussie')
    }
})*/
