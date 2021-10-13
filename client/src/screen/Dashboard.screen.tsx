import CustomerJobList from '../components/list/CustomerJob.list';
import TranslatorJobList from '../components/list/TranslatorJob.list';
import { UserContext } from '../services/Context';
import { useContext, useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // API GET JOBS
    //setJobs(response)
  }, []);

  return (
    <>
      {user.role === 'customer' ? (
        <>
          <h1>{user.role} Dashboard</h1>
          <h1>Your Pending and Accepted jobs</h1>
          <CustomerJobList jobs={jobs} />
          <button>Take me to my completed jobs!</button>
        </>
      ) : (
        <div>
          <h1>{user.role} Dashboard</h1>
          <TranslatorJobList jobs={jobs} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
