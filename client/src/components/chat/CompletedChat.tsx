import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';
import { useLocation, useHistory } from 'react-router-dom';
import BackButton from '../button/BackButton';

const CompletedChat = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');
  const [messages, setMessages] = useState([]);

  //ability to access job info from previous page
  const job = useLocation().state.state;

  const fetchMessages = async () => {
    const messageArray = await apiService.getChatMessages(job._id, accessToken);
    setMessages(messageArray);
  };
  console.log(messages);

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className='completed-chat__container'>
      <h2>I am a completed chat</h2>
      {messages.length > 0 ? (
        messages.map((message) => {
          return (
            <div key={message._id}>
              <h3>{message.messageContent}</h3>
            </div>
          );
        })
      ) : (
        <h2>No messages yet!</h2>
      )}
      <BackButton />
    </div>
  );
};

export default CompletedChat;
