import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { useLocation } from 'react-router-dom';
import BackButton from '../button/BackButton';

const CompletedChat = (): JSX.Element => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const [messages, setMessages] = useState([]);

  //ability to access job info from previous page
  const job = useLocation<any>().state.state;

  const fetchMessages = async (): Promise<void> => {
    const messageArray = await apiService.getChatMessages(job._id, accessToken);
    setMessages(messageArray);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="completed-chat--container">
      <h2>I am a completed chat</h2>
      {messages.length > 0 ? (
        messages.map((message: any) => {
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
