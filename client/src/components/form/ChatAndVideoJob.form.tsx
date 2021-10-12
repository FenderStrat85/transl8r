import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../../services/Api.Service';
import { UserContext } from '../../services/Context';
import languageChoice from '../../assets/languageChoice';
import Select from 'react-select';
import { Language } from '../../assets/interfaces';

const ChatAndVideoJobForm = (props) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const accessToken = user.token;
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
      let languageFromName = selectedFrom.value;
      let languageToName = selectedTo.value;
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="jobName"
            placeholder={'Give your job a name!'}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="jobDescription"
            placeholder={'Tell the translator about the job'}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <h3>What language do you need translating from?</h3>
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        <Select
          options={options}
          value={selectedFrom}
          onChange={setSelectedFrom}
          // labelledBy="Select"
        />
        <h3>What languages do you need translating to?</h3>
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        <Select
          options={options}
          value={selectedTo}
          onChange={setSelectedTo}
          // labelledBy="Select"
        />
        <button type="submit">Submit your job</button>
      </div>
    </form>
  );
};

export default ChatAndVideoJobForm;
