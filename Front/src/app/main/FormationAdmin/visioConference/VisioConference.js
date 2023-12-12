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
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
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
        // If there is an error, display an image or a message
        // displayErrorImage();
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
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
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
        console.error('Error accessing media devices:', error);
        // displayErrorImage();
      });
  };

  // const displayErrorImage = () => {
  //   currentUserVideoRef.current.src = 'https://example.com/error-image.jpg';
  // };

  return (
    <div className="App">
      <div>
        {/* Video or error image */}
        <video ref={currentUserVideoRef} />
      </div>
      <div>
        <video ref={remoteVideoRef} />
      </div>
    </div>
  );
}

export default VisioConference;
