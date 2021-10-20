import { Key, useEffect, useState } from 'react';
// Have not found a TS solution for this
//@ts-expect-error
import ScrollToBottom from 'react-scroll-to-bottom';
import { IChatMessage } from '../../interfaces/interfaces';
import apiService from '../../services/apiService';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/Context';
import { useContext } from 'react';
import { Socket } from 'socket.io-client';

export const Chat = (props: {
  socket: Socket;
  name: string;
  room: string;
  userId: string;
}): JSX.Element => {
  const { socket, name, room, userId } = props;
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList]: any[] = useState([]);
  const history = useHistory<History>();
  const { user } = useContext(UserContext);

  //room is set to job._id
  //authorName = first name of the user
  //userId = the id of the user sending the message
  //_id initial undefined, but is set the _id of the specific message sent
  const accessToken: string | null = localStorage.getItem('accessToken');

  const sendMessage = async (
    room: string,
    name: string,
    userId: string,
    currentMessage: string,
  ): Promise<void> => {
    if (currentMessage !== '') {
      const messageData: IChatMessage = {
        room: room,
        authorName: name,
        userId: userId,
        message: currentMessage,
        _id: '',
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      const res = await apiService.createMessage(messageData, accessToken);
      messageData._id = res._id;
      await socket.emit('send_message', messageData);
      updateMessageStates(messageData);
    }
  };

  const updateMessageStates = (messageData: IChatMessage): void => {
    setMessageList((list: string[]) => [...list, messageData]);
    setCurrentMessage('');
  };

  useEffect(() => {
    socket.on('welcome_message', (data: IChatMessage) => {
      setMessageList((list: string[]) => [...list, data]);
    });
    socket.on('receive_message', (data: IChatMessage) => {
      setMessageList((list: string[]) => [...list, data]);
    });
    socket.on('leave_message', (data: IChatMessage) => {
      setMessageList((list: string[]) => [...list, data]);
    });
  }, [socket]);

  //generic leave message to be displayed when disconnect function called
  const leaveMessage: IChatMessage = {
    message: `${name} has left the chat`,
    authorName: 'ChatBot',
    room: room,
    userId: '222',
    //given so as each message will have a unique key prop.
    _id: user.role === 'customer' ? '3' : '4',
    time:
      new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
  };

  const disconnectFromChat = async (): Promise<void> => {
    //leave chat function called in index.ts
    socket.emit('leave_chat', leaveMessage);
    socket.close();
    await apiService.changeStatus(room, 'completed', accessToken);
    user.role === 'translator'
      ? history.push(`/app/translator/dashboard`)
      : history.push(`/app/customer/selectjob`);
  };

  //id's 'other' and 'you' are for css styling

  return (
    <div className="chat-job">
      <h1 className='chat-job__header'>Live Chat</h1>
      <ScrollToBottom
        className="chat-job__message-container"
        followButtonClassName={'takeMeToBottom'}
      >
        {messageList.map(
          (messageContent: {
            _id: Key;
            authorName: string;
            message: string;
            time: string;
          }) => {
            return (
              <div
                key={messageContent._id}
                className={`chat-job__single-message-container ${user.firstName === messageContent.authorName ? 'you' : 'other'}`}
              >
                <>
                  <p className="chat-job__message-content">{messageContent.message}</p>
                  <div className="chat-job__message-meta">
                    <p className="chat-job__message-author">
                      {messageContent.authorName}
                    </p>
                    {/* <p id="chat-job--message--time">{messageContent.time}</p> */}
                  </div>
                </>
              </div>
            );
          },
        )}
      </ScrollToBottom>
      <div className="chat-job__footer">
        <textarea
          className="chat-job__footer-textarea"
          value={currentMessage}
          // type="text"
          placeholder="Write message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          //allows press of enter key to send message
          onKeyPress={(event) => {
            event.key === 'Enter' &&
              sendMessage(room, name, userId, currentMessage);
          }}
        />
        <button onClick={() => sendMessage(room, name, userId, currentMessage)}>
          &#9658;
        </button>
      </div>
      <button onClick={disconnectFromChat}>Click me to disconnect</button>
    </div>
  );
};

export default Chat;
