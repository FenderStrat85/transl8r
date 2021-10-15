import CustomerJobList from '../components/list/CustomerJob.list';
import TranslatorJobList from '../components/list/TranslatorJob.list';
import { UserContext } from '../services/Context';
import { useContext, useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const { user, logout } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // API GET JOBS
    //setJobs(response)
  }, []);

  const logoutFromApp = () => {
    logout(accessToken);
    console.log('accessToken', accessToken);
    console.log('accessToken', user);
    history.push(`/auth/login`);
  };

  const goToCompletedJobs = () => {
    history.push(`/app/completedJobs`);
  };

  return (
    <>
      {user.role === 'customer' ? (
        <>
          <h1>{user.role} Dashboard</h1>
          <h2>Your Pending and Accepted jobs</h2>
          <CustomerJobList jobs={jobs} />
          <button onClick={goToCompletedJobs}>
            Take me to my completed jobs!
          </button>
          <button onClick={logoutFromApp}>Logout</button>
        </>
      ) : (
        <div>
          <h1>{user.role} Dashboard</h1>
          <TranslatorJobList jobs={jobs} />
          <button onClick={logoutFromApp}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Dashboard;
