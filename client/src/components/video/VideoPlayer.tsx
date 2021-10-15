import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from 'react-router-dom';
const server = process.env.REACT_APP_SERVER;

console.log(server);

const CONNECTION_PORT = server || '';
const socket = io(CONNECTION_PORT, { transports: ['websocket'] });
let socketId: any;
socket.on('me', (id) => {
  socketId = id;
});

const VideoPlayer = () => {
  const [idToCall, setIdToCall] = useState('');
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState<any>({});
  const [me, setMe] = useState(socketId);
  const myVideo: any = useRef();
  const userVideo: any = useRef();
  const connectionRef: any = useRef();
  const history = useHistory();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream: any) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => {
      setMe(id)
    });



    socket.on('callUser', ({ from, signal }) => {
      setCall({ isReceivingCall: true, from, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: any) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    history.push('/dashboard');
  };

  return (
    <div>
      {console.log('me', me)}
      {stream && (
        <video playsInline muted ref={myVideo} autoPlay />
      )}
      <div >
        <CopyToClipboard text={me} >
          <button type='button'>Copy Your ID</button>
        </CopyToClipboard>
        <input type="text" placeholder="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall} >
            Leave call
          </button>
        ) : (
          <button onClick={() => callUser(idToCall)} >
            Call
          </button>
        )}
        {call.isReceivingCall && !callAccepted && (
          <button type="button" onClick={answerCall}>
            Answer this call
          </button>
        )}
      </div>

      {callAccepted && !callEnded && (
        <video playsInline ref={userVideo} autoPlay />
      )}
    </div>
  );
};

export default VideoPlayer;
