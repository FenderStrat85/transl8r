import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';


const SocketContext = createContext({});

const socket = io('http://localhost:3001/');

const ContextProvider = ({ children }) => {

  // a state to be changed when a user accepts a call
  const [callAccepted, setCallAccepted] = useState(false);

  // a state to be changed when a user hangs up a call
  const [callEnded, setCallEnded] = useState(false);

  // a MediaStream object
  const [stream, setStream] = useState();

  // the name of a person entered into the text field of the video call page
  const [name, setName] = useState('');

  // an object containing the call info
  // contains a 'from' which is the ID of the initiator
  const [call, setCall] = useState({});


  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();


  useEffect(() => {
    // Get permission from users' camera and mic
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream: any) => {
        setStream(currentStream);
        // set the current stream to the state
        myVideo.current.srcObject = currentStream;
      });

    // listen
    // first arg is the emit action defined in the backend
    // callback is the id of the action
    // set the id of 'me' to the state
    socket.on('me', (id) => {
      setMe(id);
    });

    // takes a data object
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal })
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream })

    // establish video connection
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from })
    })
    // Video for other user
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal);

    connectionRef.current = peer;
  }

  // 39'
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name })
    })
    // Video for other user
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    })
    connectionRef.current = peer;
  }
  // 40'
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  }
  return (
    //Provides all of the methods above the the child components
    <SocketContext.Provider value={{
      call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall
    }}>
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }