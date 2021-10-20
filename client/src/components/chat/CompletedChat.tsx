import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { useLocation } from 'react-router-dom';
import BackButton from '../button/BackButton';
import { IChatMessage, IDbMessage } from '../../interfaces/interfaces';

const CompletedChat = (): JSX.Element => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const [messages, setMessages] = useState([]);

  //ability to access job info from previous page
  const job = useLocation<any>().state.state;

  const fetchMessages = async (
    _id: string,
    accessToken: string | null,
  ): Promise<void> => {
    const messageArray: IChatMessage[] = await apiService.getChatMessages(
      _id,
      accessToken,
    );
    setMessageArray(messageArray);
  };

  const setMessageArray = (messageArray: any) => {
    setMessages(messageArray);
  };

  useEffect(() => {
    fetchMessages(job._id, accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="completed-chat">
      <h1 className='completed-chat__header'>I am a completed chat</h1>
      {messages.length > 0 ? (
        messages.map((message: IDbMessage) => {
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
