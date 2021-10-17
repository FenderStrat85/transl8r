import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { UserContext } from '../../context/Context';
import { IChatMessage } from '../../interfaces/interfaces';
import Chat from './ChatJob';

export const socket = io('http://localhost:5000');

const Conversation = (): JSX.Element => {
  const { user } = useContext(UserContext);
  const [showChat, setShowChat] = useState(false);

  const job: any = useLocation();
  let room: string;
  let userId: string;

  if (user.role === 'customer') {
    const { _id, CustomerId } = job.state;

    userId = CustomerId;

    //room set to job._id
    room = _id;
  } else {
    const { _id, TranslatorId } = job.state.state;

    userId = TranslatorId;

    //room set to job._id
    room = _id;
  }

  const name = user.firstName;

  const joinRoomInfo: IChatMessage = {
    room: room,
    authorName: 'ChatBot',
    userId: '111',
    //given so as each message will have a unique key prop.
    _id: user.role === 'customer' ? '1' : '2',
    message: `${name} has joined the chat!`,
    time:
      new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
  };

  const joinRoom = (): void => {
    socket.emit('join_room', joinRoomInfo);
    setShowChat(true);
  };

  return (
    <div className="conversation__container">
      {!showChat ? (
        <div className="conversation__join-chat">
          <h1>I am in the chat component</h1>
          <button onClick={joinRoom}>Join live chat!</button>
        </div>
      ) : (
        <div className="conversation__chat">
          <Chat name={name} socket={socket} room={room} userId={userId} />
        </div>
      )}
    </div>
  );
};

export default Conversation;
