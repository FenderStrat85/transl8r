import JobList from '../components/list/Job.list';
import { UserContext } from '../services/Context';
import { useContext, useEffect, useState } from 'react';
import SelectJob from './SelectJob.screen';
import { Route } from 'react-router-dom';
import CreateJob from './SelectJob.screen';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // API GET JOBS
    //setJobs(response)
  }, []);

  return (
    <>
      {user.role !== 'customer' ? (
        <>


        </>
      ) : (
        <div>
          <h1>{user.role} Dashboard</h1>
          <JobList jobs={jobs} />
        </div >
      )}
    </>
  );
};

export default Dashboard;
