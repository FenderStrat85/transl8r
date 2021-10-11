import { useState } from 'react';

const LoginForm = () => {

  const [formValue, setFormValue] = useState('');

  const handleInputChange = (event) => {
    console.log('formInput', event.target.value);
  }

  const handleSubmit = () => {
    console.log('handleSubmit');

  }

  return (<>
    <form className='LoginForm'>
      <div>
        <label>Name: </label>
        <input className='form-control' type='text' name='firstName' placeholder={'first name'} required />
      </div>
      <div>
        <label>Password: </label>
        <input className='form-control' type='password' name='password' placeholder={'password'} required />
      </div>
    </form>
  </>);
}

export default LoginForm;