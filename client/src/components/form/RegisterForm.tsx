import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import ApiService from '../../services/apiService';
import { UserContext } from '../../context/Context';
import languageChoice from '../../constants/languageChoice';
import { ICustomer, ILanguage, ITranslator } from '../../interfaces/interfaces';
import BackButton from '../button/BackButton';
import ErrorMessageComponent from '../../utils/ErrorMessageComponent';

const RegisterForm = (): JSX.Element => {
  const history = useHistory<History>();
  const { login } = useContext(UserContext);
  const options: ILanguage[] = languageChoice;
  const [selected, setSelected] = useState([]);
  const [myError, setMyError] = useState('');

  const initialState: ICustomer | ITranslator = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  };

  const [formValue, setFormValue] = useState(initialState);

  const handleInputChange = (event: any): void => {
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

    const objectToSendToDb: ITranslator | ICustomer = formValue;
    if (formValue.role === 'translator') {
      if (selected.length <= 1) {
        setMyError('Please select at least two languages');
        return;
      } else {
        setMyError('');
        const languageArray = selected.map((item: ILanguage) => item.value);
        (objectToSendToDb as ITranslator).languages = languageArray;
        // console.log(objectToSendToDb);
      }
    }

    try {
      const res = await ApiService.register(objectToSendToDb);
      if (res && res.error) {
        alert(`${res.message}`);
        setFormValue(initialState);
        setSelected([]);
      } else if (res) {
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
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div className="register-form__radio-button-container">
          <h3>I am:</h3>
          <div className="register-form__radio-button">
            <div className="register-form__radio-button-customer">
              <input
                id="contactChoice1"
                data-testid="contactChoice1"
                className="register-form__radio-select"
                type="radio"
                value="customer"
                name="role"
                onClick={(event) => handleInputChange(event)}
                required
              />
              <label htmlFor="contactChoice1"> Seeking a translation</label>
            </div>
            <div className="register-form__radio-button-translator">
              <input
                id="contactChoice2"
                data-testid="contactChoice2"
                className="register-form__radio-select"
                type="radio"
                value="translator"
                name="role"
                onClick={(event) => handleInputChange(event)}
                required
              />
              <label htmlFor="contactChoice2"> A translator</label>
            </div>
          </div>
        </div>
        {formValue.role !== 'translator' ? (
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
            <h3 className="register-form__selection-languages-header">
              Which languages do you speak?
            </h3>
            {/* <pre>{JSON.stringify(selected)}</pre> */}
            {myError ? <ErrorMessageComponent message={myError} /> : null}
            <MultiSelect
              className="register-form__multi-select"
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
              data-testid="multi-select"
            />
          </>
        )}
        <button className="register-form__button" type="submit">
          Register
        </button>
      </form>
      <BackButton />
    </div>
  );
};

export default RegisterForm;
