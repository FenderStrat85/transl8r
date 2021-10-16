import { disconnect } from 'process';
import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { IChatMessage } from '../../interfaces/interfaces';
import './chat.css';
import apiService from '../../services/apiService';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/Context';
import { useContext } from 'react';

export const Chat = ({ socket, name, room, userId }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const history = useHistory();
  const { user } = useContext(UserContext);

  //room is set to job._id
  //authorName = first name of the user
  //userId = the id of the user sending the message
  //_id initial undefined, but is set the _id of the specific message sent
  const accessToken = localStorage.getItem('accessToken');

  const sendMessage = async () => {
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
      console.log(messageData);
      let res = await apiService.createMessage(messageData, accessToken);
      console.log(res);
      messageData._id = res._id;
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('welcome_message', (data: IChatMessage) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on('receive_message', (data: IChatMessage) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on('leave_message', (data: IChatMessage) => {
      setMessageList((list) => [...list, data]);
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

  console.log(userId);
  const disconnectFromChat = async () => {
    //leave chat function called in index.ts
    await socket.emit('leave_chat', leaveMessage);
    socket.close();
    await apiService.changeStatus(room, 'completed', accessToken);
    history.push(`/app/${user.role}/dashboard`);
  };

  //id's 'other' and 'you' are for css styling

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            console.log(messageContent._id);
            return (
              <div
                key={messageContent._id}
                className="message"
                id={name === messageContent.authorName ? 'you' : 'other'}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.authorName}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          value={currentMessage}
          type="text"
          placeholder="Write message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          //allows press of enter key to send message
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
      <button onClick={disconnectFromChat}>Click me to disconnect</button>
    </div>
  );
};

export default Chat;
