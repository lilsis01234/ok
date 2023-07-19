const express = require('express');
//const mysql = require('mysql');
const sequelize = require('./database/database');
const User = require('./Modele/User')
const cors = require('cors');

const app = express();
const departementRouter = require('./routes/departement');
const posteRouter = require('./routes/postes');
const collabRouter = require('./routes/collaborateur');
const compte_collab = require('./routes/compteCollab');
const login = require('./routes/auth');
const role = require('./routes/role');
const api_config = require('./config/api_config');


//importation des configurations$
const dotenv = require('dotenv');
const auth_config = require('./config/auth_config');

dotenv.config();
auth_config();

/*
const connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root',
    password : '',
    database : 'testintranet',
})
*/
app.use(cors());
//Ajout de middleware express.json()
app.use(express.json())


//utilisation des routes middleware
app.use('/api', api_config) //route pour la configuration 

app.use('/api/departement', departementRouter); //route pour le département
app.use('/api/poste', posteRouter ); // route pour le router
app.use('/api/collaborateur', collabRouter); //route pour les collaborateurs
app.use('/api/compte_collaborateur', compte_collab) ; //route pour les comptes collaborateurs
app.use('/api/auth', login); //route pour l'authentification
app.use('/api/role', role); //route pour les rôles


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