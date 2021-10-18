import React from 'react';
import CompletedJobTile from '../list-items/CompletedJobTile';
import { UserContext } from '../../context/Context';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
const server = process.env.REACT_APP_SERVER;

const CompletedJobList = (): JSX.Element => {
  const accessToken = localStorage.getItem('accessToken');
  const history = useHistory();
  const { user } = useContext(UserContext);

  const fetchCompletedJobs = async (): Promise<any> => {
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

  const toDashBoard = (): void => {
    history.push(`/app/customer/dashboard`);
  };

  const toSelectJob = (): void => {
    history.push(`/app/customer/selectjob`);
  };

  const toTranslatorDashboard = (): void => {
    history.push(`/app/translator/dashboard`);
  };

  return (
    <div className="completed-job-list">
      <div className='completed-job-list__header'>
        <h1>Completed Tasks</h1>
      </div>
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'loading' && <div>Fetching data</div>}
      {status === 'success' && (
        <>
          {user.role === 'customer' ? (
            <h2>Your completed translations:</h2>
          ) : (
            <h2>Your good deeds:</h2>
          )}
          {data.length > 0 ? (
            data.map((job: { _id: React.Key | null | undefined }) => (
              <CompletedJobTile key={job._id} job={job} />
            ))
          ) : (
            <h3>No completed jobs</h3>
          )}
          {user.role === 'customer' ? (
            <>
              <button
                className="completed-jobs-list__button"
                onClick={toSelectJob}
              >
                Submit a different job
              </button>
              <button
                className="completed-jobs-list__button"
                onClick={toDashBoard}
              >
                To the dashboard!
              </button>
            </>
          ) : (
            <button
              className="completed-jobs-list__button"
              onClick={toTranslatorDashboard}
            >
              Take me to my dashboard
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CompletedJobList;
