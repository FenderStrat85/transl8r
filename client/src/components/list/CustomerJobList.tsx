import React from 'react';
import PendingAndAcceptedCustomerJobTile from '../list-items/customer/PendingAndAcceptedCustomerJobTile';
import { useQuery } from 'react-query';
const server = process.env.REACT_APP_SERVER;

const CustomerJobList = () => {
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

  if (data && data.length > 0) {
    // TODO: only one loop
    pendingJobs = data.filter(
      (job: { status: string }) => job.status === 'pending',
    );
    acceptedJobs = data.filter(
      (job: { status: string }) => job.status === 'accepted',
    );
  }

  return (
    <>
      <div>
        <h2>Pending Jobs</h2>
        {status === 'error' && <div>Error fetching data</div>}
        {status === 'loading' && <div>Fetching data</div>}
        {status === 'success' && (
          <div>
            {pendingJobs.length > 0 ? (
              pendingJobs.map((job: { _id: React.Key }) => (
                <PendingAndAcceptedCustomerJobTile key={job._id} job={job} />
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
              acceptedJobs.map((job: { _id: React.Key }) => (
                <PendingAndAcceptedCustomerJobTile key={job._id} job={job} />
              ))
            ) : (
              <h3>No accepted jobs</h3>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerJobList;
