//@ts-nocheck
//above needed for container as part of lottie animation
import React, { useEffect, useRef, useContext } from 'react';
import LoginForm from '../components/form/LoginForm';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from './../context/Context';
import ApiService from './../services/apiService';
import lottie from 'lottie-web';

const LoginScreen = (): JSX.Element => {
  const history = useHistory();
  const { user, login } = useContext(UserContext);
  const token: string | null = localStorage.getItem('accessToken');
  const accessToken = { accessToken: token };
  const animationContainer = useRef(null);

  async function checkAuth() {
    if (!user.token && accessToken.accessToken) {
      const res = await ApiService.isTokenValid(accessToken);
      if (res.message === 'access token not valid' && !accessToken) {
        localStorage.removeItem('accessToken');
      } else {
        const { accessToken, _id, role, firstName, lastName } = res;
        login(accessToken, _id, role, firstName, lastName);
        history.push(
          role === 'customer'
            ? `/app/${role}/selectjob`
            : `/app/${role}/dashboard`,
        );
      }
    }
  }

  useEffect(() => {
    checkAuth();
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
