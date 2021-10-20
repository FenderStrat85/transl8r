import { useState, useRef, useEffect, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer from 'simple-peer';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery, UseQueryResult } from 'react-query';
import { UserContext } from '../../context/Context';
import Draggable from 'react-draggable';
import apiService from '../../services/apiService';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

const server = process.env.REACT_APP_SERVER;

//console.log(server);

const CONNECTION_PORT = server || '';
const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(CONNECTION_PORT, {
  transports: ['websocket'],
});
let socketId: string;
socket.on('me', (id) => {
  socketId = id;
});

const VideoPlayer = (): JSX.Element => {
  const { user } = useContext(UserContext);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState<any>({});
  const [me, setMe] = useState(socketId);
  const myVideo: any = useRef();
  const userVideo: any = useRef();
  const connectionRef: any = useRef();
  const history = useHistory();
  const job: any = useLocation();
  const accessToken = localStorage.getItem('accessToken');

  const getSocketId = async (): Promise<any> => {
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

  const queryResult: UseQueryResult<any, unknown> = useQuery(
    'getSocketId',
    getSocketId,
    {
      refetchInterval: 1000,
    },
  );

  const reqBody = { jobId: job.state._id, socketId: '' };

  const insertToken = (): void => {
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

  const populateDb = (): void => {
    setTimeout(() => {
      reqBody.socketId = socketId;
      setMe(socketId);
      insertToken();
    }, 2000);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream: any) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    populateDb();

    socket.on('callUser', ({ from, signal }) => {
      setCall({ isReceivingCall: true, from, signal });
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answerCall = (): void => {
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

  const callUser = (id: string): void => {
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
    setCallAccepted(false);
  };

  const leaveCall = (): void => {
    setCallEnded(true);

    const video: any = document.querySelector('video');

    // A video's MediaStream object is available through its srcObject attribute
    const mediaStream = video?.srcObject;

    // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
    const tracks = mediaStream.getTracks();

    // Or stop all like so:
    tracks.forEach((track: { stop: () => any }) => track.stop());

    connectionRef.current.destroy();
    apiService.changeStatus(job.state._id, 'completed', accessToken);
    user.role === 'translator'
      ? history.push(`/app/translator/dashboard`)
      : history.push(`/app/customer/selectjob`);
  };

  return (
    <div className="video-player">
      {stream && (
        <>
          <h1>Video Conference</h1>
          <Draggable bounds="parent">
            <video
              className="video-player__video--my-video"
              playsInline
              muted
              ref={myVideo}
              autoPlay
            />
          </Draggable>
        </>
      )}

      <div className="video-player__controls">
        {queryResult.data === undefined ||
        queryResult.data.socketId === null ? (
          <p>Waiting for the other user to connect</p>
        ) : null}

        {callAccepted && !callEnded ? (
          <button className="video-player__button" onClick={leaveCall}>
            Leave call
          </button>
        ) : null}

        {queryResult.data !== undefined &&
        queryResult.data.socketId !== null &&
        !callAccepted &&
        !call.isReceivingCall ? (
          <button
            className="video-player__button"
            onClick={() => callUser(queryResult.data.socketId)}
          >
            Call
          </button>
        ) : null}

        {call.isReceivingCall && !callAccepted && queryResult.data !== null ? (
          <>
            <h3>Somebody is calling you!</h3>
            <button
              className="video-player__button"
              type="button"
              onClick={answerCall}
            >
              Answer this call
            </button>
          </>
        ) : null}
      </div>

      {callAccepted && !callEnded && (
        <video
          className="video-player__video--user-video"
          playsInline
          ref={userVideo}
          autoPlay
        />
      )}
    </div>
  );
};

export default VideoPlayer;
