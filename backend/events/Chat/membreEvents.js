const discussionEvents = require("./discussionEvents")

module.exports = (io) => {
    return {
        ajouterMembre: (nouvelleMembre) => {
            io.emit('nouvelleMembre', {
                membreId: nouvelleMembre.id,
                discussion: nouvelleMembre.discussion,
                membre: nouvelleMembre.membre,
                pseudo: nouvelleMembre.pseudo
            })
        },

        supprimerMembre: (membreSupprime) => {
            io.emit('membreSupprimee', membreSupprime)
        },


        modifierMembre: (modifierMembre) => {
            io.emit('modifierMembre', {
                pseudo: modifierMembre.pseudo
            })
        }



    }
}