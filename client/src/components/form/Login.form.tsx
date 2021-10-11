import { useState } from 'react';

const LoginForm = () => {

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
    console.log(formValue);

    // API SERVICE POST
  }

  return (<>
    <form className='LoginForm' onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input className='form-control' type='text' name='firstName' placeholder={'first name'} required onChange={(event) => handleInputChange(event)} />
      </div>
      <div>
        <label>Password: </label>
        <input className='form-control' type='password' name='password' placeholder={'password'} required onChange={(event) => handleInputChange(event)} />
      </div>
      <div>
        <button type="submit" > Login </button>
      </div>
    </form>

  </>);
}

export default LoginForm;