const express = require('express');
//const mysql = require('mysql');
const sequelize = require('./database/database');
const User = require('./Modele/User')

const app = express();


/*
const connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root',
    password : '',
    database : 'testintranet',
})
*/

//Ajout de middleware express.json()
app.use(express.json())

//Connection à la base de donnée MySQL
sequelize.authenticate()
    .then(() => {
        console.log('Connecté à la base de données MySQL');
    })
    .catch((err) =>{
        console.error('Erreur à la connexion à la base de donnes:', err)
    })


    
app.post('/users', async(req, res) => {
    try{
        //const {firstName, lastName} = req.body;
        const user = await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName
        });
        const savedUser = await user.save()
        res.status(201).json(savedUser);
    }
    catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur : ', error);
        res.status(500).json({message : 'Erreur lors de la création de l\'utilisateur  '})
    }
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


//Initialisation du serveur
app.listen(3000, () => {
    console.log('Serveur Express en écoute sur le port 3000')
});