import { useContext } from "react";
import { SocketContext } from '../../context/SocketContext';

const VideoNotifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div>
          <h1>{call.name} is calling:</h1>
          <button onClick={answerCall}>Answer</button>
        </div>

      )}
    </>
  )
}

export default VideoNotifications;