import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../../services/apiService';
import { UserContext } from '../../context/Context';

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const history = useHistory();
  const initialState = { email: '', password: '' };
  const [formValue, setFormValue] = useState(initialState);

  const handleInputChange = (event) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
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
    <>
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div>
          <label>email </label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder={'email'}
            required
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div>
          <label>password: </label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder={'password'}
            required
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div>
          <button type="submit"> Login </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
