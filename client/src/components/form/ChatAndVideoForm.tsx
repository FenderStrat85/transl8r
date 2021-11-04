import { useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../../services/apiService';
import languageChoice from '../../constants/languageChoice';
import Select from 'react-select';
import { ILanguage } from '../../interfaces/interfaces';
import ErrorMessageComponent from '../../utils/ErrorMessageComponent';
import BackButton from '../button/BackButton';

const ChatAndVideoForm = (props: { jobType: String }): JSX.Element => {
  const history = useHistory<History>();
  const accessToken = localStorage.getItem('accessToken');
  const options: ILanguage[] = languageChoice;
  const { jobType } = props;

  const [selectedFrom, setSelectedFrom] = useState<ILanguage>();
  const [selectedTo, setSelectedTo] = useState<ILanguage>();
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
        setMyError('SELECT LANGUAGES ');
      } else if (selectedFrom?.value === selectedTo?.value) {
        setMyError('selected Languages must be different');
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
      console.log(error);
    }
  };

  return (
    <div className="chat-and-video-form">
      <h1 className="chat-and-video-form__header">
        Join a {jobType}
        {jobType === 'video' ? ' chat' : null}
      </h1>
      <form data-testid="form" className="chat-and-video-form__form" onSubmit={handleSubmit}>
        <input
          className="chat-and-video-form__input"
          type="text"
          name="jobName"
          placeholder={'Give a short name to your request'}
          onChange={(event) => handleInputChange(event)}
          required
        />
        <textarea
          className="chat-and-video-form__text-area"
          name="jobDescription"
          rows={4}
          placeholder={'Tell the translator about the request'}
          onChange={(event) => handleInputChange(event)}
          required
        />
        {myError ? <ErrorMessageComponent message={myError} /> : null}
        <p>Select languages:</p>

        <Select
          className="chat-and-video-form__select"
          options={options}
          value={selectedFrom}
          placeholder={'language from'}
          onChange={(event) => handleSelectedFrom(event)}
        />
        <Select
          className="chat-and-video-form__select"
          options={options}
          value={selectedTo}
          placeholder={'language to'}
          onChange={(event) => handleSelectedTo(event)}
        />
        <button className="chat-and-video-form__button" type="submit">
          Submit request
        </button>
      </form>
      <BackButton />
    </div>
  );
};

export default ChatAndVideoForm;
