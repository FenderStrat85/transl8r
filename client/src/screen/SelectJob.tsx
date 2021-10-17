import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/Context';
import { useContext } from 'react';

const SelectJob = (): JSX.Element => {
  const { user, logout } = useContext(UserContext);
  const accessToken: string | null = localStorage.getItem('accessToken');
  const history = useHistory();

  const logoutFromApp = (): void => {
    logout(accessToken as string);
    console.log('accessToken', accessToken);
    console.log('accessToken', user);
    history.push(`/auth/login`);
  };
  return (
    <>
      <h1>Customer Select Job</h1>
      <Link to="/app/customer/createJob/espresso">
        <button>Espresso</button>
      </Link>
      <Link to="/app/customer/createJob/cappuccino">
        <button>Cappuccino</button>
      </Link>
      <Link to="/app/customer/createJob/macchiato">
        <button>Macchiato</button>
      </Link>
      <Link to="/app/customer/dashboard">
        <button>View pending translations!!!</button>
      </Link>
      <button onClick={logoutFromApp}>Logout</button>
    </>
  );
};

export default SelectJob;
