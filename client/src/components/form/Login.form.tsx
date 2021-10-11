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


    </form>


  </>);
}

export default LoginForm;