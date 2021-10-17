import { ChangeEvent, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import ApiService from '../../services/apiService';
import { UserContext } from '../../context/Context';
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
    <div className="register-form__container">
      <form onSubmit={handleSubmit}>
        <div className="register-form__radio-button-container">
          <p>Please select your role:</p>
          <input
            className="register-form__radio-select"
            type="radio"
            value="customer"
            name="role"
            onClick={(event) => handleInputChange(event)}
            required
          />
          <label htmlFor="contactChoice1">Customer</label>
          <input
            className="register-form__radio-select"
            type="radio"
            value="translator"
            name="role"
            onClick={(event) => handleInputChange(event)}
            required
          />
          <label htmlFor="contactChoice2">Translator</label>
        </div>
        {formValue.role === 'customer' ? (
          <div className="register-form__input-container--customer">
            <input
              className="register-form__input"
              type="text"
              name="firstName"
              placeholder={'first name'}
              onChange={(event) => handleInputChange(event)}
              required
            />
            <input
              className="register-form__input"
              type="text"
              name="lastName"
              placeholder={'last name'}
              onChange={(event) => handleInputChange(event)}
              required
            />
            <input
              className="register-form__input"
              type="email"
              name="email"
              placeholder={'email'}
              onChange={(event) => handleInputChange(event)}
              required
            />
            <input
              className="register-form__input"
              type="password"
              name="password"
              placeholder={'password'}
              onChange={(event) => handleInputChange(event)}
              required
            />
            {/* <button className='register-form__button' type="submit">Register</button> */}
          </div>
        ) : (
          <>
            <div className="register-form__input-container--translator">
              <input
                className="register-form__input"
                type="text"
                name="firstName"
                placeholder={'first name'}
                onChange={(event) => handleInputChange(event)}
                required
              />
              <input
                className="register-form__input"
                type="text"
                name="lastName"
                placeholder={'last name'}
                onChange={(event) => handleInputChange(event)}
                required
              />
              <input
                className="register-form__input"
                type="email"
                name="email"
                placeholder={'email'}
                onChange={(event) => handleInputChange(event)}
                required
              />
              <input
                className="register-form__input"
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
              className='register-form__multi-select'
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </>
        )}
        <button className='register-form__button' type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
