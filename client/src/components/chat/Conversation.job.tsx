import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { UserContext } from '../../services/Context';
import Chat from './Chat.job';

export const socket = io('http://localhost:5000');

const Conversation = (props: { job: any }) => {
  const { user } = useContext(UserContext);
  const [showChat, setShowChat] = useState(false);

  const job = useLocation();
  let room: string;
  let user_id: string;

  console.log('user.role', user.role);
  if (user.role === 'customer') {
    const {
      _id,
      status,
      CustomerId,
      TranslatorId,
      languageFromName,
      LanguageToName,
    } = job.state;

    console.log('job.state', job.state);
    console.log('res.state', job.state);
    console.log('job.state._id', job.state._id);

    user_id = CustomerId;

    //room set to job._id
    room = _id;

    console.log('customer block _id', _id);
    console.log('customer block user_id', user_id);
  } else {
    const {
      _id,
      status,
      CustomerId,
      TranslatorId,
      languageFromName,
      LanguageToName,
    } = job.state.state;

    console.log('job.state', job.state);
    console.log('res.state', job.state);
    console.log('job_id inside translator block', _id);

    user_id = TranslatorId;

    //room set to job._id
    room = _id;

    console.log('translator block _id', _id);
    console.log('translator block user_id', user_id);
  }

  const name = user.firstName;

  const joinRoomInfo = {
    room: room,
    name: name,
  };

  const joinRoom = () => {
    socket.emit('join_room', joinRoomInfo);
    setShowChat(true);
  };

  return (
    <div>
      {!showChat ? (
        <div>
          <h1>I am in the chat component</h1>
          <button onClick={joinRoom}>Join live chat!</button>
        </div>
      ) : (
        <div>
          <Chat name={name} socket={socket} room={room} user_id={user_id} />
        </div>
      )}
    </div>
  );
};

export default Conversation;
