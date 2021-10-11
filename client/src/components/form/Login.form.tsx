import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {

  const history = useHistory();

  const [formValue, setFormValue] = useState({ firstName: '', password: '' });

  const handleInputChange = (event) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // API SERVICE LOGIN -> return USER

    // if (API SUCCESS) {
    // setUser(USER)
    const role = 'customer'
    history.push(`/app/${role}/dashboard`);

    // if(API FAILURE) {
    // console.log('Failed to login')
    // }

    // ??? if we need a global authorised state ???
    // setIsAuthorised(true)
  }

  return (<>
    <form className='LoginForm' onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input className='form-control' type='email' name='email' placeholder={'email'} required onChange={(event) => handleInputChange(event)} />
      </div>
      <div>
        <label>Password: </label>
        <input className='form-control' type='password' name='password' placeholder={'password'} required onChange={(event) => handleInputChange(event)} />
      </div>
      <div>
        <button type="submit"> Login </button>
      </div>
    </form>

  </>);
}

export default LoginForm;