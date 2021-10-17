import React from 'react';
import LoginForm from '../components/form/LoginForm';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  return (
    <div className="login-screen__container">
      <h1>Login Screen</h1>
      <LoginForm />
      <Link to="/auth/register">
        <button className='login-screen__button' title="Register here!">Register Here!</button>
      </Link>
    </div>
  );
};

export default LoginScreen;
