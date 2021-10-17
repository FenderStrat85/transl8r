import PendingTranslatorJobTile from '../list-items/translator/PendingTranslatorJobTile';
import { UserContext } from '../../context/Context';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
const server = process.env.REACT_APP_SERVER;

const TranslatorJobList = () => {
  const { user } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');

  const fetchPendingJobs = async () => {
    const res = await fetch(`${server}/getAvailableJobs`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await res.json();
  };

  const { data, status } = useQuery('pendingJobs', fetchPendingJobs, {
    refetchInterval: 1000,
  });

  return (
    <>
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'loading' && <div>Fetching data</div>}
      {status === 'success' && (
        <div className='translator-job-list'>
          {data.length > 0 ? (
            data.map((job) => (
              <>
                <h2>Pending Jobs</h2>
                <PendingTranslatorJobTile key={job._id} job={job} />
              </>
            ))
          ) : (
            <>
              <h3>No pending jobs</h3>
              <Link to={{ pathname: '/app/translator/dashboard/history' }}>
                <button>View Accepted jobs</button>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TranslatorJobList;
