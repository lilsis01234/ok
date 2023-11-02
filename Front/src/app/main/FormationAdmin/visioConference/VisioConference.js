import React, { useEffect } from 'react';
import Peer from 'peerjs';

const VisioconferencePage = () => {
    useEffect(() => {
        const peer = new Peer(); // Initialisez un nouvel instance PeerJS

        peer.on('open', (peerId) => {
            console.log('Mon ID de peer est : ' + peerId);
            // Envoyez l'ID de peer au serveur pour que d'autres clients puissent se connecter
        });

        peer.on('connection', (conn) => {
            // Gérez les connexions de données si nécessaire
        });

        peer.on('call', (call) => {
            // Répondez à l'appel et ajoutez le flux vidéo/audio distant à un élément vidéo
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((localStream) => {
                    call.answer(localStream); // Répondez à l'appel avec le flux audio/vidéo local
                    const video = document.createElement('video');
                    call.on('stream', (remoteStream) => {
                        video.srcObject = remoteStream;
                        video.play();
                        document.body.appendChild(video); // Ajoutez l'élément vidéo au DOM
                    });
                })
                .catch((error) => {
                    console.error("Erreur lors de l'accès aux périphériques multimédias : ", error);
                });
        });

        return () => {
            peer.disconnect(); // Déconnectez-vous du serveur PeerJS lorsque le composant est démonté
        };
    }, []);

    return <div>Page de Visioconférence</div>;
};

export default VisioconferencePage;
