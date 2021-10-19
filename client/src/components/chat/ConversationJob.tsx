//@ts-nocheck
import { useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { UserContext } from '../../context/Context';
import { IChatMessage } from '../../interfaces/interfaces';
import lottie from 'lottie-web';
import Chat from './ChatJob';

export const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(
  'http://localhost:5000',
);

const Conversation = (): JSX.Element => {
  const { user } = useContext(UserContext);
  const [showChat, setShowChat] = useState(false);
  const animationContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../assets/animations/conversation-component.json'),
    });
  }, []);

  const job = useLocation<any>();
  let room: string;
  let userId: string;
  const name = user.firstName;

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
    <div className="conversation">
      {!showChat ? (
        <div className="conversation__join-chat">
          <h1>I am in the chat component</h1>
          <button onClick={joinRoom}>Join live chat!</button>
          <div
            className="conversation-screen__animation-container"
            ref={animationContainer}
          >
            {' '}
          </div>
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
