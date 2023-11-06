module.exports = (io) => {
    return {
        ajouterMessage: (nouvelleMessage) => {
            io.emit('nouveauMessage', {
                message: nouvelleMessage.message,
                dateEnvoie: nouvelleMessage.dateEnvoie,
                envoyeur: nouvelleMessage.envoyeur,
            })
        },

        modifierMessage: (modifierMessage) => {
            io.emit('nouveauMessage', {
                message: modifierMessage.message,
            })
        },

        supprimerMessage: (supprimerMessage) => {
            io.emit('supprimerMessage', supprimerMessage);
        }
    }
}