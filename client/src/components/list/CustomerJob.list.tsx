import React from 'react';
import CustomerJobItem from '../items/CustomerJob.item';
import { useContext } from 'react';
import { server } from '../../constants/server';
import { useQuery } from 'react-query';

const CustomerJobList = (props: { jobs: any }) => {
  const accessToken = localStorage.getItem('accessToken');

  const fetchPendingAndAcceptedJobs = async () => {
    const res = await fetch(`${server}/getJobs/pendingAndAccepted`, {
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

  const { data, status } = useQuery(
    'pendingJobs',
    fetchPendingAndAcceptedJobs,
    {
      refetchInterval: 5000,
    },
  );

  let pendingJobs = [];
  let acceptedJobs = [];

  console.log(data);
  if (data && data.length > 0) {
    pendingJobs = data.filter((job) => job.status === 'pending');
    acceptedJobs = data.filter((job) => job.status === 'accepted');
  }

  return (
    <div>
      <div>
        <h2>Pending Jobs</h2>
        {status === 'error' && <div>Error fetching data</div>}
        {status === 'loading' && <div>Fetching data</div>}
        {status === 'success' && (
          <div>
            {pendingJobs.length > 0 ? (
              pendingJobs.map((job) => (
                <CustomerJobItem key={job._id} job={job} />
              ))
            ) : (
              <h3>No pending jobs</h3>
            )}
          </div>
        )}
      </div>
      <div>
        <h2>Accepted Jobs</h2>
        {status === 'error' && <div>Error fetching data</div>}
        {status === 'loading' && <div>Fetching data</div>}
        {status === 'success' && (
          <div>
            {acceptedJobs.length > 0 ? (
              acceptedJobs.map((job) => (
                <CustomerJobItem key={job._id} job={job} />
              ))
            ) : (
              <h3>No accepted jobs</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerJobList;
