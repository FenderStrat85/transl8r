import { Key } from 'react';
import CompletedJobTile from '../list-items/CompletedJobTile';
import { UserContext } from '../../context/Context';
import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { useHistory } from 'react-router-dom';
import { IJob } from '../../interfaces/interfaces';
const reactQueryRefetchingInterval = Number(
  process.env.REACT_APP_QUERY_REFETCHING_INTERVAL,
);
const server = process.env.REACT_APP_SERVER;

const CompletedJobList = (): JSX.Element => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const history = useHistory<History>();
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

  const result: UseQueryResult<any, unknown> = useQuery(
    'completed',
    fetchCompletedJobs,
    {
      refetchInterval: reactQueryRefetchingInterval,
    },
  );

  const status: string = result.status;
  const data: IJob[] = result.data;

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
      <h1 className="completed-job-list__header">Completed Tasks</h1>
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
            data.map((job: { _id: Key }) => (
              <CompletedJobTile key={job._id} job={job} />
            ))
          ) : (
            <h3>No completed jobs</h3>
          )}
          {user.role === 'customer' ? (
            <>
              <button
                className="completed-jobs-list__button"
                onClick={toDashBoard}
              >
                Dashboard
              </button>
            </>
          ) : (
            <button
              className="completed-jobs-list__button"
              onClick={toTranslatorDashboard}
            >
              Dashboard
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CompletedJobList;
