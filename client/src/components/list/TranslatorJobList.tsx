import PendingTranslatorJobTile from '../list-items/translator/PendingTranslatorJobTile';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Key } from 'react';
const server = process.env.REACT_APP_SERVER;

const TranslatorJobList = (): JSX.Element => {
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
        <div className="translator-job-list">
          <h2>Pending Jobs</h2>
          {data.length > 0 ? (
            data.map((job: { _id: Key | null | undefined }) => (
              <>
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
