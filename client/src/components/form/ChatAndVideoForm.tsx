import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../../services/apiService';
import { UserContext } from '../../context/Context';
import languageChoice from '../../constants/languageChoice';
import Select from 'react-select';
import { Language } from '../../interfaces/interfaces';
import DashboardButton from '../button/DashboardButton';

const ChatAndVideoForm = (props) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');
  const jobType = props.jobType;
  const options = languageChoice;

  const [selectedFrom, setSelectedFrom] = useState<Language>();
  const [selectedTo, setSelectedTo] = useState<Language>();

  const initialState = {
    jobName: '',
    jobDescription: '',
  };

  const [formValue, setFormValue] = useState(initialState);

  const handleInputChange = (event) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const languageFromName = selectedFrom.value;
      const languageToName = selectedTo.value;
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
    } catch (error) {
      //TODO: redirect to an error page
      console.log(error);
    }
  };

  const toSelectJob = () => {
    history.push(`/app/customer/selectjob`);
  };

  return (
    <div className='chat-and-video-form'>
      <form className='chat-and-video-form__form'
        onSubmit={handleSubmit}>
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
          // type="text"
          name="jobDescription"
          placeholder={'Tell the translator about the job'}
          onChange={(event) => handleInputChange(event)}
          required
        />
        <h3>What language do you need translating from?</h3>
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        <Select
          className='chat-and-video-form__select'
          options={options}
          value={selectedFrom}
          onChange={setSelectedFrom}
        // labelledBy="Select"
        />
        <h3>What languages do you need translating to?</h3>
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        <Select
          className='chat-and-video-form__select'
          options={options}
          value={selectedTo}
          onChange={setSelectedTo}
        // labelledBy="Select"
        />
        <button className='chat-and-video-form__button' type="submit">Submit your job</button>
      </form>
      <button className='chat-and-video-form__button' onClick={toSelectJob}>Submit a different job</button>
      <DashboardButton role={user.role} />
    </div>
  );
};

export default ChatAndVideoForm;
