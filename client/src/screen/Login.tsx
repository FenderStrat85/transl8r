import LoginForm from '../components/form/LoginForm';
import { Link } from 'react-router-dom';

const LoginScreen = (): JSX.Element => {
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
