import CustomerJobList from '../components/list/CustomerJobList';
import TranslatorJobList from '../components/list/TranslatorJobList';
import { UserContext } from '../context/Context';
import { useContext, useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const { user, logout } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');

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

  const toSelectJob = () => {
    history.push(`/app/customer/selectjob`);
  };

  return (
    <div className='dashboard-screen__container'>
      {user.role === 'customer' ? (
        <>
          <h1>{user.role} Dashboard</h1>
          <h2>Your Pending and Accepted jobs</h2>
          <CustomerJobList />
          <button className='dashboard-screen__button' onClick={goToCompletedJobs}>
            Take me to my completed jobs!
          </button>
          <button className='dashboard-screen__button' onClick={toSelectJob}>Submit a different job</button>
          <button className='dashboard-screen__button' onClick={logoutFromApp}>Logout</button>
        </>
      ) : (
        <>
          <h1>{user.role} Dashboard</h1>
          <TranslatorJobList />
          <button className='dashboard-screen__button' onClick={goToCompletedJobs}>
            Take me to my completed jobs!
          </button>
          <button className='dashboard-screen__button' onClick={logoutFromApp}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
