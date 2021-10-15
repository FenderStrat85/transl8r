import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState, useContext } from "react";
import { SocketContext } from '../../services/SocketContext'
import './VideoOptions.css';
// import { MeContext } from '../../services/Me.context';

// 57'
const VideoOptions = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  // const { me } = useContext(MeContext)
  const [idToCall, setIdToCall] = useState('');

  return (
    <div className='options-component'>
      <div className='myFormInput'>
        <form noValidate autoComplete='off'>
          <h1>Account Info</h1>
          <h3>Your ID: {me}</h3>
          <input type='text' value={name} placeholder={'name'} onChange={(event) => setName(event.target.value)} />
          {/* <CopyToClipboard text={me}>
            <button type='button'>Copy Your ID</button>
          </CopyToClipboard> */}

          <h1>Make a Call</h1>
          <input type='text' value={idToCall} placeholder={'ID to call'} onChange={(event) => setIdToCall(event.target.value)} />

          {callAccepted && !callEnded ? (
            <button type='button' onClick={leaveCall}>Hang Up</button>
          ) : (
            <button type='button'
              onClick={() => callUser(idToCall)}>Call</button>
          )}
        </form>
        {children}
      </div>
    </div>
  )
}

export default VideoOptions;