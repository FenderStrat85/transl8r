import { disconnect } from 'process';
import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { IChatMessage, IRoomInfo } from '../../interfaces/interfaces';
import './chat.css';
import ApiService from '../../services/apiService';
import apiService from '../../services/apiService';
import { access } from 'fs';

export const Chat = ({ socket, name, room, user_id }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  //room is set to job._id
  const accessToken = localStorage.getItem('accessToken');

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData: IChatMessage = {
        room: room,
        authorName: name,
        user_id: user_id,
        message: currentMessage,
        _id: '',
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      let res = await apiService.createMessage(messageData, accessToken);
      messageData._id = res._id;
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data: IChatMessage) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on('leave_message', (data: IChatMessage) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  //generic leave message to be displayed when disconnect function called
  const leaveMessage = {
    message: `${name} has left the chat`,
    authorName: 'ChatBot',
    room: room,
    user_id: 111,
    _id: user_id.role === 'customer' ? 1 : 2,
    time:
      new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
  };

  const disconnectFromChat = async () => {
    //leave chat function called in index.ts
    await socket.emit('leave_chat', leaveMessage);
    socket.close();
    await apiService.changeStatus(room, 'completed', accessToken);
  };

  //id's 'other' and 'you' are for css styling

  return (
    <div className="chat-job--container">
      <div className="chat-job--header">
        <p>Live Chat</p>
      </div>
      <div className="chat-job--body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                key={messageContent._id}
                className="chat-job--message-container"
                id={name === messageContent.authorName ? 'you' : 'other'}
              >
                <div>
                  <div className="chat-job--message--content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="chat-job--message--meta">
                    <p id="chat-job--message--time">{messageContent.time}</p>
                    <p id="chat-job--message--author">{messageContent.authorName}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-job--footer">
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
