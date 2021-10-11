import { ChangeEvent, useState } from "react";

const RegisterForm = () => {

  const [formValue, setFormValue] = useState({ firstName: '', lastName: '', email: '', password: '', role: '' });

  const handleInputChange = (event) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    })
  }

  // FIX ME --> form submission values seem to be one step behind, but submit correctly

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // API REGISTER FUNCTION ()
  }

  return (
    <div className="RegisterForm">
      <form onSubmit={handleSubmit}>
        <div>
          <p>Please select your role:</p>

          <input type="radio" value="Customer" name='role' onClick={(event) => handleInputChange(event)} required />
          <label htmlFor="contactChoice1">customer</label>

          <input type="radio" value="Translator" name='role' onClick={(event) => handleInputChange(event)} required />
          <label htmlFor="contactChoice2">translator</label>
        </div>
        <div className='form-group'>
          <input className='form-control' type='text' name='firstName' placeholder={'first name'} onChange={(event) => handleInputChange(event)} required />
        </div>
        <div className='form-group'>
          <input className='form-control' type='text' name='lastName' placeholder={'last name'} onChange={(event) => handleInputChange(event)} required />
        </div>
        <div className='form-group'>
          <input className='form-control' type='email' name='email' placeholder={'email'} onChange={(event) => handleInputChange(event)} required />
        </div>
        <div className='form-group'>
          <input className='form-control' type='password' name='password' placeholder={'password'} onChange={(event) => handleInputChange(event)} required />
        </div>
        <button type="submit" >Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;