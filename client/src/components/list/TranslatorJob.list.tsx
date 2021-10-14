import TranslatorJobItem from '../items/TranslatorJob.item';
import { UserContext } from '../../services/Context';
import { useContext } from 'react';
import { server } from '../../constants/server';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const TranslatorJobList = (props: { jobs: any }) => {
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
      <h2>Pending Jobs</h2>
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'loading' && <div>Fetching data</div>}
      {status === 'success' && (
        <div>
          {data.length > 0 ? (
            data.map((job) => <TranslatorJobItem key={job._id} job={job} />)
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
