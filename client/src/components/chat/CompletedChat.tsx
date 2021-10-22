import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/Context';
import apiService from '../../services/apiService';
import { useLocation } from 'react-router-dom';
import BackButton from '../button/BackButton';
import { IChatMessage, IDbMessage } from '../../interfaces/interfaces';

const CompletedChat = (): JSX.Element => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);
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

  let otherParticipant: string;
  if (user.role === 'customer') {
    otherParticipant = 'Translator';
  } else {
    otherParticipant = 'Customer';
  }

  const getDate = (dateFromDb: string) => {
    const newDate = new Date(dateFromDb);
    const date = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = ('0' + newDate.getMinutes()).slice(-2);
    return `${date}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="completed-chat">
      <h1 className="completed-chat__header">Your completed chat:</h1>
      <div className="completed-chat__message-container">
        {messages.length > 0 ? (
          messages.map((message: IDbMessage) => {
            return (
              <div
                key={message._id}
                className={`completed-chat__single-message-container ${user._id === message.messageAuthor ? 'you' : 'other'}`}
              >
                <>
                  <p className="completed-chat__message-content">{message.messageContent}</p>

                  <div className="completed-chat__message-meta">
                    <p className="completed-chat__message-author">
                      {user._id === message.messageAuthor
                        ? user.firstName + ' - ' + getDate(message.createdAt)
                        : otherParticipant + ' - ' + getDate(message.createdAt)}
                    </p>
                  </div>
                </>
              </div>
            );
          })
        ) : (
          <h2>No messages yet!</h2>
        )}
        <BackButton />
      </div>
    </div>
  );
};

export default CompletedChat;
