import { ChangeEvent, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import ApiService from './../../services/Api.Service';
import { UserContext } from '../../services/Context';
import languageChoice from '../../constants/languageChoice';

const RegisterForm = () => {
  const { login } = useContext(UserContext);
  const history = useHistory();
  const [selected, setSelected] = useState([]);

  const options = languageChoice;

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
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
    const objectToSendToDb: any = formValue;
    if (formValue.role === 'translator') {
      // let resArr = [];
      // selected.forEach((item) => {
      //   resArr.push(item.value);
      // });
      const languageArray = selected.map((item) => item.value);
      objectToSendToDb.languages = languageArray;
    }

    try {
      const res = await ApiService.register(objectToSendToDb);
      if (res.error) {
        alert(`${res.message}`);
        setFormValue(initialState);
        setSelected([]);
      } else {
        const { accessToken, role, firstName, lastName, _id } = res;
        localStorage.setItem('accessToken', accessToken);
        login(accessToken, _id, role, firstName, lastName);
        history.push(
          role === 'customer'
            ? `/app/${role}/selectjob`
            : `/app/${role}/dashboard`,
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="RegisterForm">
      <form onSubmit={handleSubmit}>
        <div>
          <p>Please select your role:</p>

          <input
            type="radio"
            value="customer"
            name="role"
            onClick={(event) => handleInputChange(event)}
            required
          />
          <label htmlFor="contactChoice1">Customer</label>

          <input
            type="radio"
            value="translator"
            name="role"
            onClick={(event) => handleInputChange(event)}
            required
          />
          <label htmlFor="contactChoice2">Translator</label>
        </div>
        {formValue.role !== 'translator' ? (
          <>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="firstName"
                placeholder={'first name'}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="lastName"
                placeholder={'last name'}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder={'email'}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder={'password'}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <button type="submit">Register</button>
          </>
        ) : (
          <>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="firstName"
                placeholder={'first name'}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="lastName"
                placeholder={'last name'}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder={'email'}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder={'password'}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <h3>What languages do you speak?</h3>
            {/* <pre>{JSON.stringify(selected)}</pre> */}
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
            <button type="submit">Register</button>
          </>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
