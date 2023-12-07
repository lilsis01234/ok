import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import './App.css';

function VisioConference() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      handleIncomingCall(call);
    });

    peerInstance.current = peer;
  }, []);

  const handleIncomingCall = (call) => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on('stream', function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      })
      .catch((error) => {
        console.error('Error accessing audio devices:', error);
      });
  };

  const call = (remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ audio: true })
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
        console.error('Error accessing audio devices:', error);
      });
  };

  return (
    <div className="App">
      <h1>Votre id est {peerId}</h1>
      <input type="text" value={remotePeerIdValue} onChange={(e) => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={currentUserVideoRef} />
      </div>
      <div>
        <video ref={remoteVideoRef} />
      </div>
    </div>
  );
}

export default VisioConference;
