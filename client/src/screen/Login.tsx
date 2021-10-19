//@ts-nocheck
//above needed for container as part of lottie animation
import React, { useEffect, useRef } from 'react';
import LoginForm from '../components/form/LoginForm';
import { Link } from 'react-router-dom';
import lottie from 'lottie-web';

const LoginScreen = (): JSX.Element => {
  const animationContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../assets/animations/login-page.json'),
    })
      .setSpeed(0.35);
  }, []);



  return (
    <div className="login-screen">
      <h1>Transl8r</h1>
      <LoginForm />
      <p>Don't have an account?</p>
      <Link to="/auth/register">
        <button className="login-screen__button" title="Register here!">
          Register
        </button>
      </Link>
      <div
        className="login-screen__animation-container"
        ref={animationContainer}
      ></div>
    </div>
  );
};

export default LoginScreen;
