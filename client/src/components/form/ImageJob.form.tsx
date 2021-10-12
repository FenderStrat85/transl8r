import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../../services/Api.Service';
import { UserContext } from '../../services/Context';
import languageChoice from '../../assets/languageChoice';
import Select from 'react-select';

const ImageJobForm = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const accessToken = user.token;
  const jobType = 'image';
  const options = languageChoice;
  const [selectedTo, setSelectedTo] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState([]);

  const initialState = {
    jobName: '',
    languageFromName: '',
    languageToName: '',
    jobDescription: '',
    imageUrl: '',
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
    console.log(selectedTo);
    // formValue.languageFromName = selectedFrom.value.toString();
    // formValue.languageToName = selectedTo.value.toString();
    console.log(formValue);
    // try {
    //   const res = await apiService.createJob(formValue, jobType, accessToken);
    //   if (res.error) {
    //     alert(`${res.message}`);
    //     setFormValue(initialState);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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

export default ImageJobForm;