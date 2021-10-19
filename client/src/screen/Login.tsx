import LoginForm from '../components/form/LoginForm';
import { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from './../context/Context';
import ApiService from './../services/apiService';

const LoginScreen = (): JSX.Element => {
  const history = useHistory();
  const { user, login } = useContext(UserContext);
  const token: string | null = localStorage.getItem('accessToken');
  const accessToken = { accessToken: token };

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
    </div>
  );
};

export default LoginScreen;
