// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';


const accessToken = localStorage.getItem('accessToken');


const VideoPlayer = () => {
  const server = process.env.REACT_APP_SERVER;

  const CONNECTION_PORT = server || '';
  const socket = io(CONNECTION_PORT, { transports: ['websocket'] });
  let socketId: any;

  const accessToken = localStorage.getItem('accessToken');
  const job = useLocation();


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

  const getSocketId = async () => {
    const res = await fetch(`${server}/retrieveSocketId/${job.state._id}`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await res.json();
  };
  // const { data: dataFromDb, status } = useQuery('getSocketId', getSocketId, {
  //   refetchInterval: 5000,
  // });
  const queryResult = useQuery('getSocketId', getSocketId, {
    refetchInterval: 5000,
  });


  // console.log('data', queryResult.data)
  // console.log('status', queryResult.status)

  const reqBody = { jobId: job.state._id, socketId: '' }

  const insertToken = () => {
    fetch(`${server}/insertSocketId`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   console.log('ID WATCH', userVideo.current.srcObject);

  // }, [userVideo.current.srcObject])

  useEffect(() => {
    socket.on('me', (id) => {
      reqBody.socketId = id
      setMe(id);
      insertToken()
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream: any) => {
        setStream(currentStream);
        // console.log('currentStream useEffect', currentStream);
        myVideo.current.srcObject = currentStream;
      });


    // socket.on('me', (id) => {
    //   console.log("id", id)
    //   // setMe(id)
    //   const reqBody = { jobId: job.state._id, socketId: id }
    //   insertToken(reqBody, accessToken)
    // });
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
      console.log('userVideo.current', userVideo.current.srcObject)
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
      {console.log('myVideo', myVideo, 'userVideo', userVideo)}
      {stream && (
        <>
          <video playsInline muted className='user' ref={myVideo} autoPlay />
        </>
      )}
      <div >
        {/* <CopyToClipboard text={me} >
          <button type='button'>Copy Your ID</button>
        </CopyToClipboard> */}
        <h1>{me}</h1>
        <input type="text" placeholder="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall} >
            Leave call
          </button>
        ) : (
          <button onClick={() => callUser(queryResult.data.socketId)} >
            Call
          </button>
        )}
        {call.isReceivingCall && !callAccepted && (
          <button type="button" onClick={answerCall}>
            Answer this call
          </button>
        )}
      </div>
      <video playsInline className='my' ref={userVideo} autoPlay />
    </div >
  );
};

export default VideoPlayer;
