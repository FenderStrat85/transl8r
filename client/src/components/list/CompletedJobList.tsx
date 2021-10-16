import React from 'react';
import CompletedJobTile from '../list-items/CompletedJobTile';
import { UserContext } from '../../context/Context';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
const server = process.env.REACT_APP_SERVER;

const CompletedJobList = () => {
  const accessToken = localStorage.getItem('accessToken');
  const history = useHistory();
  const { user } = useContext(UserContext);

  const fetchCompletedJobs = async () => {
    const res = await fetch(`${server}/getJobs/completed`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  };

  const { data, status } = useQuery('completed', fetchCompletedJobs, {
    refetchInterval: 5000,
  });

  const toDashBoard = () => {
    history.push(`/app/customer/dashboard`);
  };

  const toSelectJob = () => {
    history.push(`/app/customer/selectjob`);
  };

  const toTranslatorDashboard = () => {
    history.push(`/app/translator/dashboard`);
  };

  return (
    <>
      <div>
        <h2>Completed Jobs</h2>
        {status === 'error' && <div>Error fetching data</div>}
        {status === 'loading' && <div>Fetching data</div>}
        {status === 'success' && (
          <div>
            {data.length > 0 ? (
              data.map((job: { _id: React.Key }) => (
                <CompletedJobTile key={job._id} job={job} />
              ))
            ) : (
              <h3>No completed jobs</h3>
            )}
            {user.role === 'customer' ? (
              <div>
                <button onClick={toSelectJob}>Submit a different job</button>
                <button onClick={toDashBoard}>To the dashboard!</button>
              </div>
            ) : (
              <button onClick={toTranslatorDashboard}>
                Take me to my dashboard
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CompletedJobList;
