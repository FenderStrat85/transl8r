import { useState, useContext, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../../services/apiService';
import { UserContext } from '../../context/Context';
import languageChoice from '../../constants/languageChoice';
import Select from 'react-select';
import { Language } from '../../interfaces/interfaces';
import DashboardButton from '../button/DashboardButton';
import ErrorMessageComponent from '../../utils/ErrorMessageComponent';
import BackButton from '../button/BackButton';

const ChatAndVideoForm = (props: { jobType: String }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');
  const jobType = props.jobType;
  const options = languageChoice;

  const [selectedFrom, setSelectedFrom] = useState<Language>();
  const [selectedTo, setSelectedTo] = useState<Language>();

  const [myError, setMyError] = useState('');

  const initialState = {
    jobName: '',
    jobDescription: '',
  };

  const [formValue, setFormValue] = useState(initialState);
  const handleSelectedFrom = (event: any): void => {
    setMyError('');
    setSelectedFrom(event);
  };

  const handleSelectedTo = (event: any): void => {
    setMyError('');
    setSelectedTo(event);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ): void => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();

    try {
      if (!selectedFrom || !selectedTo) {
        setMyError('SELECT LANGUAGES IDIOT');
        return;
      } else if (selectedFrom?.value === selectedTo?.value) {
        setMyError('selected Languages must be different');
        return;
      } else {
        const languageFromName = selectedFrom?.value;
        const languageToName = selectedTo?.value;
        const objToSendBackToTheDb = {
          ...formValue,
          languageFromName,
          languageToName,
        };
        const res = await apiService.createJob(
          objToSendBackToTheDb,
          jobType,
          accessToken,
        );
        if (res.error) {
          alert(`${res.message}`);
          setFormValue(initialState);
        }
        history.push(`/app/customer/dashboard`);
      }
    } catch (error) {
      //TODO: redirect to an error page
      console.log(error);
    }
  };

  return (
    <div className="chat-and-video-form">
      <h1>Chat and Video</h1>
      <form className="chat-and-video-form__form" onSubmit={handleSubmit}>
        <input
          className="chat-and-video-form__input"
          type="text"
          name="jobName"
          placeholder={'Give your job a name!'}
          onChange={(event) => handleInputChange(event)}
          required
        />
        <textarea
          className="chat-and-video-form__text-area"
          name="jobDescription"
          placeholder={'Tell the translator about the job'}
          onChange={(event) => handleInputChange(event)}
          required
        />
        {myError ? <ErrorMessageComponent message={myError} /> : null}
        <h3>What language do you need translating from?</h3>

        <Select
          className="chat-and-video-form__select"
          options={options}
          value={selectedFrom}
          onChange={(event) => handleSelectedFrom(event)}
        />
        <h3>What languages do you need translating to?</h3>
        <Select
          className="chat-and-video-form__select"
          options={options}
          value={selectedTo}
          onChange={(event) => handleSelectedTo(event)}
        />
        <button className="chat-and-video-form__button" type="submit">
          Submit your job
        </button>
      </form>
      <BackButton />
      <DashboardButton role={user.role} />
    </div>
  );
};

export default ChatAndVideoForm;
