import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../../services/apiService';
import { UserContext } from '../../context/Context';

const LoginForm = (): JSX.Element => {
  const { login } = useContext(UserContext);
  const history = useHistory();
  const initialState = { email: '', password: '' };
  const [formValue, setFormValue] = useState(initialState);

  const handleInputChange = (event: any): void => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    const res = await apiService.login(formValue);
    if (res.error) {
      alert(`${res.message}`);
      setFormValue(initialState);
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
  };

  return (
    <div className='login-form'>
      <form className="login-form__form" onSubmit={handleSubmit}>
        <input
          className="login-form__input"
          type="email"
          name="email"
          placeholder={'email'}
          required
          onChange={(event) => handleInputChange(event)}
        />
        <input
          className="login-form__input"
          type="password"
          name="password"
          placeholder={'password'}
          required
          onChange={(event) => handleInputChange(event)}
        />
        <button className='login-form__button' type="submit"> Login </button>
      </form>
    </div>
  );
};

export default LoginForm;
