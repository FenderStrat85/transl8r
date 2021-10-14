import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './chat.css';

export const Chat = ({ socket, name, room, user_id }) => {
  const [currentMessage, setCurrentMessage] = useState('');

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        name: name,
        user_id: user_id,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data: string) => {
      console.log('New message received', data);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {/* <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? 'you' : 'other'}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom> */}
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
    </div>
  );
};

export default Chat;
