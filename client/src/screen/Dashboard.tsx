import CustomerJobList from '../components/list/CustomerJobList';
import TranslatorJobList from '../components/list/TranslatorJobList';
import { UserContext } from '../context/Context';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = (): JSX.Element => {
  const history = useHistory();
  const { user, logout } = useContext(UserContext);
  const accessToken: any = localStorage.getItem('accessToken');

  const logoutFromApp = (): void => {
    logout(accessToken as string);
    history.push(`/auth/login`);
  };

  const goToCompletedJobs = () => {
    history.push(`/app/completedJobs`);
  };

  const toSelectJob = () => {
    history.push(`/app/customer/selectjob`);
  };

  return (
    <>
      {user.role === 'customer' ? (
        <>
          <h1>{user.role} Dashboard</h1>
          <h2>Your Pending and Accepted jobs</h2>
          <CustomerJobList />
          <button onClick={goToCompletedJobs}>
            Take me to my completed jobs!
          </button>
          <button onClick={toSelectJob}>Submit a different job</button>
          <button onClick={logoutFromApp}>Logout</button>
        </>
      ) : (
        <div>
          <h1>{user.role} Dashboard</h1>
          <TranslatorJobList />
          <button onClick={goToCompletedJobs}>
            Take me to my completed jobs!
          </button>
          <button onClick={logoutFromApp}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Dashboard;
