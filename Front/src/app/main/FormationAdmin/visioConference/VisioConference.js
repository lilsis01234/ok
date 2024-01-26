import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';

function VisioConference() {
  const [peerId, setPeerId] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const idParam = useParams();
  const id = idParam.id;

  const call = (remotePeerId) => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioDevice = devices.some((device) => device.kind === 'audioinput');
      const videoDevice = devices.some((device) => device.kind === 'videoinput');

      const mediaConstraints = {
        audio: audioDevice,
        video: videoDevice,
      };

      navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();

          const call = peerInstance.current.call(remotePeerId, mediaStream);

          call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch((error) => {
          console.error('Error accessing media devices:', error);
        });
    });
  };

  useEffect(() => {
    var peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      // Automatically answer any incoming call
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch((error) => {
          console.error('Error accessing audio devices:', error);
        });
    });

    peerInstance.current = peer;
    call(id);
  }, [id]);

  const endCall = () => {
    const tracks = currentUserVideoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());

    if (peerInstance.current) {
      peerInstance.current.destroy();
    }
  };

  return (
    <div className="App flex flex-col">
      <div className="flex">
        <video ref={currentUserVideoRef} className="w-3/6" />
      </div>
      <div className="flex-1">
        {remoteVideoRef.current && (
          <div>
            <video ref={remoteVideoRef} className="w-48" />
          </div>
        )}
      </div>
      <div className="justify-center">
        <button
          onClick={endCall}
          className="bg-red-500 text-white h-48 w-96 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Arrêter l'appel
        </button>
      </div>
    </div>
  );
}

export default VisioConference;
