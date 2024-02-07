const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const sequelize = require('./database/database');
const cors = require('cors');
const path = require('path');

//Config Peer
const { ExpressPeerServer } = require('peer');

const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.use('/peerjs', peerServer);


//Config
const dotenv = require('dotenv');

require('./config/passwordResetConfig')
dotenv.config();

const api_config = require('./config/api_config');

//Module Profile
const departementRouter = require('./routes/Poste/departement');
const posteRouter = require('./routes/Poste/postes');
const collabRouter = require('./routes/Collaborateur/collaborateur');
const archive = require('./routes/Collaborateur/archiveCollab')
const direction = require('./routes/Poste/direction')
const equipe = require('./routes/Poste/equipe')
const projet = require('./routes/Poste/projet')
const membreDirection = require('./routes/Collaborateur/dirigeant')
const site = require('./routes/Poste/site');

//CompteCollaborateur
const compte_collab = require('./routes/Compte/compteCollab');
const login = require('./routes/Compte/auth');
const role = require('./routes/Role/role');
const password = require('./routes/Compte/motdepasseOublie');
const userProfile = require('./routes/Compte/userProfile');
const roleHierarchique = require('./routes/Role/RoleHierarchique')
const permission = require('./routes/Role/permission')

//Module Formation
const agendaRoutes = require('../backend/routes/formation/Seances/AjoutAgenda')
const displayRoutes = require('../backend/routes/formation/Seances/AfficheAgenda')
const formationRouter = require('../backend/routes/formation/formation')
const requestRouter = require('../backend/routes/formation/Demandes/demandeFormation')
const seanceRouter = require('../backend/routes/formation/Seances/seance')
const moduleRouter = require('../backend/routes/formation/Modules/module')
const discussionRouter = require('../backend/routes/formation/Discussion/discussion')
const participantSeanceRouter = require('../backend/routes/formation/Seances/participantsseance')
const commentaireRouter = require('../backend/routes/formation/Discussion/commentaire')
const agendaCongeRouter = require('../backend/routes/Conge/ListeConge/ListeConge')

//Module Actualité
const actualite = require('./routes/Actualite/Actualité');
const categorie = require('./routes/Actualite/Categorie');
const tag = require('./routes/Actualite/Tag');
const type = require('./routes/Actualite/Type');
const commentaire = require('./routes/Actualite/Commentaire');

//Module Chat
const io = require('socket.io')(server);

const discussionEvents = require('./events/Chat/discussionEvents')(io)
const MembrerEvents = require('./events/Chat/membreEvents')(io)
const messageEvents = require('./events/Chat/messageEvents')(io)

//Pour le chat
const discussionChat = require('./routes/Chat/discussion')
const membrer = require('./routes/Chat/membre')
const message = require('./routes/Chat/message')

//Protection contre les attaques cors
app.use(cors({ origin: 'http://192.168.16.46:3000', credentials: true }));

//Ajout de middleware express.json()
app.use(express.json())

//pour les fonctionnalités télecharger des photos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/photo', express.static(path.join(__dirname, 'photoCollab')))

//utilisation des routes middleware
//Config
app.use('/api', api_config)

//Module Profile
app.use('/api/departement', departementRouter); 
app.use('/api/poste', posteRouter); 
app.use('/api/collaborateur', collabRouter); 
app.use('/api/archive', archive);  
app.use('/api/direction', direction) 
app.use('/api/equipe', equipe)
app.use('/api/projet', projet)
app.use('/api/membreDirection', membreDirection)
app.use('/api/site', site)
 

//Compte collaborateur
app.use('/api/compte_collaborateur', compte_collab); 
app.use('/api/auth', login); 
app.use('/api/role', role); 
app.use('/api/password', password); 
app.use('/api/user', userProfile);
app.use('/api/roleHierarchique', roleHierarchique)
app.use('/api/permission', permission)

//Module formation
app.use('/api/agenda', agendaRoutes);
app.use('/api/calendrier', displayRoutes);
app.use('/api/formations',formationRouter);
app.use('/api/demande_formation',requestRouter);
app.use('/api/discussions',discussionRouter);
app.use('/api/seances',seanceRouter)
app.use('/api/peerjs', peerServer);
app.use('/api/module', moduleRouter);
app.use('/api/roleHierarchique',roleHierarchique);
app.use('/api/commentaire',commentaireRouter);
app.use('/api/participantSeance',participantSeanceRouter)


//Module actualité
app.use('/api/actualite', actualite );
app.use('/api/categorie',categorie );
app.use('/api/type',type );
app.use('/api/tag',tag );
app.use('/api/commentaire', commentaire);

//Module chat
app.use('/api/chat/discussion', discussionChat)
app.use('/api/chat/membre', membrer)
app.use('/api/chat/message', message)


//Module congé
app.use('/api/conge',agendaCongeRouter)
//Connection à la base de donnée MySQL
sequelize.authenticate()
    .then(() => {
        console.log('Connecté à la base de données MySQL');
    })
    .catch((err) => {
        console.error('Erreur à la connexion à la base de donnes:', err)
    })



//Initialisation du serveUR
// app.listen(4000, () => {
//     console.log('Serveur Express en écoute sur le port 4000')
// });

module.exports = { app, server, io }