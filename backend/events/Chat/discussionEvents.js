module.exports = (io) => {
    return {
        ajouterDiscussion: (nouvelleDiscussion) => {
            io.emit('nouvelleDiscussion', {
                discussionId: nouvelleDiscussion.id,
                nomDiscussion: nouvelleDiscussion.nomDiscussion,
                imageDiscussion: nouvelleDiscussion.imageDiscussion
            });

        },

        modifierDiscussion: (discussionModifiee) => {
            io.emit('discussionModifiee', {
                discussionId: discussionModifiee.id,
                nomDiscussion: discussionModifiee.nomDiscussion,
                nouvelleImage: discussionModifiee.imageDiscussion
            })
        },


        supprimerDiscussion: (discussionSupprimeeId) => {
            io.emit('discussionSupprimee', discussionSupprimeeId);
        }






    }
}