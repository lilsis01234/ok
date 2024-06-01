const { app, server, io } = require('./index')

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Serveur Express en écoute sur le port ${PORT}`);
}); 