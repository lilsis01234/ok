import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';

function VisioConference() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
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
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      handleIncomingCall(call);
    });

    peerInstance.current = peer;
    call(id);
  }, [id]);

  const handleIncomingCall = (call) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
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
  };

  const endCall = () => {
    const tracks = currentUserVideoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());

    if (peerInstance.current) {
      peerInstance.current.destroy();
    }
  };

  return (
    <div className="App flex flex-col h-screen">
      <div className="flex-1">
        <video ref={currentUserVideoRef} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <video ref={remoteVideoRef} className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-center items-end pb-4">
        <button
          onClick={endCall}
          className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Arrêter l'appel
        </button>
      </div>
    </div>
  );
}
export default VisioConference;
