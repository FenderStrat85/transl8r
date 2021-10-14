import React from "react";
import { useContext } from "react";
import { SocketContext } from '../../services/SocketContext';
import './VideoStream.css';

const VideoStream = () => {
  console.log(useContext(SocketContext))

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  // 48'
  return (
    <div className='video-stream-component'>
      {/* our video */}
      {stream && (
        <div className='video-stream-container'>
          <h1>Video conference!</h1>
          <h1>{name}</h1>
          <video className='user stream' playsInline muted ref={myVideo} autoPlay />
        </div>
      )}
      {/* other users' video */}
      {/* rendered conditionally based on call/stream state */}
      {callAccepted && !callEnded && (
        <div className='video-stream-container'>
          <h1>{call.name}</h1>
          <video className='other stream' playsInline ref={userVideo} autoPlay />
        </div>
      )}
    </div>
  );
};

export default VideoStream;