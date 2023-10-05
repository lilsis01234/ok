const express = require('express');
//const mysql = require('mysql');
const sequelize = require('./database/database');
const cors = require('cors');
const path = require('path');

const app = express();
const departementRouter = require('./routes/Poste/departement');
const posteRouter = require('./routes/Poste/postes');
const collabRouter = require('./routes/Collaborateur/collaborateur');
const compte_collab = require('./routes/Compte/compteCollab');
const login = require('./routes/Compte/auth');
const role = require('./routes/Role/role');
const api_config = require('./config/api_config');
const password = require('./routes/Compte/motdepasseOublie');
const archive = require('./routes/Collaborateur/archiveCollab')
const userProfile = require('./routes/Compte/userProfile');
const direction = require('./routes/Poste/direction')
const equipe = require('./routes/Poste/equipe')
const agendaRoutes = require('../backend/routes/formation/AjoutAgenda')
const displayRoutes = require('../backend/routes/formation/AfficheAgenda')
const formationRouter = require('../backend/routes/formation/formation')
const requestRouter = require('../backend/routes/formation/demandeFormation')
const seanceRouter = require('../backend/routes/formation/seance')
const moduleRouter = require('../backend/routes/formation/module')

const { ExpressPeerServer } = require('peer');
const http = require('http');
const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use('/peerjs', peerServer);



//importation des configurations$
const dotenv = require('dotenv');
// const auth_config = require('./config/auth_config');

require('./config/passwordResetConfig')
dotenv.config();
// auth_config();

/*
const connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root',
    password : '',s
    database : 'testintranet',
})
*/
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Ajout de middleware express.json()
app.use(express.json())

// const socketIO = require('socket.io')(http, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//utilisation des routes middleware
app.use('/api', api_config) //route pour la configuration 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/departement', departementRouter); //route pour le département
app.use('/api/poste', posteRouter ); // route pour le router
app.use('/api/collaborateur', collabRouter); //route pour les collaborateurs
app.use('/api/compte_collaborateur', compte_collab) ; //route pour les comptes collaborateurs
app.use('/api/auth', login); //route pour l'authentification
app.use('/api/role', role); //route pour les rôles
app.use('/api/password', password ); //route pour les mot de passe
app.use('/api/archive', archive); //route pour archiver les collaborateurs 
app.use('/api/user', userProfile); //route pour afficher les profiles des collaborateurs 
app.use('/api/direction', direction) //route pour afficher les direction
app.use('/api/equipe', equipe ) //route pour afficher les routes
app.use('/api/agenda', agendaRoutes);
app.use('/api/calendrier', displayRoutes);
app.use('/api/formations',formationRouter);
app.use('/api/demande_formation',requestRouter);
app.use('/api/seances',seanceRouter)
app.use('/api/peerjs', peerServer);
app.use('/api/module', moduleRouter);


//Connection à la base de donnée MySQL
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


//Initialisation du serveur
app.listen(4001, () => {
    console.log('Serveur Express en écoute sur le port 4001')
});
